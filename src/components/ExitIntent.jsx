import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { business } from '../data/business.js'
import ContactForm from './ContactForm.jsx'
import { Icon, Flag } from './ui.jsx'

// Desktop: fires when the cursor leaves through the top of the window (heading
// for the tab bar / back button). Mobile: fires on a fast scroll back toward the
// top after the visitor has been on the site a while. Shows once per session.
export default function ExitIntent() {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem('vss_exit') === '1' || sessionStorage.getItem('vss_lead') === '1' } catch {}
    if (seen || pathname === '/contact') return
    const start = Date.now()
    const armed = () => Date.now() - start > 6000
    const trigger = () => {
      try { if (sessionStorage.getItem('vss_lead') === '1') return; sessionStorage.setItem('vss_exit', '1') } catch {}
      setShow(true); cleanup()
    }
    const onMouseOut = e => { if (!e.relatedTarget && e.clientY <= 8 && armed()) trigger() }
    let lastY = window.scrollY, lastT = Date.now()
    const onScroll = () => {
      const y = window.scrollY, t = Date.now()
      const v = (lastY - y) / Math.max(1, t - lastT)
      if (window.innerWidth < 900 && Date.now() - start > 25000 && v > 2.2 && y < 1200) trigger()
      lastY = y; lastT = t
    }
    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('scroll', onScroll, { passive: true })
    function cleanup() {
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('scroll', onScroll)
    }
    return cleanup
  }, [pathname])

  useEffect(() => {
    if (!show) return
    const onKey = e => e.key === 'Escape' && setShow(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="exit" role="dialog" aria-modal="true" aria-labelledby="exit-title"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="exit__backdrop" onClick={() => setShow(false)} />
          <motion.div className="exit__card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }} transition={{ type: 'spring', damping: 24, stiffness: 260 }}>
            <button className="exit__close" onClick={() => setShow(false)} aria-label="Close"><Icon name="close" /></button>
            <div className="exit__head">
              <Flag className="exit__flag" />
              <p className="eyebrow">Hold up, before you go</p>
              <h2 id="exit-title">Don't leave with a septic problem.</h2>
              <p>Leave your name and number and Steve will call you back with a straight answer. No pressure, no runaround.</p>
            </div>
            <ContactForm compact source="Exit popup" />
            <div className="exit__alt">
              <a href={business.phoneHref}><Icon name="phone" /> Call now</a>
              <a href={business.smsHref}><Icon name="sms" /> Text us</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
