import PageHero from './PageHero.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { business } from '../data/business.js'
import { Icon } from '../components/ui.jsx'

export default function Contact() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Contact', '/contact']]} eyebrow="Get in touch" title="Request septic service"
        lead="Tell us what's going on. Steve will get back to you with a straight answer and an honest price." />
      <section className="section">
        <div className="container contact-split__inner">
          <div className="card"><ContactForm source="Contact page" /></div>
          <div className="contact-info">
            <a href={business.phoneHref} className="contact-tile"><Icon name="phone" /><span><strong>Call</strong>{business.phone}</span></a>
            <a href={business.smsHref} className="contact-tile"><Icon name="sms" /><span><strong>Text</strong>{business.phone}</span></a>
            <a href={`mailto:${business.email}`} className="contact-tile"><Icon name="mail" /><span><strong>Email</strong>{business.email}</span></a>
            <div className="contact-tile"><Icon name="clock" /><span><strong>Hours</strong>{business.hoursText}</span></div>
            <a href={business.googleCidUrl} target="_blank" rel="noopener" className="contact-tile"><Icon name="google" /><span><strong>Google Business Profile</strong>5.0 ★ · {business.googleReviewCount} reviews</span></a>
            <div className="map">
              <iframe title="Vigilant Septic Service on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Vigilant%20Septic%20Service&ll=37.9379505,-93.3135789&z=9&output=embed" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
