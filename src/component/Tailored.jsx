import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { solutions } from "../utils/tailored";
import Card from "./Card";

const Tailored = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // Calculate exact width of single set of cards including gaps
      const container = containerRef.current;
      const firstChild = container.children[0];
      const gap = parseInt(getComputedStyle(container).gap) || 0;
      
      setContentWidth(
        (firstChild.offsetWidth + gap) * solutions.length - gap
      );
    }
  }, [solutions]);

  useEffect(() => {
    if (contentWidth === 0) return;

    const finalX = -contentWidth;
    
    controls.start({
      x: [0, finalX],
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 5,
      },
    });
  }, [contentWidth, controls]);

  return (
    <div className="relative  overflow-hidden py-10">
      <div className="relative z-10 container mx-auto my-auto px-4 py-12">
        {/* ... Header remains unchanged ... */}
        <div className="text-center mb-16">
          <h1 className="text-[#0C1F5E] mb-4 text-4xl font-bold">
            Powering Sustainable Solutions
          </h1>
          <h2 className="text-[#0C1F5E] text-xl md:text-2xl">
            Connecting innovative energy solutions to protect our planet's
            atmosphere
          </h2>
        </div>
        {/* Card train container */}
  {/* Card train container */}
  <div className="overflow-hidden py-8 relative">
          <motion.div
            ref={containerRef}
            animate={controls}
            className="flex gap-2 w-max"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Triple duplication for seamless looping */}
            {[...solutions, ...solutions, ...solutions].map((elem, index) => (
              <div 
                key={`${elem.title}-${index}`}
                className="w-80 flex-shrink-0"
              >
                <Card elem={elem} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Tailored;
