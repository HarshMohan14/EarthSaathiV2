import React from 'react'
import ComingSoonHero from '../utils/ComingSoonHero'
import { SEO } from '../utils/SEO'
import ErrorBoundary from '../utils/ErrorBoundary'

const Resources = () => {
  return (
    <>
      <ErrorBoundary>
        <SEO 
          title="EarthSaathi Resources - Sustainable Energy Knowledge Hub"
          description="Access EarthSaathi's comprehensive resources on sustainable energy, environmental innovation, and climate change solutions. Expert insights and educational content."
          keywords="EarthSaathi resources, sustainable energy resources, environmental innovation resources, climate change education, sustainability knowledge, green technology resources"
          url="https://earthsaathi.com/resources"
          image="/Logo.png"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EarthSaathi Resources",
            "description": "Sustainable energy and environmental innovation resources",
            "url": "https://earthsaathi.com/resources"
          }}
        />
      </ErrorBoundary>
      <div>
          <ComingSoonHero />
      </div>
    </>
  )
}

export default Resources
