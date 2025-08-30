import React from 'react'
import ComingSoonHero from '../utils/ComingSoonHero'
import ProjectSection from '../component/ProjectSection'
import { SEO } from '../utils/SEO'
import ErrorBoundary from '../utils/ErrorBoundary'

const Project = () => {
  return (
    <>
      <ErrorBoundary>
        <SEO 
          title="EarthSaathi Projects - Sustainable Energy & Environmental Initiatives"
          description="Discover EarthSaathi's groundbreaking projects in sustainable energy and environmental protection. See our real-world impact in creating a sustainable future."
          keywords="EarthSaathi projects, sustainable energy projects, environmental projects, green technology projects, sustainability initiatives, carbon capture projects"
          url="https://earthsaathi.com/projects"
          image="/Logo.png"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EarthSaathi Projects",
            "description": "Sustainable energy and environmental protection projects",
            "url": "https://earthsaathi.com/projects"
          }}
        />
      </ErrorBoundary>
      <div className=''>
          <ProjectSection />
      </div>
    </>
  )
}

export default Project
