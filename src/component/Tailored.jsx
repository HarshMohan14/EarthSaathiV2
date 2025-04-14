import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { solutions } from "../utils/tailored";
import Card from "./Card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.7 }
  },
};

const Tailored = () => {
  const [tailored, setTailored] = useState(solutions);
  const ref = useRef(null);
  
  // Parallax scroll setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax motion values
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yCards = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <motion.div 
      ref={ref}
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "100px" }}
    >
      <div className="flex flex-col mx-auto max-w-7xl items-center">
        <motion.div 
          className="text-center"
          style={{ y: yTitle }}
        >
          <motion.h1 
            className="font-semibold text-4xl winky-rough-h1 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Tailored Solutions for Every Industry
          </motion.h1>
          <motion.h2 
            className="mt-2 text-lg text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            We provide innovative sustainable energy solutions across various industries
          </motion.h2>
        </motion.div>

        <motion.div 
          className="flex flex-wrap mt-4 gap-x-8 gap-y-4 pb-32"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) // Reduce parallax distance
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: true, 
            amount: 0.1, // Trigger when 40% visible
            margin: "0px 0px -200px 0px" // Negative bottom margin
          }}
          
          variants={containerVariants}
        >
          {tailored.map((elem) => (
            <Card key={elem.title} elem={elem} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Tailored;
