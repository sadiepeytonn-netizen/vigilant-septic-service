import { Link, useParams } from 'react-router-dom'
import { serviceBySlug } from '../data/services.js'
import { business } from '../data/business.js'
import { reviews } from '../data/reviews.js'
import ContactForm from '../components/ContactForm.jsx'
import { ReviewCard, MilitaryBanner, CtaBand } from '../components/sections.jsx'
import { Icon, Reveal, Breadcrumbs, Faq, CallButton } from '../components/ui.jsx'
import NotFound from './NotFound.jsx'

// Light keyword match so each page shows the most relevant real review.
const reviewHints = {
  'septic-system-installation': ['installed', 'leach'], 'septic-tank-installation': ['new tank', 'installed'],
  'septic-repair': ['repaired', 'overhauled', 'resolved'], 'septic-inspections': ['inspection', 'closing'],
  'drain-field-repair': ['leach field', 'drain field'], 'aerobic-septic-systems': ['air system', 'pump'],
  'septic-maintenance': ['keeping our system', 'upkeep', 'regularly'], 'pumps-and-lift-stations': ['pump'],
  'septic-troubleshooting': ['diagnosed', 'identified the issue'], 'septic-risers': ['thorough'],
  'drainage-solutions': ['rain', 'gravel'],
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = serviceBySlug[slug]
  if (!s) return <NotFound />
  const hints = reviewHints[slug] || []
  const review = reviews.find(r => hints.some(h => r.text.toLowerCase().includes(h))) || reviews.find(r => r.text.length > 120)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[['Home', '/'], ['Services', '/services'], [s.name, `/services/${s.slug}`]]} />
          <div className="page-hero__row">
            <span className="page-hero__icon"><Icon name={s.icon} /></span>
            <div>
              <h1>{s.h1}</h1>
              <p className="page-hero__lead">{s.lead}</p>
              <div className="hero__btns">
                <CallButton className="btn btn--red" label={`Call ${business.phone}`} />
                <a href="#request" className="btn btn--outline-light">Request service</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail">
          <article className="detail__main prose">
            {s.body.map((p, i) => <p key={i}>{p}</p>)}

            <h2>What's included</h2>
            <ul className="checks checks--grid">
              {s.includes.map(i => <li key={i}><Icon name="check" /> {i}</li>)}
            </ul>

            <h2>Signs you should call</h2>
            <ul className="signs">
              {s.signs.map(i => <li key={i}>{i}</li>)}
            </ul>

            <h2>How it works</h2>
            <ol className="process">
              {s.process.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 80}><span>{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></Reveal>
              ))}
            </ol>

            {review && (
              <>
                <h2>From a customer</h2>
                <ReviewCard r={review} />
              </>
            )}

            <Faq items={s.faqs} title={`${s.name} FAQ`} />

            <h2>Related services</h2>
            <div className="related">
              {s.related.map(r => serviceBySlug[r]).filter(Boolean).map(r => (
                <Link key={r.slug} to={`/services/${r.slug}`} className="related__item">
                  <Icon name={r.icon} /><span><strong>{r.name}</strong><small>{r.short}</small></span><Icon name="arrow" />
                </Link>
              ))}
            </div>
            <p className="muted">Want to see how the parts fit together? Read our <Link to="/how-septic-systems-work">illustrated guide to how a septic system works</Link>.</p>
          </article>

          <aside className="detail__aside" id="request">
            <div className="card sticky">
              <h2 className="card__title">Request {s.name.toLowerCase()}</h2>
              <ContactForm source={`${s.name} page`} defaultService={s.name} />
            </div>
          </aside>
        </div>
      </section>

      <MilitaryBanner />
      <CtaBand />
    </>
  )
}
