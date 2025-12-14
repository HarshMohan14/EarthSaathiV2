import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const LoadingSpinner = ({ 
  message = 'Loading...', 
  size = 'medium',
  fullScreen = false,
  variant = 'default' // 'default', 'card', 'inline'
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;

  // Default variant - full glassmorphism card
  if (variant === 'default' || !variant) {
    return (
      <div className={`${fullScreen ? 'fixed inset-0 z-50' : 'w-full'} flex items-center justify-center py-16 lg:py-24`}>
        <div className="relative w-full max-w-md mx-auto px-4">
          {/* Background with glassmorphism */}
          <div className="bg-gradient-to-br from-sky-50/70 via-blue-50/50 to-white backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-8 md:p-12">
            {/* Animated background circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-100/15 rounded-full blur-2xl -z-10 animate-pulse" style={{ animationDelay: '0.5s' }} />
            
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
              {/* Animated Leaf Icon */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative"
              >
                <div className={`${spinnerSize} rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg`}>
                  <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                {/* Pulsing ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 ${spinnerSize} rounded-full bg-blue-400/30`}
                />
              </motion.div>

              {/* Loading text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <p className="text-gray-700 font-medium poppins text-lg">{message}</p>
                <div className="flex items-center justify-center gap-1 mt-3">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-blue-500"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-blue-500"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-blue-500"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Card variant - compact for cards/sections
  if (variant === 'card') {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`${spinnerSize} rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-md`}
          >
            <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
          </motion.div>
          <p className="text-gray-600 poppins text-sm">{message}</p>
        </div>
      </div>
    );
  }

  // Inline variant - minimal for inline loading
  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent"
        />
        <span className="text-gray-600 poppins text-sm">{message}</span>
      </div>
    );
  }

  return null;
};

export default LoadingSpinner;

