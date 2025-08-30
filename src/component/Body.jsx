import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "./Hero";
import Tailored from "./Tailored";
import { parnter,solutions } from "../utils/tailored";
import AchievementCarousel from "./Achievement";
import Success from "./Success";
import { SEO } from "../utils/SEO";
import ErrorBoundary from "../utils/ErrorBoundary";

const Body = () => {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <ErrorBoundary>
        <SEO 
          title="EarthSaathi - Sustainable Energy Solutions & Environmental Innovation"
          description="EarthSaathi leads the way in sustainable energy solutions, environmental innovation, and climate change mitigation. Discover our cutting-edge technologies for a greener future."
          keywords="EarthSaathi, sustainable energy, environmental innovation, climate change, renewable energy, green technology, carbon reduction, sustainability solutions, clean energy, environmental protection"
          url="https://earthsaathi.com/"
          image="/Logo.png"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EarthSaathi Homepage",
            "description": "Leading sustainable energy solutions and environmental innovation platform",
            "url": "https://earthsaathi.com/",
            "mainEntity": {
              "@type": "Organization",
              "name": "EarthSaathi",
              "description": "Sustainable energy solutions and environmental innovation"
            }
          }}
        />
      </ErrorBoundary>
      <div>
        <Hero />
        <Tailored
          description="Connecting innovative energy solutions to protect our planet's
              atmosphere"
          title=" Powering Sustainable Solutions"
          solutions={solutions}
          show={true}
        />
        {/* <Innovation /> */}
        <AchievementCarousel />
        <Success />
        <Tailored
          title="Ecosystem Partners"
          solutions={parnter}
          imageStyle="object-scale-down"
          show={false}
        />
      </div>
    </>
  );
};

export default Body;
