
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import Hero from './Hero'
import Tailored from './Tailored'

import AchievementCarousel from './Achievement'
import Success from './Success'

const Body = () => {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: false
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div>
      <Hero />
      <Tailored />
      {/* <Innovation /> */}
      <AchievementCarousel />
      <Success />
    </div>
  )
}

export default Body
