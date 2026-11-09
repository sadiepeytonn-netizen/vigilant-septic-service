import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { business } from '../data/business.js'

/* ---------- Logo: flag + slanted wordmark, kept from the original ---------- */
export function Flag({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 34" aria-hidden="true">
      <g transform="skewX(-14) translate(9 0)">
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <path key={i} d={`M0 ${i * 4.8} Q30 ${i * 4.8 - 2} 60 ${i * 4.8} T120 ${i * 4.8} v2.6 Q90 ${i * 4.8 + 0.6} 60 ${i * 4.8 + 2.6} T0 ${i * 4.8 + 2.6}z`} fill="currentColor" />
        ))}
        <rect x="0" y="0" width="42" height="17" fill="currentColor" />
        {[0, 1, 2].map(r => [0, 1, 2, 3, 4].map(c => (
          <circle key={`${r}${c}`} cx={5 + c * 8 + (r % 2) * 4} cy={4 + r * 4.6} r="1.2" className="flag-star" />
        )))}
      </g>
    </svg>
  )
}

export function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <span className="logo__top">
        <Flag className="logo__flag" />
        <span className="logo__stars" aria-hidden="true">★★★★★</span>
      </span>
      <span className="logo__word">VIGILANT</span>
      <span className="logo__sub">SEPTIC SERVICE</span>
    </span>
  )
}

/* ---------- Stars / stripes accents ---------- */
export function FlagStripe() {
  return <div className="flag-stripe" aria-hidden="true"><span /><span /><span /></div>
}

export function StarDivider({ light = false }) {
  return (
    <div className={`star-divider ${light ? 'is-light' : ''}`} aria-hidden="true">
      <span />★ ★ ★<span />
    </div>
  )
}

export function Stars({ n = 5 }) {
  return <span className="stars" aria-label={`${n} out of 5 stars`}>{'★'.repeat(n)}</span>
}

/* ---------- Reveal-on-scroll. Content is visible without JS (SEO-safe). ---------- */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect() }
    }, { rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>{children}</Tag>
}

/* ---------- CTA buttons ---------- */
export function CallButton({ className = 'btn btn--red', label }) {
  return (
    <a href={business.phoneHref} className={className}>
      <Icon name="phone" /> {label || business.phone}
    </a>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map(([name, to], i) => (
          <li key={to}>{i < items.length - 1 ? <Link to={to}>{name}</Link> : <span aria-current="page">{name}</span>}</li>
        ))}
      </ol>
    </nav>
  )
}

export function Faq({ items, title = 'Frequently asked questions' }) {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">{title}</h2>
      {items.map(([q, a]) => (
        <details key={q} className="faq__item">
          <summary><h3>{q}</h3><span className="faq__plus" aria-hidden="true" /></summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  )
}

/* ---------- Icon set (inline SVG, no external requests) ---------- */
const paths = {
  phone: 'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z',
  sms: 'M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2zm3 6h2m3 0h2m3 0h0',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  pin: 'M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  chevron: 'M6 9l6 6 6-6',
  close: 'M6 6l12 12M18 6L6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  google: 'M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3zM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22zM6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9zM12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.7 9.4 5.9 12 5.9z',
  shield: 'M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z',
  install: 'M3 20h18M5 20V10l7-5 7 5v10M9 20v-6h6v6',
  tank: 'M4 8h16v10H4zM8 8V5h8v3M4 13h16',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z',
  clipboard: 'M9 4h6v3H9zM7 5H5v16h14V5h-2M8 12l2.5 2.5L16 9',
  field: 'M3 8h18M3 13h18M3 18h18M6 8v10M12 8v10M18 8v10',
  air: 'M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8',
  calendar: 'M4 6h16v15H4zM4 10h16M8 3v5M16 3v5',
  pump: 'M7 3h10v6H7zM12 9v4M6 13h12v8H6zM9 17h6',
  search: 'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM15.5 15.5L21 21',
  riser: 'M8 3h8v3H8zM9 6v8M15 6v8M4 14h16v7H4z',
  drain: 'M3 4h18l-6 7v9l-6-3v-6z',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
}
export function Icon({ name, className = '' }) {
  const filled = ['phone', 'pin', 'google', 'star'].includes(name)
  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  )
}
