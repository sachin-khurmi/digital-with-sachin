import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor, jsonLdBlock } from '../seo'

/**
 * Keeps the document head in sync with the current route.
 *
 * The build bakes these same tags into each page's static HTML (see
 * scripts/prerender.mjs), so this only matters once the visitor starts
 * navigating client-side — but crawlers that do render JS see the same thing
 * either way. Tags are marked data-seo so we only ever replace our own.
 */
function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    el.setAttribute('data-seo', '')
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaFor(pathname)

    document.title = meta.title
    upsert('meta[name="description"]', () => document.createElement('meta'), {
      name: 'description',
      content: meta.description,
    })
    upsert('meta[name="robots"]', () => document.createElement('meta'), {
      name: 'robots',
      content: meta.robots,
    })
    upsert('link[rel="canonical"]', () => document.createElement('link'), {
      rel: 'canonical',
      href: meta.canonical,
    })

    const social = {
      'og:title': meta.title,
      'og:description': meta.description,
      'og:url': meta.canonical,
      'og:image': meta.image,
      'og:type': meta.type,
      'twitter:title': meta.title,
      'twitter:description': meta.description,
      'twitter:image': meta.image,
    }
    for (const [key, content] of Object.entries(social)) {
      const attr = key.startsWith('og:') ? 'property' : 'name'
      upsert(`meta[${attr}="${key}"]`, () => document.createElement('meta'), {
        [attr]: key,
        content,
      })
    }

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove())
    const block = jsonLdBlock(meta)
    if (block) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-jsonld', '')
      script.textContent = JSON.stringify(block)
      document.head.appendChild(script)
    }
  }, [pathname])

  return null
}
