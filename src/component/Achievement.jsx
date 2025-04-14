import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "I was impressed by the food — every dish is bursting with flavor! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive, going the extra mile. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Restaurant Critic",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond to ensure a fantastic visit. I'll definitely keep returning for more exceptional dining experience.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote: "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
];

const AnimatedTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateTestimonial = (direction) => {
    const newIndex = (activeIndex + direction + testimonials.length) % testimonials.length;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const autoplayInterval = setInterval(() => updateTestimonial(1), 5000);

    return () => clearInterval(autoplayInterval); // Cleanup interval on unmount
  }, [activeIndex]);

  const textAnimation = {
    hidden: { opacity: 0.3, y: 10 }, // Start at 30% opacity and slightly below
    visible: { opacity: 1, y: 0 }, // Animate to full opacity and original position
  };

  return (
    <div className="flex justify-center flex-col items-center gap-12 min-h-screen ">
        <h1 className="text-2xl md:text-7xl text-[#0C1F5E]">Meet Our Teams</h1>
      <div className="max-w-7xl p-8">
        <div className="grid gap-20 md:grid-cols-2">
          {/* Image Container */}
          <div className="relative w-full h-96 perspective">
            {testimonials.map((testimonial, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const zIndex = testimonials.length - absOffset;
              const opacity = index === activeIndex ? 1 : 0.7;
              const scale = 1 - absOffset * 0.15;
              const translateY = offset === -1 ? "-20%" : offset === 1 ? "20%" : "0%";
              const rotateY = offset === -1 ? "15deg" : offset === 1 ? "-15deg" : "0deg";

              return (
                <img
                  key={index}
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="absolute w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-700"
                  style={{
                    zIndex,
                    opacity,
                    transform: `translateY(${translateY}) scale(${scale}) rotateY(${rotateY})`,
                  }}
                />
              );
            })}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-black mb-2">{testimonials[activeIndex].name}</h3>
              <p className="text-sm text-gray-500 mb-4">{testimonials[activeIndex].designation}</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex} // Ensure animation restarts on index change
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  className="text-lg text-gray-700 leading-relaxed"
                >
                  {testimonials[activeIndex].quote.split(" ").map((word, index) => (
                    <motion.span key={index} variants={textAnimation} className="inline-block mr-1">
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={() => updateTestimonial(-1)}
                className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button
                onClick={() => updateTestimonial(1)}
                className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M10 6L8.59 7.41l4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
