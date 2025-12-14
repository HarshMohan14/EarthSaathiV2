import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Scroll-based transformations for heading
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yHeading = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const { contactAPI } = await import("../utils/api");
      const result = await contactAPI.submit(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      ref={ref}
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm pt-24 pb-16 lg:pt-32 lg:pb-24 px-4"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading Section with Parallax Effect */}
        <motion.div
          className="text-center mb-12"
          style={{ y: yHeading }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#0C1F5E] mb-4 openSans">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto poppins">
            Ready to explore how EarthSaathi can benefit your business? Contact us
            today for more information, partnerships, or consulting.
          </p>
        </motion.div>

        {/* Form Section with Animation from Bottom */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 md:p-10 space-y-6 border border-blue-100/50"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.8,
          }}
          viewport={{ once: true }}
        >
          {/* Status Message */}
          {status.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg flex items-center gap-3 ${
                status.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span className="poppins text-sm md:text-base">{status.message}</span>
            </motion.div>
          )}

          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold text-gray-800 mb-2 poppins">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-[#01DC98] outline-none transition-all poppins text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold text-gray-800 mb-2 poppins">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-[#01DC98] outline-none transition-all poppins text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="message" className="text-sm font-semibold text-gray-800 poppins">
                Message *
              </label>
              <span className="text-xs text-gray-500 poppins">
                {formData.message.length} / 400 characters
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              maxLength={400}
              placeholder="Tell us about your inquiry... (max 400 characters)"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-[#01DC98] outline-none transition-all resize-none poppins text-gray-900 placeholder:text-gray-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#01DC98] text-[#0C1F5E] rounded-lg font-semibold hover:bg-[#0C1F5E] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-base md:text-lg poppins flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;
