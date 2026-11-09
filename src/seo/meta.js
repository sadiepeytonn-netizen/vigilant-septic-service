import { SITE_URL, business, counties } from '../data/business.js'
import { services, serviceBySlug } from '../data/services.js'
import { reviews } from '../data/reviews.js'
import { generalFaqs, septicStages } from '../data/content.js'

const BIZ_ID = `${SITE_URL}/#business`
const SITE_ID = `${SITE_URL}/#website`
const OG_IMAGE = `${SITE_URL}/images/og-vigilant-septic.jpg`

export const staticRoutes = [
  '/', '/services', '/how-septic-systems-work', '/about', '/military',
  '/reviews', '/service-areas', '/faq', '/contact',
  ...services.map(s => `/services/${s.slug}`),
]

const localBusiness = () => ({
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': BIZ_ID,
  name: business.name,
  url: SITE_URL + '/',
  logo: `${SITE_URL}/logo.svg`,
  image: [OG_IMAGE, `${SITE_URL}/images/steve-vigilant-truck.webp`],
  description: 'Local, family-owned septic company in Southwest Missouri providing septic system installation, septic tank installation, septic repair, drain field repair, aerobic system service, pumps and lift stations, inspections, risers and drainage solutions. Does not offer tank pumping.',
  slogan: business.slogan,
  telephone: '+1-417-401-0949',
  email: business.email,
  priceRange: '$$',
  founder: { '@type': 'Person', name: business.owner },
  address: { '@type': 'PostalAddress', addressRegion: 'MO', addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  areaServed: counties.map(c => ({ '@type': 'AdministrativeArea', name: `${c.name}, Missouri` })),
  openingHoursSpecification: business.hours.map(h => ({
    '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes,
  })),
  aggregateRating: {
    '@type': 'AggregateRating', ratingValue: business.googleRating, reviewCount: business.googleReviewCount, bestRating: 5,
  },
  hasMap: business.googleCidUrl,
  sameAs: [business.googleCidUrl],
  memberOf: business.affiliations.map(name => ({ '@type': 'Organization', name })),
  knowsAbout: ['Onsite wastewater treatment systems', 'Septic tanks', 'Drain fields', 'Aerobic treatment units', 'Lift stations', 'Grinder pumps', 'Missouri DHSS septic requirements'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'Septic services',
    itemListElement: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: `${SITE_URL}/services/${s.slug}` } })),
  },
  makesOffer: { '@type': 'Offer', name: 'Military discount', description: 'Discount for active duty, veterans and retired military.', eligibleCustomerType: 'Military' },
})

const website = () => ({
  '@type': 'WebSite', '@id': SITE_ID, url: SITE_URL + '/', name: business.name,
  publisher: { '@id': BIZ_ID }, inLanguage: 'en-US',
})

const breadcrumbs = items => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE_URL + path })),
})

const faqPage = faqs => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
})

const webPage = (path, title, description, type = 'WebPage') => ({
  '@type': type, '@id': `${SITE_URL}${path}#webpage`, url: SITE_URL + path, name: title, description,
  isPartOf: { '@id': SITE_ID }, about: { '@id': BIZ_ID }, inLanguage: 'en-US',
})

const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes })

