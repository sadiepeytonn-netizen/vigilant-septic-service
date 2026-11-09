import { useState } from 'react'
import { services } from '../data/services.js'
import { business } from '../data/business.js'
import { Icon } from './ui.jsx'

// Sends to Steve's inbox through FormSubmit (no server needed).
// The very first submission sends a one-time "activate this form" email to
// vigilantseptic@gmail.com; click it once and every lead after that arrives.
const ENDPOINT = `https://formsubmit.co/ajax/${business.formEmail}`

export default function ContactForm({ compact = false, source = 'Contact page', defaultService = '' }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    if (data._honey) return
    setStatus('sending'); setError('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          military: data.military ? 'Yes – active duty / veteran / retired' : 'No',
          _subject: `New septic request from ${data.name || 'website'} (${source})`,
          _template: 'table',
          _captcha: 'false',
          'Lead source': source,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.success === 'false') throw new Error(json.message || 'Send failed')
      setStatus('sent'); form.reset()
      try { sessionStorage.setItem('vss_lead', '1') } catch {}
    } catch (err) {
      setStatus('error'); setError('Something went wrong sending your message. Please call or text us instead.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon"><Icon name="check" /></span>
        <h3>Got it, thank you!</h3>
        <p>Steve will get back to you soon. Need help right now? Call <a href={business.phoneHref}>{business.phone}</a>.</p>
      </div>
    )
  }

  return (
    <form className={`form ${compact ? 'form--compact' : ''}`} onSubmit={onSubmit}>
      <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="hp" aria-hidden="true" />
      <div className="form__row">
        <label>Name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
        <label>Phone<input name="phone" type="tel" required autoComplete="tel" placeholder="(417) 555-0123" /></label>
      </div>
      {!compact && (
        <div className="form__row">
          <label>Email <em>(optional)</em><input name="email" type="email" autoComplete="email" placeholder="you@email.com" /></label>
          <label>Town / property location<input name="location" placeholder="e.g. Bolivar, MO" /></label>
        </div>
      )}
      <label>What do you need help with?
        <select name="service" defaultValue={defaultService}>
          <option value="">Choose a service…</option>
          {services.map(s => <option key={s.slug} value={s.name}>{s.name}</option>)}
          <option value="Not sure">Not sure, something is wrong</option>
        </select>
      </label>
      {!compact && (
        <label>Tell us what is going on<textarea name="message" rows="4" placeholder="Slow drains, alarm going off, buying a home, new build…" /></label>
      )}
      <label className="check">
        <input type="checkbox" name="military" value="yes" />
        <span>I'm active duty, a veteran, or retired military <span aria-hidden="true">🇺🇸</span></span>
      </label>
      <button className="btn btn--red btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : compact ? 'Get a Call Back' : 'Request Service'}
      </button>
      {status === 'error' && <p className="form__error" role="alert">{error}</p>}
      <p className="form__note">Prefer to talk? Call or text <a href={business.phoneHref}>{business.phone}</a> · {business.hoursText}</p>
    </form>
  )
}
