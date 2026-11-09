// Turns the React app into real static HTML for every route, so Google, Bing
// and AI crawlers (which often skip JavaScript) see full content, titles and
// schema on first request. Also writes sitemap.xml, robots.txt and llms.txt.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssr = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)
const { render, headTags, staticRoutes, SITE_URL, business, counties, services, generalFaqs, septicStages } = ssr
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const today = new Date().toISOString().slice(0, 10)

for (const route of [...staticRoutes, '/404']) {
  const html = template
    .replace('<!--app-head-->', headTags(route))
    .replace('<!--app-html-->', render(route))
  const file = route === '/' ? 'index.html' : route === '/404' ? '404.html' : `${route.slice(1)}/index.html`
  const out = path.join(dist, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log('prerendered', route)
}

// ---------- sitemap.xml ----------
const prio = r => (r === '/' ? '1.0' : r.startsWith('/services/') || r === '/services' ? '0.9' : '0.7')
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticRoutes.map(r => `  <url>
    <loc>${SITE_URL}${r === '/' ? '/' : r}</loc>
    <lastmod>${today}</lastmod>
    <priority>${prio(r)}</priority>${r === '/' || r === '/how-septic-systems-work' ? `
    <image:image><image:loc>${SITE_URL}/images/how-a-septic-system-works.jpg</image:loc></image:image>` : ''}${r === '/' || r === '/about' ? `
    <image:image><image:loc>${SITE_URL}/images/steve-vigilant-truck.webp</image:loc></image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`)

// ---------- robots.txt ----------
// Search engines AND AI assistants are explicitly welcome: being cited by
// ChatGPT, Claude, Perplexity, Gemini and Copilot is free local marketing.
const aiBots = [
  'Googlebot', 'Bingbot', 'Google-Extended', 'GoogleOther', 'Applebot', 'Applebot-Extended',
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'CCBot', 'Amazonbot', 'meta-externalagent',
  'DuckAssistBot', 'MistralAI-User', 'cohere-ai', 'YouBot',
]
fs.writeFileSync(path.join(dist, 'robots.txt'), `# Vigilant Septic Service – all search engines and AI assistants welcome.
${aiBots.map(b => `User-agent: ${b}\nAllow: /\n`).join('\n')}
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
# AI-readable summary: ${SITE_URL}/llms.txt
`)

// ---------- llms.txt + llms-full.txt (plain-language summary for AI tools) ----------
const svcLines = services.map(s => `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.short}`).join('\n')
const llms = `# ${business.name}

> Local, family-owned septic system company serving Southwest Missouri. Owner Steve does the work himself: septic system and tank installation, septic repair, drain field repair, aerobic treatment unit (ATU) service, pumps and lift stations, inspections (including real estate), troubleshooting with camera inspection, risers and drainage solutions. Vigilant Septic Service does NOT pump septic tanks. Rated ${business.googleRating.toFixed(1)} stars from ${business.googleReviewCount} Google reviews. Offers a discount for active duty, veterans and retired military.

- Phone (call or text): ${business.phone}
- Email: ${business.email}
- Hours: ${business.hoursText}
- Service area: ${counties.map(c => c.name).join(', ')} (Missouri)
- Google Business Profile: ${business.googleCidUrl}

## Services
${svcLines}

## Key pages
- [How a septic system works](${SITE_URL}/how-septic-systems-work): illustrated homeowner guide
- [About Steve](${SITE_URL}/about)
- [Military & veteran discount](${SITE_URL}/military)
- [Reviews](${SITE_URL}/reviews)
- [Service areas](${SITE_URL}/service-areas)
- [FAQ](${SITE_URL}/faq)
- [Contact / request service](${SITE_URL}/contact)

## Optional
- [Full text for AI tools](${SITE_URL}/llms-full.txt)
`
fs.writeFileSync(path.join(dist, 'llms.txt'), llms)

const full = [
  llms.split('## Optional')[0].trim(),
  '## Towns served',
  counties.map(c => `- ${c.name}: ${c.towns.join(', ')}`).join('\n'),
  '## How a septic system works',
  septicStages.map(s => `${s.n}. ${s.title}: ${s.text} ${s.tip}`).join('\n'),
  '## Frequently asked questions',
  generalFaqs.map(([q, a]) => `Q: ${q}\nA: ${a}`).join('\n\n'),
  ...services.map(s => [
    `## ${s.name}`, `URL: ${SITE_URL}/services/${s.slug}`, s.lead, ...s.body,
    `Includes: ${s.includes.join('; ')}.`, `Call when: ${s.signs.join('; ')}.`,
    s.faqs.map(([q, a]) => `Q: ${q}\nA: ${a}`).join('\n\n'),
  ].join('\n\n')),
].join('\n\n')
fs.writeFileSync(path.join(dist, 'llms-full.txt'), full + '\n')

fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log(`done: ${staticRoutes.length} pages + 404, sitemap, robots, llms.txt`)
