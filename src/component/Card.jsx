import React from "react";
import { motion } from "framer-motion";
import CacheImage from "../utils/CacheImage";

const cardVariants = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.6,
      duration: 2,
    },
  },
};
const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.elem.image === nextProps.elem.image && 
         prevProps.imageStyle === nextProps.imageStyle;
};
const Card = React.memo(({ elem, imageStyle }) => {
  const { icon: Icon } = elem;

  return (
    <div
      className="card bg-base-100 rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-80 mx-auto"
      variants={cardVariants}
    >
      {/* Responsive perfect circle image container */}
      <figure className="w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden mx-auto mt-4">
      <CacheImage 
    className={`w-full h-full object-cover ${imageStyle}`}
    src={elem.image}
    alt={elem.title}
  />
      </figure>
      {/* Optional: Add title or content here */}
      {/* <div className="p-4 text-center">{elem.title}</div> */}
    </div>
  );
},[arePropsEqual]);

export default Card;
