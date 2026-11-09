# Vigilant Septic Service — website

React 18 + Vite + Framer Motion, prerendered to static HTML for SEO/AI search.

## Run / build
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs /dist (static HTML for every page + sitemap, robots, llms.txt)
```

## Deploy (same as Tahoe Tree Titans)
Push this folder to GitHub → Vercel → New Project → import repo. Vercel auto-detects Vite
(build: `npm run build`, output: `dist`). Add `vigilantsepticservice.com` + `www` under Domains
and point DNS away from Squarespace when ready.

## Contact form — one-time activation
Forms post to **vigilantseptic@gmail.com** via FormSubmit (free, no server).
The first submission after launch sends an "Activate form" email to that inbox — click it once.

## Where to edit things
| What | File |
|---|---|
| Phone, email, hours, Google links, counties/towns | `src/data/business.js` |
| Service pages (copy, FAQs, includes) | `src/data/services.js` |
| Reviews | `src/data/reviews.js` |
| Septic cutaway stages + general FAQ | `src/data/content.js` |
| Page titles, meta descriptions, schema | `src/seo/meta.js` |
| Colors / fonts | `src/styles.css` (`:root`) |

Add a service in `services.js` and it automatically gets a page, nav dropdown entry, sitemap entry,
schema and llms.txt entry.

## SEO / AI search features
- Every route prerendered to real HTML (crawlers and AI bots that skip JavaScript still see everything)
- Per-page title, description, canonical, Open Graph/Twitter card
- JSON-LD: LocalBusiness (hours, area served, rating, Google profile), Service + FAQPage per service,
  HowTo + Article (septic guide), Review, BreadcrumbList
- `robots.txt` explicitly allowing Google, Bing, GPTBot/ChatGPT, ClaudeBot, PerplexityBot, Gemini, Apple, etc.
- `llms.txt` + `llms-full.txt` — plain-language business summary for AI assistants
- `sitemap.xml` with image entries; self-hosted fonts; WebP images
