import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Card from "./Card";

const Tailored = ({ title, description, solutions, imageStyle }) => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const firstChild = container.children[0];
        const gap = parseInt(getComputedStyle(container).gap) || 0;
        
        setContentWidth(
          (firstChild.offsetWidth + gap) * solutions.length - gap
        );
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [solutions]);

  useEffect(() => {
    if (contentWidth === 0) return;

    const finalX = -contentWidth;
    const duration = contentWidth / 100; // Dynamic duration based on content width
    
    controls.start({
      x: [0, finalX],
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: duration > 15 ? 15 : duration, // Cap duration at 15s
      },
    });
  }, [contentWidth, controls]);

  return (
    <div className="relative overflow-hidden py-8 md:py-12">
      <div className="relative z-10 container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-[#0C1F5E] mb-3 text-3xl md:text-4xl font-bold">
            {title}
          </h1>
          <h2 className="text-[#0C1F5E] text-lg md:text-xl lg:text-2xl px-2">
            {description}
          </h2>
        </div>

        {/* Card Carousel */}
        <div className="overflow-hidden py-4 md:py-8 relative">
          <motion.div
            ref={containerRef}
            animate={controls}
            className="flex gap-3 md:gap-4 w-max"
            style={{ willChange: 'transform' }}
          >
            {[...solutions, ...solutions, ...solutions].map((elem, index) => (
              <div 
                key={`${elem.title}-${index}`}
                className="w-64 sm:w-72 md:w-80 flex-shrink-0" // Responsive card widths
              >
                <Card imageStyle={imageStyle} elem={elem} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Tailored;
