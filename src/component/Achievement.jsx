import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shaurya from "../../public/shaurya.jpg";
import placeholder from "/earthSaathiFavicon.jpg"
const testimonials = [
  {
    quote:
      "Dr. Shaurya Mohan is a chemical engineer, climate strategist, and clean energy innovator with over 5 years of experience in R&D, industrial consulting, and energy transition planning. As a Ph.D. from ICT Mumbai, her work focuses on developing high-impact, low-cost decarbonization technologies for industries and waste systems.",
    name: "Dr. Shaurya Mohan",
    designation: "CEO & Co-Founder, EarthSaathi",
    src: shaurya,
  },
  {
    quote:
      "Holds a PhD in Chemical Engineering from the Institute of Chemical Technology, Mumbai, India. Focuses on biofuels and carbon capture with in-depth research on Sustainable Aviation Fuel (SAF), renewable diesel, and feedstock markets. Co-holds a patent for an energy-efficient absorbent designed for carbon capture, funded by the Centre of Higher Technology (CHT), Government of India, Delhi. Unique blend of academic knowledge and practical experience positions as a leader in the biofuels sector, driving innovation and sustainability.",
    name: "Dr. Namrata",
    designation: "CTO, Co-founder",
    src: placeholder,
  },
];

const AnimatedTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateTestimonial = (direction) => {
    const newIndex =
      (activeIndex + direction + testimonials.length) % testimonials.length;
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
    <div className="flex justify-center flex-col items-center gap-12 py-10 ">
      <h1 className="  text-[#0C1F5E]">Meet Our Team</h1>
      <div className="max-w-7xl p-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Image Container */}
          {/* Image Container */}
          <div className="relative col-span-1 w-40 h-40 mx-auto">
            {testimonials.map((testimonial, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const zIndex = testimonials.length - absOffset;
              const opacity = index === activeIndex ? 1 : 0.7;
              const scale = 1 - absOffset * 0.15;

              return (
                <img
                  key={index}
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="absolute w-full h-full object-cover rounded-full shadow-lg transition-transform duration-700"
                  style={{
                    zIndex,
                    opacity,
                    transform: `scale(${scale})`,
                  }}
                />
              );
            })}
          </div>

          {/* Content */}
          <div className="flex col-span-3 flex-col justify-between">
            <div>
              <h3 className=" text-[#01DC98]  mb-2">
                {testimonials[activeIndex].name}
              </h3>
              <p className=" text-[#0C1F5E] mb-4">
                {testimonials[activeIndex].designation}
              </p>
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
                  className=" text-gray-700 leading-relaxed"
                >
                  {testimonials[activeIndex].quote
                    .split(" ")
                    .map((word, index) => (
                      <motion.span
                        key={index}
                        variants={textAnimation}
                        className="inline-block mr-1"
                      >
                        {word}
                      </motion.span>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-4 pt-12 md:pt-5">
              <button
                onClick={() => updateTestimonial(-1)}
                className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-white"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button
                onClick={() => updateTestimonial(1)}
                className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-white"
                >
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
