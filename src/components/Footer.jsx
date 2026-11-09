import { Link } from 'react-router-dom'
import { services } from '../data/services.js'
import { business, counties } from '../data/business.js'
import { Logo, Icon, FlagStripe, Stars } from './ui.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <FlagStripe />
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>Local, family-owned septic installation, repair and inspections for Southwest Missouri. {business.slogan}</p>
          <a className="footer__rating" href={business.googleReviewsUrl} target="_blank" rel="noopener">
            <Icon name="google" /> <Stars /> <strong>5.0</strong> · {business.googleReviewCount} Google reviews
          </a>
          <p className="footer__proud">★ Proudly American · Military &amp; veteran discount</p>
        </div>
        <div>
          <h3>Services</h3>
          <ul>{services.map(s => <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>)}</ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Steve</Link></li>
            <li><Link to="/how-septic-systems-work">How Septic Systems Work</Link></li>
            <li><Link to="/military">Military Discount</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/service-areas">Service Areas</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <h3 className="mt">Find us on Google</h3>
          <ul>
            <li><a href={business.googleCidUrl} target="_blank" rel="noopener">Google Business Profile</a></li>
            <li><a href={business.googleReviewsUrl} target="_blank" rel="noopener">Read our Google reviews</a></li>
            <li><a href={business.googleWriteReviewUrl} target="_blank" rel="noopener">Leave us a review</a></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <address>
            <a href={business.phoneHref}><Icon name="phone" /> {business.phone}</a>
            <a href={`mailto:${business.email}`}><Icon name="mail" /> {business.email}</a>
            <span><Icon name="clock" /> {business.hoursText}</span>
            <span><Icon name="pin" /> Serving {business.region}</span>
          </address>
          <p className="footer__counties">{counties.map(c => c.name.replace(' County', '')).join(' · ')} counties</p>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span>
        <span>Member, Missouri Smallflows Organization</span>
      </div>
    </footer>
  )
}
