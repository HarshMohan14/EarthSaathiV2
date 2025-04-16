import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WORDS = ["Milestones", "Achievements", "Impact", "Success Stories", "Highlights"];
const PREFIX = "EarthSaathi ";

const AnimatedHeadline = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing, waiting, deleting

  useEffect(() => {
    let timeout;
    const currentWord = WORDS[wordIndex];

    if (phase === "typing") {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => setCharIndex(charIndex + 1), 80);
      } else {
        timeout = setTimeout(() => setPhase("waiting"), 1000);
      }
    } else if (phase === "waiting") {
      timeout = setTimeout(() => setPhase("deleting"), 1500);
    } else if (phase === "deleting") {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex(charIndex - 1), 40);
      } else {
        timeout = setTimeout(() => {
          setWordIndex((wordIndex + 1) % WORDS.length);
          setPhase("typing");
        }, 300);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, phase, wordIndex]);

  // Reset charIndex when wordIndex or phase changes to typing
  useEffect(() => {
    if (phase === "typing") setCharIndex(0);
  }, [wordIndex, phase]);

  const currentWord = WORDS[wordIndex];
  const displayText = PREFIX + currentWord.slice(0, charIndex);

  return (
    <motion.h1
      className=" text-[#0C1F5E]  mb-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {displayText}
      <motion.span
        className="inline-block w-2 h-6 bg-blue-500 align-bottom ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </motion.h1>
  );
};

export default AnimatedHeadline;
