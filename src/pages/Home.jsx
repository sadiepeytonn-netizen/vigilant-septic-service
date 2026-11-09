import { Link } from 'react-router-dom'
import { business, counties } from '../data/business.js'
import { generalFaqs } from '../data/content.js'
import SepticScroll from '../components/SepticScroll.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { ServiceGrid, ReviewsSection, MilitaryBanner, TrustRow } from '../components/sections.jsx'
import { Icon, Reveal, Stars, CallButton, Faq, StarDivider } from '../components/ui.jsx'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <img src="/images/steve-vigilant-truck.webp" alt="" width="1717" height="717" fetchpriority="high" />
        </div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="hero__kicker"><span className="stars">★★★★★</span> Local · Family owned · Southwest Missouri</p>
            <h1>Septic installation &amp; repair, <span>done right.</span></h1>
            <p className="hero__lead">
              New systems, drain fields, aerobic units, pumps and inspections for homes and rural properties across Southwest Missouri.
              Straight talk and solid work from Steve, the owner, on every job.
            </p>
            <div className="hero__btns">
              <CallButton className="btn btn--red btn--lg" label={`Call ${business.phone}`} />
              <Link to="/contact" className="btn btn--outline-light btn--lg">Request service</Link>
            </div>
            <a className="hero__rating" href={business.googleReviewsUrl} target="_blank" rel="noopener">
              <Icon name="google" /> <Stars /> <strong>5.0</strong> · {business.googleReviewCount} Google reviews
            </a>
          </div>
        </div>
      </section>

      <div className="container trust-wrap"><TrustRow /></div>

      <section className="section" aria-labelledby="svc-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What we do</p>
            <h2 id="svc-title" className="section__title">Septic services</h2>
            <p className="section__lead">From brand-new installs to tracking down the problem nobody else could find. <strong>Note:</strong> we don't pump tanks. We build, repair and maintain the systems themselves.</p>
          </div>
          <ServiceGrid />
        </div>
      </section>

      <SepticScroll />

      <section className="section split" aria-labelledby="why-title">
        <div className="container split__inner">
          <Reveal className="split__media">
            <img src="/images/steve-vigilant-truck-900.webp" width="900" height="376" loading="lazy"
              alt="Steve, owner of Vigilant Septic Service, standing beside his white Vigilant service truck" />
            <span className="split__tag">Steve · Owner</span>
          </Reveal>
          <Reveal className="split__copy" delay={100}>
            <p className="eyebrow">Why Vigilant</p>
            <h2 id="why-title" className="section__title">The guy who answers the phone is the guy who does the work</h2>
            <p>Vigilant Septic Service is local and family owned. There are no corporate middlemen, no sales team and no upselling. Steve diagnoses the real problem, tells you what it costs before he starts, and explains your system so you understand it.</p>
            <ul className="checks">
              <li><Icon name="check" /> Honest pricing, given up front</li>
              <li><Icon name="check" /> County health department, DHSS and DNR requirements handled</li>
              <li><Icon name="check" /> Service history and inspection records kept for you</li>
              <li><Icon name="check" /> Job sites cleaned up when the work is done</li>
            </ul>
            <Link to="/about" className="btn btn--navy">More about Steve</Link>
          </Reveal>
        </div>
      </section>

      <MilitaryBanner />

      <ReviewsSection />

      <section className="section" aria-labelledby="areas-title">
        <div className="container areas-teaser">
          <div>
            <p className="eyebrow">Where we work</p>
            <h2 id="areas-title" className="section__title">Serving Southwest Missouri</h2>
            <p className="section__lead">From the Lake of the Ozarks down to north Springfield, and from Osceola east to Lebanon.</p>
            <Link to="/service-areas" className="btn btn--ghost">See all service areas</Link>
          </div>
          <ul className="county-chips">
            {counties.map(c => <li key={c.name}><Icon name="pin" /> {c.name}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container narrow"><Faq items={generalFaqs.slice(0, 5)} title="Common questions" /></div>
      </section>

      <section className="section contact-split" aria-labelledby="home-contact">
        <div className="container contact-split__inner">
          <div>
            <StarDivider />
            <h2 id="home-contact" className="section__title">Be vigilant. Schedule service today.</h2>
            <p className="section__lead">Tell us what's going on and Steve will get back to you as soon as he can.</p>
            <ul className="contact-lines">
              <li><a href={business.phoneHref}><Icon name="phone" /> {business.phone}</a></li>
              <li><a href={business.smsHref}><Icon name="sms" /> Text us</a></li>
              <li><Icon name="clock" /> {business.hoursText}</li>
            </ul>
          </div>
          <div className="card"><ContactForm source="Home page" /></div>
        </div>
      </section>
    </>
  )
}
