import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { solutions } from "../utils/tailored";
import Card from "./Card";

const Tailored = () => {
  const ref = useRef(null);
  
  // Scroll progress with optimized smoothing
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    smooth: 1.5 // Increased smoothness
  });

  // Simplified transforms
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "-2%"]); // Reduced movement

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 2,
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Optimized Background */}
      <motion.div
        className="fixed inset-0 bg-[url('/energy-pattern.jpg')] bg-cover bg-center"
        style={{
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.02]), // Reduced scale
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-32">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            Powering Sustainable Solutions
          </h1>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            Connecting innovative energy solutions to protect our planet's atmosphere
          </p>
        </motion.div>

        {/* Card Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ y: cardsY }}
        >
          {solutions.map((elem, index) => (
            <motion.div
              key={elem.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ 
                once: true,
                margin: "0px 0px -200px 0px",
                amount: 0.1 // Trigger earlier
              }}
              custom={index}
              transition={{ delay: index * 0.05 }}
            >
              <Card elem={elem} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Simplified Energy Beams */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-cyan-400/20 to-emerald-400/20"
          initial={{
            width: "30%",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0
          }}
          animate={{
            opacity: [0, 0.3, 0],
            x: ["-50%", "50%"]
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ translateX: "-50%" }}
        />
      ))}
    </motion.div>
  );
};

export default Tailored;
