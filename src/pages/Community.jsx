import React from 'react'
import ComingSoonHero from '../utils/ComingSoonHero'
import { SEO } from '../utils/SEO'
import ErrorBoundary from '../utils/ErrorBoundary'

const Community = () => {
  return (
    <>
      <ErrorBoundary>
        <SEO 
          title="EarthSaathi Community - Sustainable Energy & Environmental Network"
          description="Join the EarthSaathi community of sustainability advocates, environmental innovators, and green technology enthusiasts. Connect, collaborate, and create change."
          keywords="EarthSaathi community, sustainable energy community, environmental innovation network, sustainability advocates, green technology community, environmental network"
          url="https://earthsaathi.com/community"
          image="/Logo.png"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EarthSaathi Community",
            "description": "Community of sustainability advocates and environmental innovators",
            "url": "https://earthsaathi.com/community"
          }}
        />
      </ErrorBoundary>
      <div>
          <ComingSoonHero />
      </div>
    </>
  )
}

export default Community
