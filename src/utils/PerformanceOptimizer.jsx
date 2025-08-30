import { useEffect, useState } from 'react';

// Performance optimization component for better Core Web Vitals
export const PerformanceOptimizer = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for DOM to be fully ready
    const checkDOMReady = () => {
      if (typeof document !== 'undefined' && document.head && document.body) {
        setIsReady(true);
      } else {
        // Retry after a short delay
        setTimeout(checkDOMReady, 50);
      }
    };

    checkDOMReady();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Preload critical resources
    const preloadCriticalResources = () => {
      try {
        // Preload logo and critical images
        const criticalImages = [
          '/Logo.png',
          '/earthSaathiFavicon.jpg',
          '/earth-animation.json'
        ];

        criticalImages.forEach(src => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
        });

        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.as = 'font';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
      } catch (error) {
        // Silently handle errors in production, log warnings in development
        if (process.env.NODE_ENV === 'development') {
          console.warn('PerformanceOptimizer: Error preloading resources:', error);
        }
      }
    };

    // Lazy load non-critical images
    const setupLazyLoading = () => {
      try {
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                  observer.unobserve(img);
                }
              }
            });
          });

          const lazyImages = document.querySelectorAll('img[data-src]');
          lazyImages.forEach(img => imageObserver.observe(img));
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('PerformanceOptimizer: Error setting up lazy loading:', error);
        }
      }
    };

    // Optimize images for Core Web Vitals
    const optimizeImages = () => {
      try {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          // Add loading="lazy" for images below the fold
          if (!img.loading) {
            img.loading = 'lazy';
          }
          
          // Add decoding="async" for better performance
          if (!img.decoding) {
            img.decoding = 'async';
          }
        });
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('PerformanceOptimizer: Error optimizing images:', error);
        }
      }
    };

    // Add resource hints for better performance
    const addResourceHints = () => {
      try {
        // DNS prefetch for external domains
        const dnsPrefetch = document.createElement('link');
        dnsPrefetch.rel = 'dns-prefetch';
        dnsPrefetch.href = '//fonts.googleapis.com';
        document.head.appendChild(dnsPrefetch);

        // Preconnect to external domains
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = 'https://fonts.gstatic.com';
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('PerformanceOptimizer: Error adding resource hints:', error);
        }
      }
    };

    // Initialize performance optimizations
    const initOptimizations = () => {
      try {
        preloadCriticalResources();
        setupLazyLoading();
        optimizeImages();
        addResourceHints();
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('PerformanceOptimizer: Error initializing optimizations:', error);
        }
      }
    };

    // Initialize with a small delay to ensure everything is ready
    const timer = setTimeout(initOptimizations, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      try {
        // Remove any dynamically added elements if needed
        const preloadLinks = document.querySelectorAll('link[rel="preload"]');
        preloadLinks.forEach(link => {
          if (link.parentNode) {
            link.parentNode.removeChild(link);
          }
        });
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('PerformanceOptimizer: Error during cleanup:', error);
        }
      }
    };
  }, [isReady]);

  // Don't render anything - this is a utility component
  return null;
};

// Hook for performance monitoring
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals - only if web-vitals is available
    const monitorWebVitals = async () => {
      try {
        if (typeof window !== 'undefined') {
          // Try to import web-vitals dynamically
          const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
          
          // Monitor Core Web Vitals
          getCLS((metric) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('CLS:', metric);
            }
          });
          getFID((metric) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('FID:', metric);
            }
          });
          getFCP((metric) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('FCP:', metric);
            }
          });
          getLCP((metric) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('LCP:', metric);
            }
          });
          getTTFB((metric) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('TTFB:', metric);
            }
          });
        }
      } catch (error) {
        // Silently handle if web-vitals is not available
        if (process.env.NODE_ENV === 'development') {
          console.warn('PerformanceOptimizer: web-vitals not available:', error);
        }
      }
    };

    // Monitor page load performance
    const measurePageLoad = () => {
      try {
        if (typeof window !== 'undefined' && 'performance' in window) {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            if (process.env.NODE_ENV === 'development') {
              console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
              console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
            }
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('PerformanceOptimizer: Error measuring page load:', error);
        }
      }
    };

    // Initialize monitoring
    monitorWebVitals();

    // Measure after page load
    if (typeof document !== 'undefined') {
      if (document.readyState === 'complete') {
        measurePageLoad();
      } else {
        window.addEventListener('load', measurePageLoad);
        return () => window.removeEventListener('load', measurePageLoad);
      }
    }
  }, []);
};

// Image optimization utility
export const optimizeImage = (src, width = 800, quality = 80) => {
  // Add image optimization parameters
  // This is a placeholder - implement based on your image optimization service
  return `${src}?w=${width}&q=${quality}&auto=format`;
};

// Critical CSS inliner (placeholder)
export const inlineCriticalCSS = () => {
  // This would inline critical CSS for above-the-fold content
  // Implementation depends on your build process
  if (process.env.NODE_ENV === 'development') {
    console.log('Critical CSS inlining would happen here');
  }
};
