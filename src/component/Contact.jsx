import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Contact = () => {
  const ref = useRef(null);

  // Scroll-based transformations for heading
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Trigger animations when the section enters/exits the viewport
  });

  const yHeading = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col justify-center items-center py-10 px-4 bg-base-200 relative overflow-hidden"
    >
      {/* Heading Section with Parallax Effect */}
      <motion.h2
        className="text-2xl font-semibold md:text-6xl text-[#0C1F5E] text-center"
        style={{ y: yHeading }}
      >
        Get in Touch
      </motion.h2>
      <motion.p
        className="text-xl md:text-2xl text-[#0C1F5E] text-center mt-4 mb-8 max-w-2xl"
        style={{ y: yHeading }}
      >
        Ready to explore how EarthSaathi can benefit your business? Contact us
        today for more information, partnerships, or consulting.
      </motion.p>

      {/* Form Section with Animation from Bottom */}
      <motion.form
        className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-6"
        initial={{ opacity: 0, y: 100 }} // Start off-screen (below viewport)
        whileInView={{ opacity: 1, y: 0 }} // Animate to its natural position
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        }}
        viewport={{ once: true }} // Trigger animation only once
      >
        {/* Name Field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        {/* Message Field */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            rows={5}
            className="textarea textarea-bordered w-full focus:outline-none focus:ring focus:ring-primary"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Send Message
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Contact;
