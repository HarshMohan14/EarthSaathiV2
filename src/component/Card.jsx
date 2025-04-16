import React from "react";
import { motion } from "framer-motion"; // Correct import

const cardVariants = {
  hidden: {
    y: -20, // Start slightly above its position
    opacity: 0,
  },
  visible: {
    y: 0, // Move into its final position
    opacity: 1,
    transition: {
      type: "spring", // Smooth spring effect
      bounce: 0.6, // Slight bounce effect
      duration: 2, // Duration of animation
    },
  },
};

const Card = ({ elem }) => {
  const { icon: Icon } = elem;

  return (
    <motion.div
      className="card bg-base-100 rounded-2xl w-80"
      variants={cardVariants}
    >
      {/* Perfect circle image container */}
      <figure className="w-48 h-48 rounded-full overflow-hidden mx-auto mt-4">
        <img 
          className="w-full h-full object-cover" 
          src={elem.image} 
          alt={elem.title} 
        />
      </figure>
    </motion.div>
  );
};


export default Card;
