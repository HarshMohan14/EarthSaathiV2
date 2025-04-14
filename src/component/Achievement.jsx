import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import bpcl from "../../public/bpcl.jpg";
import shell from "../../public/shell.jpg";
import aic from "../../public/AIC.jpg"
const achievements = [
  {
    title: "Shell E4",
    description:
      "After a multi-level screening process, Shell E4 has selected 5 innovative startups to join the boot camp journey for the Net Zero Challenge. Presenting the Top 5 selected startups: Apratima Biosolutions Pvt Ltd, Rechain Technologies Pvt Ltd, EarthSaathi, Low Cost Indigeneous CO2 Electrolyser and PrakREti.",
    image: bpcl,
  },
  {
    title: "BPCL Innovation Award 2023",
    description:
      "EarthSaathi has been selected as one of the finalists in the BPCL Innovation Award 2023 Final Round! 🚀 The competition has been fierce, with an overwhelming response from innovators in the field of energy and sustainability.",
    image: shell,
  },
  {
    title: "Incubated by AIC Sangam Innovation Foundation. Received the grant of ₹20 lakhs",
    description:
      "EarthSaathi is among the selected ventures supported by Amaly Legacy's Climate and Social Innovation Studio. This incredible opportunity will help us design Proof of Concepts (PoCs) and aid our market entry/distribution efforts. We’re excited to create social and environmental impact in rural communities, particularly in areas like community development, forestry, agriculture, and value-added processing in East Africa.",
    image: aic,
  },
];

const AchievementCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const cardVariants = {
    hidden: (direction) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent mb-4">
          Proven Excellence in Innovation
        </h1>
        <p className="text-lg text-gray-600">
          EarthSaathi has garnered industry recognition for our commitment to sustainability and innovation
        </p>
      </motion.div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Image Section */}
          <div className="h-64 overflow-hidden">
            <img
              src={achievements[currentIndex].image}
              alt={achievements[currentIndex].title}
              className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-4">
            <motion.h3
              variants={textVariants}
              className="text-2xl font-bold text-gray-800"
            >
              {achievements[currentIndex].title}
            </motion.h3>
            <motion.p
              variants={textVariants}
              className="text-gray-600 leading-relaxed"
            >
              {achievements[currentIndex].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </motion.button>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </motion.button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {achievements.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementCarousel;
