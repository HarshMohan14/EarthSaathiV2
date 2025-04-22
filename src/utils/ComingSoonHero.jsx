import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ComingSoonHero = () => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 24,
    minutes: 60,
    seconds: 60
  });
  
  // Email input state
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Mouse position for spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const spotlightControls = useAnimation();
  
  // Track mouse position for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Update spotlight position based on mouse
  useEffect(() => {
    spotlightControls.start({
      x: mousePosition.x - 250,
      y: mousePosition.y - 250,
      transition: { type: 'spring', mass: 0.1, damping: 8 }
    });
  }, [mousePosition, spotlightControls]);
  
  // Countdown timer logic
  useEffect(() => {
    const launchDate = new Date('May 30, 2025').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Add your subscription logic here
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="hero min-h-screen pt-24 bg-[#0C1F5E] relative overflow-hidden">
      {/* Background animations */}
      <BackgroundAnimation />
      
      {/* Interactive spotlight */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(1, 220, 152, 0.3) 0%, transparent 70%)'
        }}
        animate={spotlightControls}
      />
      
      <div className="hero-content text-center text-white z-10">
        <div className="max-w-md md:max-w-lg lg:max-w-xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#01DC98]">Coming</span> Soon
          </motion.h1>
          
          <motion.p 
            className="py-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We're working hard to bring you something amazing. Stay tuned for our launch!
          </motion.p>
          
          {/* Countdown Timer */}
          <motion.div 
            className="grid grid-cols-4 gap-2 my-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CountdownItem value={timeLeft.days} label="Days" />
            <CountdownItem value={timeLeft.hours} label="Hours" />
            <CountdownItem value={timeLeft.minutes} label="Minutes" />
            <CountdownItem value={timeLeft.seconds} label="Seconds" />
          </motion.div>
          
          {/* Subscription Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 bg-[#01DC98]/20 rounded-lg text-[#01DC98] font-semibold"
              >
                Thank you! We'll notify you when we launch.
              </motion.div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col md:flex-row justify-center items-center gap-2"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full md:w-auto border-white bg-transparent text-white placeholder-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <motion.button 
                  className="btn bg-[#01DC98] hover:bg-[#01DC98]/80 text-black border-none w-full md:w-auto mt-2 md:mt-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Notify Me
                </motion.button>
              </form>
            )}
          </motion.div>
          
          {/* Social media links */}
          <motion.div
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((platform) => (
              <SocialIcon key={platform} platform={platform} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Countdown item component
const CountdownItem = ({ value, label }) => (
  <motion.div 
    className="flex flex-col items-center"
    whileHover={{ scale: 1.05 }}
  >
    <div className="bg-[#01DC98] text-black font-bold text-2xl md:text-3xl rounded-lg p-3 w-full">
      {value < 10 ? `0${value}` : value}
    </div>
    <span className="text-sm mt-1">{label}</span>
  </motion.div>
);

// Social Icon component
const SocialIcon = ({ platform }) => (
  <motion.a
    href="#"
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#01DC98] hover:text-black text-white transition-colors"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    {platform.charAt(0)}
  </motion.a>
);

// Background animation component
const BackgroundAnimation = () => {
  return (
    <>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                               linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }} 
      />
      
      {/* Animated circles */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-[#01DC98]/10 top-1/4 -left-32"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[#01DC98]/10 bottom-1/3 -right-48"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      
      {/* Animated beams */}
      <motion.div
        className="absolute h-px w-40 top-1/4 left-1/3"
        style={{ background: 'linear-gradient(to right, transparent, #01DC98, transparent)' }}
        animate={{
          scaleX: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
          x: [-50, 50, -50],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Sparkling stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </>
  );
};

export default ComingSoonHero;
