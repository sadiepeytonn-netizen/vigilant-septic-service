import PageHero from './PageHero.jsx'
import { reviews } from '../data/reviews.js'
import { business } from '../data/business.js'
import { ReviewCard, CtaBand } from '../components/sections.jsx'
import { Icon, Stars, Reveal } from '../components/ui.jsx'

export default function ReviewsPage() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Reviews', '/reviews']]} eyebrow="Reviews" title="5.0 stars from our neighbors"
        lead={`Every one of our ${business.googleReviewCount} Google reviews is five stars. Here's what customers say in their own words.`}>
        <div className="hero__btns">
          <a className="btn btn--white" href={business.googleReviewsUrl} target="_blank" rel="noopener"><Icon name="google" /> See all on Google</a>
          <a className="btn btn--outline-light" href={business.googleWriteReviewUrl} target="_blank" rel="noopener">Leave a review</a>
        </div>
      </PageHero>
      <section className="section section--cream">
        <div className="container">
          <div className="rating-summary"><span className="rating-summary__num">5.0</span><Stars /><span>{business.googleReviewCount} Google reviews</span></div>
          <div className="reviews-masonry">
            {reviews.map((r, i) => <Reveal key={r.name + r.date} delay={(i % 3) * 60}><ReviewCard r={r} /></Reveal>)}
          </div>
        </div>
      </section>
      <CtaBand title="Join our happy customers" />
    </>
  )
}
