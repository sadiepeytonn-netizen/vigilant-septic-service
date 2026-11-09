import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ExitIntent from './components/ExitIntent.jsx'
import MobileCallBar from './components/MobileCallBar.jsx'
import Seo from './components/Seo.jsx'
import Home from './pages/Home.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import About from './pages/About.jsx'
import Military from './pages/Military.jsx'
import ReviewsPage from './pages/ReviewsPage.jsx'
import ServiceAreas from './pages/ServiceAreas.jsx'
import FaqPage from './pages/FaqPage.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Seo />
      <ScrollToTop />
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/how-septic-systems-work" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/military" element={<Military />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileCallBar />
      <ExitIntent />
    </>
  )
}
