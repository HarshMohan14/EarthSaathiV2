import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { solutions } from "../utils/tailored";
import Card from "./Card";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.7, // Stagger animation for child components
    },
  },
};

const Tailored = () => {
  const [tailored, setTailored] = useState(solutions);

  return (
    <div className="py-20">
      <div className="flex flex-col mx-auto max-w-7xl items-center">
        <h1 className="font-semibold text-4xl winky-rough-h1">
          Tailored Solutions for Every Industry
        </h1>
        <h2 className="mt-2">
          We provide innovative sustainable energy solutions across various industries
        </h2>
        {/* Parent container for staggered animations */}
        <motion.div
          className="flex flex-wrap mt-4 gap-x-8 gap-y-4"
          initial="hidden" // Initial state of the container
          animate="visible" // Animate the container when it enters the viewport
          variants={containerVariants} // Parent animation variants
        >
          {tailored.map((elem) => (
            <Card key={elem.title} elem={elem} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Tailored;
