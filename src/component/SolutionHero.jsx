import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const stages = [
  "seed",
  "sprout",
  "leaves",
  "trunk",
  "canopy"
];

const SolutionHero = () => {
  const [stage, setStage] = useState(0);

  // Animate growth step by step
  useEffect(() => {
    if (stage < stages.length - 1) {
      const timer = setTimeout(() => setStage(stage + 1), 700);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#01DC98]/10 to-[#0C1F5E]/10 overflow-hidden">
      {/* Decorative Sparkles */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute left-8 top-8"
      >
        <Sparkles size={56} className="text-[#01DC98]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute right-8 bottom-8"
      >
        <Sparkles size={56} className="text-[#0C1F5E]" />
      </motion.div>

      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 z-10">
        {/* Left: Plant Growing Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="flex-shrink-0 flex items-center justify-center w-full md:w-1/2"
        >
          <svg
            width="220"
            height="220"
            viewBox="0 0 200 200"
            className="drop-shadow-2xl"
          >
            {/* Soil */}
            <ellipse
              cx="100"
              cy="190"
              rx="60"
              ry="18"
              fill="#654321"
              opacity="0.2"
            />
            {/* Seed */}
            {stage >= 0 && (
              <motion.circle
                cx="100"
                cy="180"
                r="10"
                fill="#8B5E3C"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            {/* Sprout */}
            {stage >= 1 && (
              <motion.path
                d="M100 180 Q100 160 100 140"
                stroke="#01DC98"
                strokeWidth="6"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7 }}
              />
            )}
            {/* First leaves */}
            {stage >= 2 && (
              <>
                <motion.ellipse
                  cx="95"
                  cy="150"
                  rx="7"
                  ry="3"
                  fill="#01DC98"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.ellipse
                  cx="105"
                  cy="150"
                  rx="7"
                  ry="3"
                  fill="#01DC98"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
              </>
            )}
            {/* Trunk */}
            {stage >= 3 && (
              <motion.rect
                x="97"
                y="120"
                width="6"
                height="60"
                fill="#8B5E3C"
                initial={{ height: 0 }}
                animate={{ height: 60 }}
                transition={{ duration: 0.7 }}
              />
            )}
            {/* Canopy */}
            {stage >= 4 && (
              <motion.circle
                cx="100"
                cy="120"
                r="28"
                fill="#01DC98"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7 }}
              />
            )}
          </svg>
        </motion.div>

        {/* Right: Storytelling Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0C1F5E] mb-6 leading-tight drop-shadow">
            <span className="text-[#01DC98]">Our Solutions</span> Nurture a Greener Tomorrow
          </h1>
          <p className="mb-6 text-lg md:text-xl text-[#0C1F5E]/80 font-medium max-w-xl mx-auto md:mx-0">
            Just as a seed becomes a tree, our technology helps industries and communities grow a sustainable future—removing CO₂, recycling waste, and restoring balance to our planet.
          </p>
          <ul className="mb-8 text-[#01DC98] font-semibold space-y-2 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            <li>🌱 Millions of tons of CO₂ removed from the atmosphere</li>
            <li>♻️ Waste transformed into clean energy and biochar</li>
            <li>👩‍🔬 New opportunities for communities and the planet</li>
          </ul>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="#solutions"
            className="btn btn-lg bg-[#01DC98] text-[#0C1F5E] font-bold border-none shadow-lg hover:bg-[#0C1F5E] hover:text-white transition"
          >
            See How We Make a Difference
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionHero;
