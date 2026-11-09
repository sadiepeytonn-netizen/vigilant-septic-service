import { Link } from 'react-router-dom'
import { services } from '../data/services.js'
import { reviews } from '../data/reviews.js'
import { business } from '../data/business.js'
import { Icon, Reveal, Stars, CallButton, Flag, StarDivider } from './ui.jsx'

export function ServiceGrid({ items = services, headingLevel = 'h3' }) {
  const H = headingLevel
  return (
    <div className="svc-grid">
      {items.map((s, i) => (
        <Reveal key={s.slug} delay={(i % 3) * 70}>
          <Link to={`/services/${s.slug}`} className="svc-card">
            <span className="svc-card__icon"><Icon name={s.icon} /></span>
            <H>{s.name}</H>
            <p>{s.short}</p>
            <span className="svc-card__more">Learn more <Icon name="arrow" /></span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

export function ReviewCard({ r }) {
  return (
    <figure className="review">
      <div className="review__top"><Stars n={r.rating} /><Icon name="google" className="review__g" /></div>
      <blockquote>{r.text}</blockquote>
      <figcaption>
        <span className="review__avatar" aria-hidden="true">{r.name[0]}</span>
        <span><strong>{r.name}</strong><small>Google review · {new Date(r.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</small></span>
      </figcaption>
    </figure>
  )
}

export function ReviewsSection({ limit = 6, title = 'What Southwest Missouri is saying' }) {
  const picks = [...reviews].sort((a, b) => b.text.length - a.text.length).slice(0, limit)
  return (
    <section className="section section--cream" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Reviews</p>
          <h2 id="reviews-title" className="section__title">{title}</h2>
          <a className="rating-pill" href={business.googleReviewsUrl} target="_blank" rel="noopener">
            <Icon name="google" /> <Stars /> <strong>5.0</strong> from {business.googleReviewCount} Google reviews
          </a>
        </div>
        <div className="reviews-grid">
          {picks.map((r, i) => <Reveal key={r.name} delay={(i % 3) * 80}><ReviewCard r={r} /></Reveal>)}
        </div>
        <div className="center-row">
          <Link to="/reviews" className="btn btn--navy">Read more reviews</Link>
          <a href={business.googleWriteReviewUrl} target="_blank" rel="noopener" className="btn btn--ghost">Leave a Google review</a>
        </div>
      </div>
    </section>
  )
}

export function MilitaryBanner() {
  return (
    <section className="military" aria-labelledby="mil-title">
      <div className="military__stars" aria-hidden="true" />
      <div className="container military__inner">
        <Flag className="military__flag" />
        <div>
          <p className="eyebrow eyebrow--light">Thank you for your service</p>
          <h2 id="mil-title">Military &amp; veteran discount</h2>
          <p>Active duty, veterans and retired military: you've done your part. Let us take care of yours. Mention your service when you call and ask Steve what he can do for you.</p>
        </div>
        <div className="military__cta">
          <CallButton className="btn btn--white" label="Ask about it" />
          <Link to="/military" className="military__link">Learn more <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>
  )
}

export function CtaBand({ title = 'Septic trouble? Get a straight answer.', text = 'Call or text Steve, or send a quick request and he will get back to you.' }) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <StarDivider light />
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band__btns">
          <CallButton className="btn btn--white" />
          <Link to="/contact" className="btn btn--outline-light">Request service</Link>
        </div>
      </div>
    </section>
  )
}

export function TrustRow() {
  const items = [
    ['shield', 'Local & family owned', 'No corporate middlemen'],
    ['check', 'Honest, up-front pricing', 'You know the cost first'],
    ['clipboard', 'Permits handled', 'County, DHSS & DNR rules'],
    ['star', '5.0 on Google', `${business.googleReviewCount} five-star reviews`],
  ]
  return (
    <div className="trust">
      {items.map(([icon, t, s]) => (
        <div key={t} className="trust__item">
          <Icon name={icon} />
          <span><strong>{t}</strong><small>{s}</small></span>
        </div>
      ))}
    </div>
  )
}
