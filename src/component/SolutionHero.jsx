import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Bg from "/ResourceBg.mp4";

const SolutionHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={Bg}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Optional: Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white/80 backdrop-blur-sm z-0" />

      {/* Decorative Sparkles */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute left-8 top-8 z-10"
      >
        <Sparkles size={56} className="text-[#01DC98]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute right-8 bottom-8 z-10"
      >
        <Sparkles size={56} className="text-[#0C1F5E]" />
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="w-full text-center"
        >
          <h1 className="text-white mb-6 leading-tight drop-shadow">
            <span className="text-[#01DC98]">2 Market</span> 1 Solution
            <span className="text-[#01DC98]"> 1 Mission</span> 
          </h1>
          <p className="mb-6 text-4xl text-yellow-400 openSans font-bold max-w-xl mx-auto">
           Decarbonization
          </p>
          <ul className="mb-8 text-white space-y-2 max-w-lg mx-auto">
            <li> Millions of tons of CO₂ removed from the industrial flue gas</li>
            <li> Waste transformed into clean energy and biochar</li>
            <li>New opportunities for communities and the planet</li>
          </ul>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="#solutions"
            className="btn btn-lg bg-[#01DC98] text-[#0C1F5E] border-none shadow-lg hover:bg-[#0C1F5E] hover:text-white transition"
          >
            See How We Make a Difference
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionHero;
