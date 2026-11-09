import { Breadcrumbs } from '../components/ui.jsx'
export default function PageHero({ crumbs, eyebrow, title, lead, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1>{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children}
      </div>
    </section>
  )
}
