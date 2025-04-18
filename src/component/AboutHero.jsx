import React, { useRef, useEffect, useState } from "react";

const polluted = "/pollutedEarth.jpg";
const clean = "/cleanEarth.jpg";
const CANVAS_RADIUS = 120;

const AboutHero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const timeoutId = useRef(null);

  // Set canvas dimensions based on container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Draw polluted image maintaining aspect ratio
  const drawPolluted = () => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions.width) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = polluted;

    img.onload = () => {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      // Calculate aspect ratio
      const imgRatio = img.width / img.height;
      const containerRatio = dimensions.width / dimensions.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > containerRatio) {
        drawHeight = dimensions.height;
        drawWidth = drawHeight * imgRatio;
        offsetX = (dimensions.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = dimensions.width;
        drawHeight = drawWidth / imgRatio;
        offsetX = 0;
        offsetY = (dimensions.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };
  };

  // Redraw polluted image on mount and when dimensions change
  useEffect(() => {
    drawPolluted();
    // eslint-disable-next-line
  }, [dimensions]);

  // Handle erasing and reset after 3 seconds
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, CANVAS_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    // Reset the timer
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      drawPolluted();
    }, 3000);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-black" ref={containerRef}>
      {/* Clean Earth as background */}
      <img
        src={clean}
        alt="Clean Earth"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
        draggable={false}
      />

      {/* Canvas with polluted earth */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 2 }}
        onMouseMove={handleMouseMove}
      />

      {/* Overlay content */}
      <div className="relative z-30 min-h-screen flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-2xl px-4">
          <h1 className="mb-5   bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
          Welcome to EarthSaathi
          </h1>
          <h2 className="mb-5  text-white">
          Move your mouse, clean the planet. Your journey as an EarthSaathi starts here.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
