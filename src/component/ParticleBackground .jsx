import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import GasInfo from "./GasInfo";
import { Tooltip } from "react-tooltip";

const Hero = () => {
  // Initialize particles engine
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    detectRetina: true,
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      color: { value: ["#FF0000", "#00FF00", "#0000FF"] },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: { min: 5, max: 10 } },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        outModes: "bounce",
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "bubble" },
        },
        modes: {
          bubble: {
            distance: 100,
            size: 15,
            duration: 2,
            opacity: 1,
          },
        },
      },
    },
  };

  return (
    <div className="hero min-h-screen relative">
      {/* Particle Background */}
      <div className="absolute inset-0 h-screen w-full">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
      </div>

      {/* Gas Information Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div style={{ position: 'absolute', top: '20%', left: '30%' }}>
          <GasInfo gas="CO₂" color="#FF0000" />
        </div>
        <div style={{ position: 'absolute', top: '40%', left: '60%' }}>
          <GasInfo gas="CH₄" color="#00FF00" />
        </div>
        <div style={{ position: 'absolute', top: '70%', left: '45%' }}>
          <GasInfo gas="NO₂" color="#0000FF" />
        </div>
      </div>

      {/* Tooltip Container */}
      <Tooltip 
        id="gas-tooltip" 
        className="!bg-green-100 !text-green-800 !rounded-lg !shadow-lg !text-sm"
        place="top"
      />

      {/* Hero Content */}
      <div className="hero-content text-neutral-content text-center relative z-20">
        <div className="max-w-4xl">
          <h1 className="mb-5 text-5xl font-bold">
            Transforming Waste into Sustainable Energy Solutions
          </h1>
          <p className="mb-5">
            Join EarthSaathi in Revolutionizing the Energy Landscape through Innovative Bio-CNG Solutions
          </p>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
