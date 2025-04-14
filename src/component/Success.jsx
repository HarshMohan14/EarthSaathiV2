import React, { useState, useEffect, useRef } from "react";
import { Link as LucideLink, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import bpcl from "../../public/bpcl.jpg";
import shell from "../../public/shell.jpg";
import aic from "../../public/AIC.jpg";
import AnimatedHeadline from "./AnimatedHeadline ";

const posts = [
    {
      title: "Shell E4",
      description:
        "After a multi-level screening process, Shell E4 has selected 5 innovative startups to join the boot camp journey for the Net Zero Challenge. Presenting the Top 5 selected startups: Apratima Biosolutions Pvt Ltd, Rechain Technologies Pvt Ltd, EarthSaathi, Low Cost Indigeneous CO2 Electrolyser and PrakREti.",
      image: bpcl,
      date: "2024-03-01",
    },
    {
      title: "BPCL Innovation Award 2023",
      description:
        "EarthSaathi has been selected as one of the finalists in the BPCL Innovation Award 2023 Final Round! 🚀 The competition has been fierce, with an overwhelming response from innovators in the field of energy and sustainability.",
      image: shell,
      date: "2023-12-15",
    },
    {
      title:
        "Incubated by AIC Sangam Innovation Foundation. Received the grant of ₹20 lakhs",
      description:
        "EarthSaathi is among the selected ventures supported by Amaly Legacy's Climate and Social Innovation Studio. This incredible opportunity will help us design Proof of Concepts (PoCs) and aid our market entry/distribution efforts. We’re excited to create social and environmental impact in rural communities, particularly in areas like community development, forestry, agriculture, and value-added processing in East Africa.",
      image: aic,
      date: "2024-01-20",
    },
  ];

export default function SuccessCarousel() {
  const [current, setCurrent] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const containerRef = useRef(null);
  const timeoutRef = useRef();

  // Responsive slides calculation
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      setSlidesToShow(width >= 1280 ? 3 : width >= 768 ? 2 : 1);
    };
    
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // Smooth autoplay with pause on interaction
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent(prev => (prev + 1) % posts.length);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const prevSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrent(prev => (prev - 1 + posts.length) % posts.length);
  };

  const nextSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrent(prev => (prev + 1) % posts.length);
  };

  // Calculate card width based on container
  const cardWidth = `calc((100% - ${(slidesToShow - 1) * 3}rem) / ${slidesToShow})`;

  return (
    <div className="bg-[#f1f6ff] py-10 flex flex-col items-center">
     <AnimatedHeadline />
      
      <div className="relative w-full max-w-7xl overflow-hidden">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-blue-100 transition"
          aria-label="Previous"
        >
          <span className="text-2xl text-gray-700">&#8592;</span>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-blue-100 transition"
          aria-label="Next"
        >
          <span className="text-2xl text-gray-700">&#8594;</span>
        </button>

        {/* Animated Carousel Container */}
        <motion.div
          ref={containerRef}
          className="flex gap-8 px-4"
          style={{
            x: `-${current * (100 / slidesToShow)}%`,
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={index}
              className="shrink-0 relative"
              style={{ width: cardWidth }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-lg flex flex-col h-full">
                <div className="relative overflow-hidden rounded-t-xl">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.a
                    href="#"
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-cyan-400/75 to-blue-600/60 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <LucideLink className="text-white w-8 h-8" />
                  </motion.a>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-base mb-4 flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Clock className="mr-2 w-5 h-5 text-green-400" />
                    {post.date}
                  </div>
                  <a
                    href="#"
                    className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? 'bg-blue-500 scale-125' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