export function getMeta(path) {
  const p = path.replace(/\/+$/, '') || '/'
  const brand = ' | Vigilant Septic Service'
  let title, description, schema, robots = 'index,follow,max-image-preview:large,max-snippet:-1'

  if (p.startsWith('/services/')) {
    const s = serviceBySlug[p.split('/')[2]]
    if (!s) return notFound()
    title = s.metaTitle + brand
    description = s.metaDescription
    schema = graph(
      webPage(p, title, description),
      {
        '@type': 'Service', '@id': `${SITE_URL}${p}#service`, name: s.name, serviceType: s.name,
        description: s.lead, provider: { '@id': BIZ_ID }, url: SITE_URL + p,
        areaServed: counties.map(c => ({ '@type': 'AdministrativeArea', name: `${c.name}, Missouri` })),
        hasOfferCatalog: { '@type': 'OfferCatalog', name: s.name, itemListElement: s.includes.map(i => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: i } })) },
      },
      faqPage(s.faqs),
      breadcrumbs([['Home', '/'], ['Services', '/services'], [s.name, p]]),
    )
    return { title, description, canonical: SITE_URL + p, schema, robots }
  }

  switch (p) {
    case '/':
      title = 'Septic Installation & Repair in SW Missouri | Vigilant Septic Service'
      description = 'Local, family-owned septic company serving Southwest Missouri. Septic installs, repair, drain fields, aerobic systems and inspections. 5.0★ on Google. Call (417) 401-0949.'
      schema = graph(localBusiness(), website(), webPage(p, title, description), faqPage(generalFaqs.slice(0, 5)))
      break
    case '/services':
      title = 'Septic Services' + brand
      description = 'Every septic service Vigilant offers in Southwest Missouri: installation, tanks, repair, inspections, drain fields, aerobic systems, pumps, risers and drainage.'
      schema = graph(webPage(p, title, description, 'CollectionPage'), {
        '@type': 'ItemList', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: `${SITE_URL}/services/${s.slug}` })),
      }, breadcrumbs([['Home', '/'], ['Services', '/services']]))
      break
    case '/how-septic-systems-work':
      title = 'How a Septic System Works (Illustrated Guide)' + brand
      description = 'A step-by-step illustrated guide to how a septic system works: main sewer line, septic tank, distribution box, drain field and soil treatment, plus warning signs.'
      schema = graph(webPage(p, title, description), {
        '@type': 'HowTo', name: 'How a septic system treats household wastewater',
        description, image: `${SITE_URL}/images/how-a-septic-system-works.jpg`,
        step: septicStages.map(s => ({ '@type': 'HowToStep', position: s.n, name: s.title, text: s.text })),
      }, {
        '@type': 'Article', headline: 'How a Septic System Works', image: `${SITE_URL}/images/how-a-septic-system-works.jpg`,
        author: { '@id': BIZ_ID }, publisher: { '@id': BIZ_ID }, mainEntityOfPage: SITE_URL + p, datePublished: '2026-11-09', dateModified: '2026-11-09',
      }, breadcrumbs([['Home', '/'], ['How Septic Systems Work', p]]))
      break
    case '/about':
      title = 'About Steve & Vigilant Septic Service' + brand
      description = 'Vigilant Septic Service is a local, family-owned septic company in Southwest Missouri. No corporate middlemen, honest pricing and straight talk from owner Steve.'
      schema = graph(webPage(p, title, description, 'AboutPage'), breadcrumbs([['Home', '/'], ['About', p]]))
      break
    case '/military':
      title = 'Military & Veteran Discount' + brand
      description = 'Vigilant Septic Service offers a discount for active duty, veterans and retired military in Southwest Missouri. Thank you for your service. Call (417) 401-0949.'
      schema = graph(webPage(p, title, description), faqPage([
        ['Who qualifies for the Vigilant Septic military discount?', 'Active duty service members, veterans and retired military. Let us know when you call or check the box on the contact form.'],
        ['Does the military discount apply to all services?', 'Ask Steve when you call. He is glad to talk through what he can do for you on your specific job.'],
      ]), breadcrumbs([['Home', '/'], ['Military Discount', p]]))
      break
    case '/reviews':
      title = 'Customer Reviews (5.0★ on Google)' + brand
      description = `Read what Southwest Missouri homeowners say about Vigilant Septic Service: ${business.googleRating.toFixed(1)} stars from ${business.googleReviewCount} Google reviews.`
      schema = graph(webPage(p, title, description), {
        '@type': 'LocalBusiness', '@id': BIZ_ID, name: business.name,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: business.googleRating, reviewCount: business.googleReviewCount, bestRating: 5 },
        review: reviews.slice(0, 10).map(r => ({
          '@type': 'Review', author: { '@type': 'Person', name: r.name }, datePublished: r.date,
          reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 }, reviewBody: r.text,
        })),
      }, breadcrumbs([['Home', '/'], ['Reviews', p]]))
      break
    case '/service-areas':
      title = 'Septic Service Areas in Southwest Missouri' + brand
      description = 'Vigilant Septic Service covers Hickory, Polk, Dallas, Benton, Camden, St. Clair, Cedar, Greene, Webster, Laclede and Dade counties in Missouri.'
      schema = graph(webPage(p, title, description), breadcrumbs([['Home', '/'], ['Service Areas', p]]))
      break
    case '/faq':
      title = 'Septic FAQ' + brand
      description = 'Answers to common septic questions from Southwest Missouri homeowners: warning signs, permits, aerobic systems, drain fields, costs and our military discount.'
      schema = graph(webPage(p, title, description), faqPage([...generalFaqs, ...services.flatMap(s => s.faqs.slice(0, 1))]), breadcrumbs([['Home', '/'], ['FAQ', p]]))
      break
    case '/contact':
      title = 'Contact & Free Estimate' + brand
      description = 'Request septic service or an estimate from Vigilant Septic Service. Call or text (417) 401-0949, Mon–Sat 7 AM–8 PM, or send the form and Steve will get back to you.'
      schema = graph(webPage(p, title, description, 'ContactPage'), breadcrumbs([['Home', '/'], ['Contact', p]]))
      break
    default:
      return notFound()
  }
  return { title, description, canonical: SITE_URL + (p === '/' ? '/' : p), schema, robots }
}

function notFound() {
  return { title: 'Page Not Found | Vigilant Septic Service', description: 'This page could not be found.', canonical: null, schema: null, robots: 'noindex,follow' }
}

// Builds the <head> tags string used by the prerenderer.
export function headTags(path) {
  const m = getMeta(path)
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.robots}" />`,
    m.canonical && `<link rel="canonical" href="${m.canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Vigilant Septic Service" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    m.canonical && `<meta property="og:url" content="${m.canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    m.schema && `<script type="application/ld+json">${JSON.stringify(m.schema).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}
