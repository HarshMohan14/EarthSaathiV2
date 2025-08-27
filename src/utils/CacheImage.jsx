import React, { useEffect, useState } from "react";

const CacheImage = React.memo(
  ({
    src,
    alt,
    className,
    width = "w-48 h-48 sm:w-52 sm:h-52 md:w-64",
    height = "md:h-64 lg:w-80 lg:h-80",
  }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      return () => {
        img.onload = null;
      };
    }, [src]);

    return (
      <div className={`${width} ${height} relative`}>
        {!loaded && (
          <div
            className={`
            absolute top-0 left-0 w-full h-full
            bg-gray-200
            overflow-hidden
            rounded-full
            animate-pulse
            before:content-['']
            before:absolute before:inset-0
            before:bg-gradient-to-r before:from-gray-200 before:via-gray-100 before:to-gray-200
            before:animate-[shimmer_1.5s_infinite]
          `}
            style={{
              // Custom shimmer animation using Tailwind's arbitrary values
              "--tw-gradient-from": "#e5e7eb",
              "--tw-gradient-via": "#f3f4f6",
              "--tw-gradient-to": "#e5e7eb",
              animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        )}
        <img
          src={loaded ? src : ""}
          alt={alt}
          className={`
          ${className}
          ${width} ${height}
          object-cover rounded-full
          transition-opacity duration-500
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
    );
  }
);

export default CacheImage;
