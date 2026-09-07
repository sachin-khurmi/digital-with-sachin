/**
 * Single source of truth for every page's <head>.
 *
 * `metaFor(pathname)` is used twice: by <Seo /> to update the head during
 * client-side navigation, and by scripts/prerender.mjs to bake the same tags
 * into the static HTML each route ships with. Keep it pure and free of any
 * browser API so the build script can import it under Node.
 *
 * Mirrors src/seo.js in the academy repo — keep the two in step.
 */
import { contact, services } from './data/site'

export const ORIGIN = 'https://digitalwithsachin.com'

/** The course store. A sister site on its own subdomain, linked from here. */
export const ACADEMY = 'https://service.digitalwithsachin.com'

/** Default share image. Replace with a 1200x630 card when one is designed. */
export const OG_IMAGE = `${ORIGIN}/img/hero.png`

const academy = {
  '@type': 'EducationalOrganization',
  '@id': `${ACADEMY}/#organization`,
  name: 'Digital With Sachin Academy',
  url: `${ACADEMY}/`,
  parentOrganization: { '@id': `${ORIGIN}/#organization` },
}

const org = {
  '@type': ['ProfessionalService', 'Organization'],
  '@id': `${ORIGIN}/#organization`,
  name: 'Digital With Sachin',
  alternateName: 'Digital With Sachin Marketing Agency',
  description:
    'Digital marketing agency in Mohali offering SEO, social media marketing, Meta Ads, Google Ads, website development and graphic designing.',
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}/img/logo.png`,
  image: OG_IMAGE,
  email: contact.email,
  telephone: contact.phone,
  founder: { '@type': 'Person', name: 'Sachin Khurmi' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'SCO 15, Sector 86',
    addressLocality: 'Mohali',
    addressRegion: 'Punjab',
    postalCode: '140306',
    addressCountry: 'IN',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: [contact.instagram],
  subOrganization: { '@id': `${ACADEMY}/#organization` },
}

const crumbs = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${ORIGIN}${path}`,
  })),
})

/** The six services as one catalogue, hung off the organization. */
const serviceCatalog = {
  '@type': 'OfferCatalog',
  name: 'Digital marketing services',
  url: `${ORIGIN}/services`,
  itemListElement: services.map((s, i) => ({
    '@type': 'Offer',
    position: i + 1,
    itemOffered: {
      '@type': 'Service',
      name: s.name,
      description: s.long || s.short,
      serviceType: s.name,
      provider: { '@id': `${ORIGIN}/#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
    },
  })),
}

/** Pages worth putting in front of Google, in sitemap priority order. */
export const indexableRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/portfolio', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
]

export function metaFor(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'
  const canonical = `${ORIGIN}${path === '/' ? '/' : path}`
  const base = { canonical, image: OG_IMAGE, robots: 'index, follow', type: 'website' }

  if (path === '/') {
    return {
      ...base,
      title: 'Digital With Sachin | Digital Marketing Agency in Mohali, Punjab',
      description:
        'Digital marketing that drives real growth. SEO, social media marketing, Meta Ads, Google Ads, website development and graphic designing by Sachin Khurmi, Mohali. Serving PAN India.',
      jsonLd: [
        org,
        academy,
        {
          '@type': 'WebSite',
          '@id': `${ORIGIN}/#website`,
          url: `${ORIGIN}/`,
          name: 'Digital With Sachin',
          publisher: { '@id': `${ORIGIN}/#organization` },
        },
        serviceCatalog,
      ],
    }
  }

  if (path === '/services') {
    return {
      ...base,
      title: 'Digital Marketing Services | SEO, Meta Ads & Google Ads | Digital With Sachin',
      description:
        'Six services built around measurable growth: SEO, social media marketing, Meta Ads, Google Ads, website development and graphic designing. Based in Mohali, working PAN India.',
      jsonLd: [crumbs([['Home', '/'], ['Services', '/services']]), serviceCatalog],
    }
  }

  if (path === '/portfolio') {
    return {
      ...base,
      title: 'Portfolio | Client Work by Digital With Sachin',
      description:
        'Websites, ad campaigns and brand creatives delivered for clients across industries by Digital With Sachin, Mohali.',
      jsonLd: [crumbs([['Home', '/'], ['Portfolio', '/portfolio']])],
    }
  }

  if (path === '/about') {
    return {
      ...base,
      title: 'About Sachin Khurmi | Digital With Sachin, Mohali',
      description:
        'Digital With Sachin is a Mohali-based digital marketing agency run by Sachin Khurmi, built on honest communication, customized strategy and long-term client partnerships.',
      jsonLd: [crumbs([['Home', '/'], ['About', '/about']]), org],
    }
  }

  if (path === '/contact') {
    return {
      ...base,
      title: 'Contact Digital With Sachin | Digital Marketing Agency, Mohali',
      description: `Talk to Sachin Khurmi about your project. Call ${contact.phone}, message on WhatsApp, or visit ${contact.address}.`,
      jsonLd: [
        crumbs([['Home', '/'], ['Contact', '/contact']]),
        { ...org, '@type': ['ProfessionalService', 'LocalBusiness'] },
      ],
    }
  }

  return {
    ...base,
    title: 'Page Not Found | Digital With Sachin',
    description: 'That page does not exist. Browse the services instead.',
    robots: 'noindex, follow',
    jsonLd: [],
  }
}

/** Wraps the per-page nodes into the single @graph block each page emits. */
export const jsonLdBlock = (meta) =>
  meta.jsonLd.length ? { '@context': 'https://schema.org', '@graph': meta.jsonLd } : null
