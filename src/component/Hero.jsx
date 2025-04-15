import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import earth from "../../public/earthsmoke.gif";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax motion values
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Existing animation variants
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
      ref={ref}
      className="hero min-h-screen z-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0"
        style={{
          y: yBg,
          scale: scaleBg
        }}
      >
        <img
          src={earth}
          alt="Earth background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay with parallax opacity */}
      <motion.div 
        className="absolute inset-0 bg-black/50"
        style={{ opacity: opacityOverlay }}
      />

      {/* Parallax Content */}
      <motion.div 
        className="hero-content text-neutral-content text-center relative z-10"
        style={{ y: yText }}
      >
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <motion.h1
            className="mb-5 text-2xl lg:text-6xl font-semibold drop-shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
          Turning Waste & Emissions Into Clean Fuel

          </motion.h1>

          <motion.p
            className="mb-5 text-xl md:text-4xl"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            We develop energy-efficient CO2 capture and biogas upgrading technologies to power industries and communities sustainably.

          </motion.p>

          <motion.button
            className="btn btn-primary "
            variants={buttonVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
           Explore Our Technology

          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
