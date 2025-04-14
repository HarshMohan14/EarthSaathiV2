import { motion } from "framer-motion";
import React from "react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 }
  }
};

const textVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { type: "spring", bounce: 0.4 }
  }
};

const Innovation = () => {
  const images = [
    { image: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6", id: 1 },
    { image: "https://images.unsplash.com/photo-1491677533189-49af044391ed", id: 2 },
    { image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3", id: 3 },
    { image: "https://images.unsplash.com/photo-1517925035435-7976539b920d", id: 4 }
  ];

  return (
    <motion.div 
      className="hero bg-base-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Animated Image Grid */}
        <motion.div 
          className="flex flex-wrap gap-2 w-5/12"
          variants={containerVariants}
        >
          {images.map(({ image, id }, index) => (
            <motion.img
              key={id}
              src={image}
              className="w-60 h-auto rounded-lg shadow-xl"
              alt={`Image ${id}`}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          ))}
        </motion.div>

        {/* Animated Text Section */}
        <motion.div 
          className="w-7/12"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-5xl font-bold mb-6"
            variants={textVariants}
          >
            Innovative Technologies for Sustainable Energy
          </motion.h1>
          
          <motion.p 
            className="py-6 text-lg leading-relaxed"
            variants={textVariants}
          >
            Our state-of-the-art technology focuses on enhancing energy conversion processes, such as advanced CO2 scrubbing, anaerobic digestion, and gasification techniques. By improving biogas production efficiency, we aim to maximize output while minimizing environmental impact.
          </motion.p>
          
          <motion.button 
            className="btn btn-primary"
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover Our Technology
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Innovation;
