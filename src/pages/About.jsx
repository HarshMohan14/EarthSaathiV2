import React from 'react'
import AboutHero from '../component/AboutHero'
import MissionVision from '../component/MissionVision'
import AnimatedTestimonials from '../component/Achievement'
import RoadmapImpact from '../component/RoadmapImpact'
import AdvisorsSection from '../component/AdvisorCard'
import { SEO } from '../utils/SEO'
import ErrorBoundary from '../utils/ErrorBoundary'

const About = () => {
  return (
    <>
      <ErrorBoundary>
        <SEO 
          title="About EarthSaathi - Our Mission for Sustainable Future"
          description="Learn about EarthSaathi's mission to revolutionize sustainable energy solutions and environmental innovation. Discover our story, values, and commitment to a greener planet."
          keywords="About EarthSaathi, EarthSaathi mission, sustainable energy company, environmental innovation, climate change solutions, green technology company"
          url="https://earthsaathi.com/about"
          image="/Logo.png"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "About EarthSaathi",
            "description": "Learn about EarthSaathi's mission for sustainable energy solutions",
            "url": "https://earthsaathi.com/about"
          }}
        />
      </ErrorBoundary>
      <div>
        <AboutHero />
        <MissionVision />
        <AnimatedTestimonials />
        <AdvisorsSection />
        <RoadmapImpact />
      </div>
    </>
  )
}

export default About
