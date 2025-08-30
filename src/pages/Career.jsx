import React from 'react'
import ComingSoonHero from '../utils/ComingSoonHero'
import { SEO } from '../utils/SEO'
import ErrorBoundary from '../utils/ErrorBoundary'

const Career = () => {
  return (
    <>
      <ErrorBoundary>
        <SEO 
          title="EarthSaathi Careers - Join Our Sustainable Energy Mission"
          description="Build your career with EarthSaathi and contribute to sustainable energy solutions and environmental innovation. Join our team of passionate professionals."
          keywords="EarthSaathi careers, sustainable energy jobs, environmental technology careers, green jobs, sustainability careers, environmental innovation jobs"
          url="https://earthsaathi.com/careers"
          image="/Logo.png"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EarthSaathi Careers",
            "description": "Career opportunities in sustainable energy and environmental innovation",
            "url": "https://earthsaathi.com/careers"
          }}
        />
      </ErrorBoundary>
      <div>
        <ComingSoonHero />
      </div>
    </>
  )
}

export default Career
