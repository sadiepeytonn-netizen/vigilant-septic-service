import { Link } from 'react-router-dom'
import PageHero from './PageHero.jsx'
import SepticScroll from '../components/SepticScroll.jsx'
import { septicStages } from '../data/content.js'
import { CtaBand } from '../components/sections.jsx'
import { Faq } from '../components/ui.jsx'

const faqs = [
  ['How long does a septic system last?', 'A well-installed, well-maintained system can last for decades. Tanks, pumps and alarms may need repair or replacement along the way, and drain field life depends heavily on soil and how solids are kept out of it.'],
  ['What are the main parts of a septic system?', 'The main sewer line from the house, the septic tank with its inlet and outlet baffles, a distribution box, and the drain field (perforated pipe in gravel trenches). Some systems add pumps, alarms or an aerobic treatment unit.'],
  ['What is the difference between a conventional and an aerobic septic system?', 'A conventional system relies on settling in the tank and treatment in the soil. An aerobic system adds an air pump that feeds oxygen to bacteria, treating wastewater more fully before it is dispersed. It suits poor soil or small lots but needs more maintenance.'],
  ['Why do septic setbacks matter?', 'Setbacks are required distances between septic components and wells, buildings, property lines and water. They protect drinking water and foundations and are part of Missouri permit requirements.'],
]

export default function HowItWorks() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['How Septic Systems Work', '/how-septic-systems-work']]} eyebrow="Homeowner guide"
        title="How a septic system works"
        lead="If your home isn't on city sewer, everything you flush is treated right in your yard. Scroll through the cutaway to follow the water from the house to the soil." />
      <SepticScroll id="guide" headingLevel="h2" />
      <section className="section">
        <div className="container narrow prose">
          <h2>The short version</h2>
          <p>Wastewater leaves the house through the main sewer line and enters the septic tank. Solids settle to the bottom as sludge, grease floats to the top as scum, and the clearer liquid in the middle (effluent) flows out to a distribution box. The box splits it between perforated pipes in gravel-filled drain field trenches, where it soaks into the soil. Bacteria and the soil itself finish the treatment.</p>
          <figure>
            <img className="rounded" src="/images/how-a-septic-system-works.webp" width="1374" height="762" loading="lazy"
              alt="Cutaway illustration of a septic system: house, main sewer line, two-chamber septic tank with baffles, outlet pipe, distribution box, drain field trenches with perforated pipe and gravel over topsoil, clay, sand, gravel and bedrock layers" />
            <figcaption>A conventional gravity septic system, from house to drain field.</figcaption>
          </figure>
          <h2>Step by step</h2>
          <ol>
            {septicStages.map(s => <li key={s.n}><strong>{s.title}.</strong> {s.text} <em>{s.tip}</em></li>)}
          </ol>
          <h2>Signs something is wrong</h2>
          <ul>
            <li>Slow drains, gurgling pipes or toilets that will not flush well</li>
            <li>Sewage odors inside or outside</li>
            <li>Soggy ground, standing water or bright green stripes of grass over the drain field</li>
            <li>A septic or high-water alarm going off</li>
            <li>Backups after heavy rain or a lot of laundry</li>
          </ul>
          <p>Seeing any of these? Our <Link to="/services/septic-troubleshooting">troubleshooting service</Link> finds the cause, and our <Link to="/services/drain-field-repair">drain field repair</Link> and <Link to="/services/septic-repair">septic repair</Link> pages explain the fixes.</p>
          <Faq items={faqs} title="Septic system questions" />
        </div>
      </section>
      <CtaBand />
    </>
  )
}
