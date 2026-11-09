import { Link } from 'react-router-dom'
import PageHero from './PageHero.jsx'
import { services } from '../data/services.js'
import { Icon, Reveal } from '../components/ui.jsx'
import { MilitaryBanner, CtaBand } from '../components/sections.jsx'

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Services', '/services']]} eyebrow="What we do" title="Septic services in Southwest Missouri"
        lead="Installation, repair, inspections and maintenance for conventional and aerobic septic systems. We don't pump tanks; we build, fix and look after the whole system." />
      <section className="section">
        <div className="container svc-list">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 80}>
              <article className="svc-row">
                <span className="svc-row__icon"><Icon name={s.icon} /></span>
                <div>
                  <h2><Link to={`/services/${s.slug}`}>{s.name}</Link></h2>
                  <p>{s.lead}</p>
                  <ul className="svc-row__tags">{s.includes.slice(0, 4).map(t => <li key={t}>{t}</li>)}</ul>
                  <Link to={`/services/${s.slug}`} className="link-arrow">{s.name} details <Icon name="arrow" /></Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <MilitaryBanner />
      <CtaBand />
    </>
  )
}
