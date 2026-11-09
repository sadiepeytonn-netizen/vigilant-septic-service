import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
export { headTags, staticRoutes } from './seo/meta.js'
export { SITE_URL, business, counties } from './data/business.js'
export { services } from './data/services.js'
export { generalFaqs, septicStages } from './data/content.js'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
