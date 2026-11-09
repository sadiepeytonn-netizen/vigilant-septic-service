import { Link } from 'react-router-dom'
import PageHero from './PageHero.jsx'
import { counties, business } from '../data/business.js'
import { services } from '../data/services.js'
import { Icon, Reveal } from '../components/ui.jsx'
import { CtaBand } from '../components/sections.jsx'

export default function ServiceAreas() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Service Areas', '/service-areas']]} eyebrow="Where we work" title="Septic service areas"
        lead="Vigilant Septic Service covers a large stretch of Southwest and west-central Missouri, from the Lake of the Ozarks to north Springfield." />
      <section className="section">
        <div className="container">
          <div className="area-grid">
            {counties.map((c, i) => (
              <Reveal key={c.name} className="area-card" delay={(i % 3) * 60}>
                <h2><Icon name="pin" /> {c.name}</h2>
                <p>{c.towns.join(', ')} and surrounding rural areas.</p>
              </Reveal>
            ))}
          </div>
          <div className="prose narrow mt-lg">
            <h2>Don't see your town?</h2>
            <p>If you're near any of these communities, there's a good chance we can help. Call or text <a href={business.phoneHref}>{business.phone}</a> and ask.</p>
            <h2>Services available throughout our area</h2>
            <ul className="inline-links">
              {services.map(s => <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>)}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
