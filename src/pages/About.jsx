import React from 'react'
import AboutHero from '../component/AboutHero'
import MissionVision from '../component/MissionVision'
import AnimatedTestimonials from '../component/Achievement'
import RoadmapImpact from '../component/RoadmapImpact'
import AdvisorsSection from '../component/AdvisorCard'

const About = () => {
  return (
    <div>
      <AboutHero />
      <MissionVision />
      <AnimatedTestimonials />
      <AdvisorsSection />
      <RoadmapImpact />
    </div>
  )
}

export default About
