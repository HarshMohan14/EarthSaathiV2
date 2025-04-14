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
      className="card bg-base-100 rounded-2xl w-96 shadow-2xl"
      variants={cardVariants} // Animation variants for each card
    >
      <figure>
        <img className="" src={elem.image} alt={elem.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {elem.title}
          <Icon />
        </h2>
   
        <div className="card-actions justify-end">
          <button className="btn btn-soft btn-success">Learn More</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
