import React, { useEffect, useState } from "react";

const CacheImage = React.memo(({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      return () => { img.onload = null; };
    }, [src]);
  
    return (
      <img
        src={loaded ? src : ''}
        alt={alt}
        className={`${className} ${loaded ? 'loaded' : 'loading'}`}
        loading="lazy"
      />
    );
  });
  
  export default CacheImage;
  