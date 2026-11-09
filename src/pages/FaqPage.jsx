import { Link } from 'react-router-dom'
import PageHero from './PageHero.jsx'
import { generalFaqs } from '../data/content.js'
import { services } from '../data/services.js'
import { Faq } from '../components/ui.jsx'
import { CtaBand } from '../components/sections.jsx'

export default function FaqPage() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['FAQ', '/faq']]} eyebrow="Answers" title="Septic questions, answered"
        lead="Straight answers to the questions Southwest Missouri homeowners ask us most." />
      <section className="section">
        <div className="container narrow">
          <Faq items={generalFaqs} title="About Vigilant Septic Service" />
          {services.map(s => (
            <div key={s.slug}>
              <Faq items={s.faqs} title={s.name} />
              <p className="muted"><Link to={`/services/${s.slug}`}>More about {s.name.toLowerCase()} →</Link></p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Still have a question?" text="Call or text Steve. He's happy to explain." />
    </>
  )
}
