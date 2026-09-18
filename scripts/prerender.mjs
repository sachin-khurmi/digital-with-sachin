/**
 * Turns the SPA build into one static HTML file per route.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * Each route gets its own directory index.html containing the rendered markup
 * plus that page's title, description, canonical, social tags and JSON-LD, so
 * a crawler sees the whole page without executing any JavaScript. Vercel
 * checks the filesystem before applying the catch-all rewrite in vercel.json,
 * so these files are what actually get served.
 *
 * Also writes dist/sitemap.xml from the same route list.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  ORIGIN,
  indexableRoutes,
  jsonLdBlock,
  metaFor,
  render,
} from '../dist-ssr/entry-server.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** `</script>` inside JSON-LD would close the tag early. */
const escapeJson = (s) => s.replace(/</g, '\\u003c')

function headFor(meta) {
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="robots" content="${meta.robots}" />`,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:site_name" content="Digital With Sachin" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:image" content="${escapeAttr(meta.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(meta.image)}" />`,
  ]

  const block = jsonLdBlock(meta)
  if (block) {
    tags.push(
      `<script type="application/ld+json" data-seo-jsonld>${escapeJson(JSON.stringify(block))}</script>`
    )
  }

  return tags.map((t) => `    ${t}`).join('\n')
}

const template = await readFile(join(dist, 'index.html'), 'utf8')

// The build template carries the fallback title/description; each page
// supplies its own, so strip them before injecting.
const shell = template
  .replace(/\s*<title>[\s\S]*?<\/title>/, '')
  .replace(/\s*<meta name="description"[^>]*>/, '')

for (const { path } of indexableRoutes) {
  const meta = metaFor(path)
  const html = shell
    .replace('</head>', `${headFor(meta)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)

  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html, 'utf8')
  console.log(`prerendered ${path}`)
}

// 404.html. Vercel serves this with a real 404 status for any path that is not
// one of the files above — which is why vercel.json no longer rewrites every
// request to the home page. Without it, a mistyped URL answered 200 with the
// home page's markup, so Google saw the home page on endlessly many URLs and
// counted them as soft 404s.
{
  const meta = metaFor('/404')
  const html = shell
    .replace('</head>', `${headFor(meta)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${render('/404')}</div>`)
  await writeFile(join(dist, '404.html'), html, 'utf8')
  console.log('prerendered 404.html')
}

const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes
  .map(
    (r) => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8')
console.log(`sitemap.xml written with ${indexableRoutes.length} urls`)
