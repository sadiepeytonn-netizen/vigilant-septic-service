import { Link } from 'react-router-dom'
import PageHero from './PageHero.jsx'
import { business } from '../data/business.js'
import { Icon, Reveal } from '../components/ui.jsx'
import { MilitaryBanner, ReviewsSection, CtaBand } from '../components/sections.jsx'

export default function About() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['About', '/about']]} eyebrow="About us" title="Local. Family owned. Vigilant."
        lead="Vigilant Septic Service is Southwest Missouri's straight-talking wastewater treatment crew, led by owner Steve." />
      <section className="section split">
        <div className="container split__inner">
          <Reveal className="split__media">
            <img src="/images/steve-vigilant-truck.webp" width="1717" height="717" loading="lazy"
              alt="Steve, owner of Vigilant Septic Service, leaning on his Vigilant Septic Service truck in Southwest Missouri" />
            <span className="split__tag">Steve · Owner</span>
          </Reveal>
          <Reveal className="split__copy prose" delay={100}>
            <h2>Straight talk. Solid work.</h2>
            <p>Steve started Vigilant Septic Service to give homeowners something that is hard to find in this trade: a septic contractor who tells the truth. No corporate middlemen, no inflated quotes and no selling you work you don't need.</p>
            <p>When you call, you talk to Steve. He comes out, finds the actual problem, explains it in plain language and tells you what it will cost before any work begins. Customers regularly mention that he took time to teach them how their system works and what they can do to keep it healthy.</p>
            <p>He also handles the paperwork side, working within county health department, Missouri DHSS and DNR requirements, and keeps service history, warranty dates and inspection findings so you always know where your system stands.</p>
          </Reveal>
        </div>
      </section>
      <section className="section section--cream">
        <div className="container values">
          {[
            ['shield', 'Honest', 'If a small repair fixes it, that is what we recommend. Several customers tell us other companies quoted them far more for the same result.'],
            ['clipboard', 'Thorough', 'We trace the whole system instead of guessing, and we do not take shortcuts.'],
            ['check', 'Reliable', 'We answer the phone, show up when we say and do what we say we will do.'],
            ['star', 'Proudly American', 'We love this country and the people who serve it. That is why active duty, veterans and retired military get a discount.'],
          ].map(([i, t, d]) => (
            <Reveal key={t} className="value"><Icon name={i} /><h3>{t}</h3><p>{d}</p></Reveal>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container narrow prose">
          <h2>Credentials &amp; affiliations</h2>
          <ul>
            <li>Member of the Missouri Smallflows Organization (MSO), the state's onsite wastewater industry association</li>
            <li>Work performed to Missouri Department of Health &amp; Senior Services (DHSS) onsite wastewater standards</li>
          </ul>
          <p>Ready to get started? <Link to="/contact">Request service</Link> or call <a href={business.phoneHref}>{business.phone}</a>.</p>
        </div>
      </section>
      <MilitaryBanner />
      <ReviewsSection limit={3} title="Don't take our word for it" />
      <CtaBand />
    </>
  )
}
