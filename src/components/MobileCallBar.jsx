import { Link } from 'react-router-dom'
import { business } from '../data/business.js'
import { Icon } from './ui.jsx'

export default function MobileCallBar() {
  return (
    <div className="callbar" role="navigation" aria-label="Quick contact">
      <a href={business.phoneHref}><Icon name="phone" /> Call</a>
      <a href={business.smsHref}><Icon name="sms" /> Text</a>
      <Link to="/contact" className="is-red">Free Estimate</Link>
    </div>
  )
}
