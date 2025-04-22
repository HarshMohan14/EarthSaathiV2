import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import Card from "./Card";

const Tailored = ({ title, description, solutions, imageStyle,show }) => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [contentWidth, setContentWidth] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    let debounceTimeout;
    const updateWidth = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const firstChild = container.children[0];
        const gap = parseInt(getComputedStyle(container).gap) || 0;
        
        // Calculate width first
        const width = (firstChild.offsetWidth + gap) * solutions.length - gap;
        
        // Set both states
        setContentWidth(width);
        setDuration(Math.min(width / 100, 15)); // Cap at 15s
      }
    };
  
    const debouncedUpdateWidth = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(updateWidth, 100);
    };
  
    // Initial call to set values
    updateWidth();
    
    window.addEventListener("resize", debouncedUpdateWidth);
    return () => window.removeEventListener("resize", debouncedUpdateWidth);
  }, [solutions]);
  const animationConfig = useMemo(() => {
    if (contentWidth === 0) return null;
    
    const finalX = -contentWidth;
    const calculatedDuration = Math.min(contentWidth / 100, 15);
    
    return {
      x: [0, finalX],
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: calculatedDuration,
      }
    };
  }, [contentWidth]);
  
  useEffect(() => {
    if (animationConfig) {
      controls.start(animationConfig);
    }
  }, [animationConfig, controls]);
  const duplicatedSolutions = useMemo(
    () => [...solutions, ...solutions],
    [solutions]
  );

  return (
    <div className="relative overflow-hidden py-8 md:py-12">
      <div className="relative z-10 container mx-auto  px-2">
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
            key={contentWidth} 
            className="flex gap-0 md:gap-4 w-max"
            transition={{ duration: Math.min(duration, 15) }}
            style={{ willChange: 'transform' }}
          >
            {duplicatedSolutions.map((elem, index) => (
              <div 
                key={elem.id}
                className="w-64 sm:w-72 md:w-80 flex-shrink-0" // Responsive card widths
              >
                <Card imageStyle={imageStyle} elem={elem} show={show} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Tailored);

