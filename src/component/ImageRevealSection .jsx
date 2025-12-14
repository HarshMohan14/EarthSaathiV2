import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ImageRevealSection = ({
  title,
  description,
  mainImage,
  points = [],
  imagePosition = "right",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const textVariants = {
    hidden: { opacity: 0, x: imagePosition === "right" ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  };

  const pointVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col gap-8 md:gap-12 lg:gap-16 ${
        imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"
      } items-center justify-between min-h-230px p-4 md:p-8 lg:p-12`}
    >
      {/* Text Content */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={textVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-6 md:space-y-8"
      >
        <p className="text-[#01DC98] openSans font-semibold text-5xl">{title}</p>
        <p className="text-lg text-[#0C1F5E] md:text-xl poppins">{description}</p>
        {/* Points List */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          {points.map((point, index) => (
            <motion.div
              key={index}
              variants={pointVariants}
              className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100/50"
            >
              <div className="w-6 h-6 bg-[#01DC98] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="flex-1 text-base md:text-lg text-gray-900 poppins font-medium">{point}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Image with Cover Animation */}
      <motion.div
        className="flex-1 relative"
        initial={{ overflow: "hidden" }}
      >
        <div className="relative w-full h-full">
          {/* Cover overlay that slides out */}
          <motion.div
            initial={{ x: 0 }}
            animate={isInView ? { x: imagePosition === "right" ? "100%" : "-100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute inset-0 bg-base-200 z-10"
            style={{
              clipPath: "inset(0 0 0 0)", // optional, for better masking
            }}
          />

          {/* Main Image */}
          <div className="card bg-base-200 shadow-xl overflow-hidden">
            <img
              src={mainImage}
              alt="Main"
              className="w-full h-full object-cover aspect-square"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageRevealSection;
