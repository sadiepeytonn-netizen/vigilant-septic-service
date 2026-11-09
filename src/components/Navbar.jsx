import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { services } from '../data/services.js'
import { business } from '../data/business.js'
import { Logo, FlagStripe, Icon } from './ui.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)          // mobile menu
  const [dd, setDd] = useState(false)              // desktop dropdown
  const [mobileServices, setMobileServices] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef()
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false); setDd(false); setMobileServices(false) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const enter = () => { clearTimeout(closeTimer.current); setDd(true) }
  const leave = () => { closeTimer.current = setTimeout(() => setDd(false), 140) }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="topbar">
        <div className="container topbar__inner">
          <span><Icon name="clock" /> {business.hoursText}</span>
          <Link to="/military" className="topbar__mil">★ Military &amp; veteran discount</Link>
          <span className="topbar__right">
            <a href={business.googleReviewsUrl} target="_blank" rel="noopener">
              <span className="stars">★★★★★</span> 5.0 on Google ({business.googleReviewCount})
            </a>
          </span>
        </div>
      </div>
      <nav className="nav" aria-label="Main">
        <div className="container nav__inner">
          <Link to="/" className="nav__brand" aria-label="Vigilant Septic Service home"><Logo /></Link>

          <ul className="nav__links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li className="has-dd" onMouseEnter={enter} onMouseLeave={leave}
                onFocus={enter} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) leave() }}>
              <NavLink to="/services" aria-haspopup="true" aria-expanded={dd}>
                Services <Icon name="chevron" className="dd-chev" />
              </NavLink>
              <AnimatePresence>
                {dd && (
                  <motion.div className="dropdown"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}>
                    <div className="dropdown__grid">
                      {services.map(s => (
                        <Link key={s.slug} to={`/services/${s.slug}`} className="dropdown__item">
                          <span className="dropdown__icon"><Icon name={s.icon} /></span>
                          <span><strong>{s.name}</strong><small>{s.short}</small></span>
                        </Link>
                      ))}
                    </div>
                    <div className="dropdown__foot">
                      <Link to="/services">View all services <Icon name="arrow" /></Link>
                      <span>We do not pump tanks. We fix, build and maintain systems.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li><NavLink to="/how-septic-systems-work">How It Works</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/reviews">Reviews</NavLink></li>
            <li><NavLink to="/service-areas">Service Areas</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>

          <a href={business.phoneHref} className="btn btn--red nav__cta"><Icon name="phone" /> {business.phone}</a>
          <button className="nav__burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>
      <FlagStripe />

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.22 }}>
            <Link to="/">Home</Link>
            <button className="mobile-menu__acc" aria-expanded={mobileServices} onClick={() => setMobileServices(v => !v)}>
              Services <Icon name="chevron" className={mobileServices ? 'rot' : ''} />
            </button>
            {mobileServices && (
              <div className="mobile-menu__sub">
                <Link to="/services">All services</Link>
                {services.map(s => <Link key={s.slug} to={`/services/${s.slug}`}>{s.name}</Link>)}
              </div>
            )}
            <Link to="/how-septic-systems-work">How It Works</Link>
            <Link to="/about">About</Link>
            <Link to="/military">Military Discount</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/service-areas">Service Areas</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
            <a href={business.phoneHref} className="btn btn--red btn--block"><Icon name="phone" /> Call {business.phone}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
