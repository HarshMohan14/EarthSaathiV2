import { motion } from "framer-motion";
import React from "react";
import earth from "../../public/earthsmoke.gif"
const Hero = () => {
  // Animation variants for text and button
  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
  };

  return (
    <motion.div
      className="hero min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${earth})`, // Replace with your pollution-themed GIF URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="hero-content text-neutral-content text-center relative z-10">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <motion.h1
            className="mb-5 text-5xl font-bold drop-shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Transforming Waste into Sustainable Energy Solutions
          </motion.h1>

          <motion.p
            className="mb-5 text-xl"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            Join EarthSaathi in Revolutionizing the Energy Landscape through Innovative Bio-CNG Solutions
          </motion.p>

          <motion.button
            className="btn btn-primary"
            variants={buttonVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
