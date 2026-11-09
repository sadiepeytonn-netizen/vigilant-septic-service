import { Link } from 'react-router-dom'
import PageHero from './PageHero.jsx'
import { ServiceGrid } from '../components/sections.jsx'
export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found" lead="That page doesn't exist, but we can still help with your septic system.">
        <div className="hero__btns"><Link to="/" className="btn btn--white">Go home</Link></div>
      </PageHero>
      <section className="section"><div className="container"><ServiceGrid /></div></section>
    </>
  )
}
