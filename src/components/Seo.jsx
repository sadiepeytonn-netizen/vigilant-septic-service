import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getMeta } from '../seo/meta.js'

// The prerenderer writes full <head> tags into every page's HTML. This keeps
// title/description/canonical/JSON-LD correct during client-side navigation.
export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = getMeta(pathname)
    document.title = m.title
    const set = (sel, attr, val) => { const el = document.head.querySelector(sel); if (el && val) el.setAttribute(attr, val) }
    set('meta[name="description"]', 'content', m.description)
    set('meta[property="og:title"]', 'content', m.title)
    set('meta[property="og:description"]', 'content', m.description)
    set('meta[name="twitter:title"]', 'content', m.title)
    set('meta[name="twitter:description"]', 'content', m.description)
    set('meta[name="robots"]', 'content', m.robots)
    if (m.canonical) { set('link[rel="canonical"]', 'href', m.canonical); set('meta[property="og:url"]', 'content', m.canonical) }
    const ld = document.head.querySelector('script[type="application/ld+json"]')
    if (ld && m.schema) ld.textContent = JSON.stringify(m.schema)
  }, [pathname])
  return null
}
