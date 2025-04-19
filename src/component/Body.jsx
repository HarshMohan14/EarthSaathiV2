import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "./Hero";
import Tailored from "./Tailored";
import { parnter,solutions } from "../utils/tailored";
import AchievementCarousel from "./Achievement";
import Success from "./Success";

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
    <div>
      <Hero />
      <Tailored
        description="Connecting innovative energy solutions to protect our planet's
            atmosphere"
        title=" Powering Sustainable Solutions"
        solutions={solutions}
      />
      {/* <Innovation /> */}
      <AchievementCarousel />
      <Success />
      <Tailored
        title="Ecosystem Partners"
        solutions={parnter}
        imageStyle="object-scale-down"
      />
    </div>
  );
};

export default Body;
