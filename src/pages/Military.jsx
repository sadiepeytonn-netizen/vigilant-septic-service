import PageHero from './PageHero.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { business } from '../data/business.js'
import { Icon, Flag, Faq, StarDivider, CallButton } from '../components/ui.jsx'

export default function Military() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Military Discount', '/military']]} eyebrow="Thank you for your service"
        title="Military & veteran discount"
        lead="Active duty, veterans and retired military get a discount from Vigilant Septic Service. It's our small way of saying thank you." />
      <section className="section">
        <div className="container contact-split__inner">
          <div className="prose">
            <Flag className="mil-flag-lg" />
            <h2>You served. We've got your septic.</h2>
            <p>Steve loves this country and has a lot of respect for the people who defend it. If you're active duty, a veteran or retired from any branch, tell us when you call or check the box on the form, and ask Steve what he can do for you on your job.</p>
            <ul className="checks">
              <li><Icon name="check" /> Active duty service members</li>
              <li><Icon name="check" /> Veterans of every branch</li>
              <li><Icon name="check" /> Retired military</li>
            </ul>
            <StarDivider />
            <p>Questions? Call or text <a href={business.phoneHref}>{business.phone}</a>.</p>
            <CallButton className="btn btn--red" label="Call and ask Steve" />
            <Faq items={[
              ['Who qualifies for the military discount?', 'Active duty service members, veterans and retired military.'],
              ['How do I get the discount?', 'Mention your service when you call, or check the military box on our contact form.'],
              ['Does it apply to every service?', "Ask Steve when you call. He's glad to talk through what he can do on your specific job."],
            ]} title="Military discount FAQ" />
          </div>
          <div className="card">
            <h2 className="card__title">Request service</h2>
            <ContactForm source="Military page" />
          </div>
        </div>
      </section>
    </>
  )
}
