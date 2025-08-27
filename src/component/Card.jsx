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
const Card = React.memo(({ elem, imageStyle,show }) => {
  const { icon: Icon } = elem;

  return (
    <div
      className="card bg-base-100 rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-80 mx-auto"
      variants={cardVariants}
    >
      {/* Responsive perfect circle image container */}
   
      <figure className="w-48 h-48 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full  mx-auto mt-4">
      <CacheImage 
    className={`w-full h-full object-cover ${imageStyle}`}
    src={elem.image}
    alt={elem.title}
  />
      </figure>
      {show && <p className="text-sm mt-2 font-bold openSans text-center text-[#0C1F5E]">{elem.title}</p>}
      {/* Optional: Add title or content here */}
      {/* <div className="p-4 text-center">{elem.title}</div> */}
    </div>
  );
},[arePropsEqual]);

export default Card;
