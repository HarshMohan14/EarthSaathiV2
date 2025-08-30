import { useEffect, useState } from 'react';

// SEO component for dynamic meta tag management
export const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  structuredData 
}) => {
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

    try {
      // Update document title
      if (title) {
        document.title = title;
      }

      // Update meta tags
      const updateMetaTag = (name, content) => {
        try {
          let meta = document.querySelector(`meta[name="${name}"]`);
          if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
          }
          meta.content = content;
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`SEO: Error updating meta tag ${name}:`, error);
          }
        }
      };

      const updatePropertyTag = (property, content) => {
        try {
          let meta = document.querySelector(`meta[property="${property}"]`);
          if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
          }
          meta.content = content;
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`SEO: Error updating property tag ${property}:`, error);
          }
        }
      };

      // Update primary meta tags
      if (description) {
        updateMetaTag('description', description);
        updatePropertyTag('og:description', description);
        updatePropertyTag('twitter:description', description);
      }

      if (keywords) {
        updateMetaTag('keywords', keywords);
      }

      // Update Open Graph tags
      if (title) {
        updatePropertyTag('og:title', title);
        updatePropertyTag('twitter:title', title);
      }

      if (url) {
        updatePropertyTag('og:url', url);
        updatePropertyTag('twitter:url', url);
      }

      if (image) {
        updatePropertyTag('og:image', image);
        updatePropertyTag('twitter:image', image);
      }

      updatePropertyTag('og:type', type);

      // Update canonical URL
      try {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement('link');
          canonical.rel = 'canonical';
          document.head.appendChild(canonical);
        }
        canonical.href = url || window.location.href;
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('SEO: Error updating canonical URL:', error);
        }
      }

      // Add structured data if provided
      if (structuredData) {
        try {
          // Remove existing structured data
          const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
          existingScripts.forEach(script => {
            if (script.textContent && script.textContent.includes('"@type":"WebPage"')) {
              script.remove();
            }
          });

          // Add new structured data
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.textContent = JSON.stringify(structuredData);
          document.head.appendChild(script);
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('SEO: Error updating structured data:', error);
          }
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('SEO: General error:', error);
      }
    }

    // Cleanup function
    return () => {
      try {
        // Reset to default title if component unmounts
        if (title) {
          document.title = 'EarthSaathi - Sustainable Energy Solutions & Environmental Innovation';
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('SEO: Error during cleanup:', error);
        }
      }
    };
  }, [title, description, keywords, image, url, type, structuredData, isReady]);

  return null;
};

// SEO configurations for different pages
export const SEO_CONFIGS = {
  home: {
    title: 'EarthSaathi - Sustainable Energy Solutions & Environmental Innovation',
    description: 'EarthSaathi leads the way in sustainable energy solutions, environmental innovation, and climate change mitigation. Discover our cutting-edge technologies for a greener future.',
    keywords: 'EarthSaathi, sustainable energy, environmental innovation, climate change, renewable energy, green technology, carbon reduction, sustainability solutions, clean energy, environmental protection',
    url: 'https://earthsaathi.com/',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "EarthSaathi Homepage",
      "description": "Leading sustainable energy solutions and environmental innovation platform",
      "url": "https://earthsaathi.com/",
      "mainEntity": {
        "@type": "Organization",
        "name": "EarthSaathi",
        "description": "Sustainable energy solutions and environmental innovation"
      }
    }
  },
  about: {
    title: 'About EarthSaathi - Our Mission for Sustainable Future',
    description: 'Learn about EarthSaathi\'s mission to revolutionize sustainable energy solutions and environmental innovation. Discover our story, values, and commitment to a greener planet.',
    keywords: 'About EarthSaathi, EarthSaathi mission, sustainable energy company, environmental innovation, climate change solutions, green technology company',
    url: 'https://earthsaathi.com/about',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "About EarthSaathi",
      "description": "Learn about EarthSaathi's mission for sustainable energy solutions",
      "url": "https://earthsaathi.com/about"
    }
  },
  solutions: {
    title: 'EarthSaathi Solutions - Sustainable Energy & Environmental Technologies',
    description: 'Explore EarthSaathi\'s innovative sustainable energy solutions and environmental technologies. From renewable energy to carbon reduction, discover how we\'re building a greener future.',
    keywords: 'EarthSaathi solutions, sustainable energy technologies, environmental technologies, renewable energy solutions, carbon reduction, green technology solutions',
    url: 'https://earthsaathi.com/solutions',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "EarthSaathi Solutions",
      "description": "Sustainable energy and environmental technology solutions",
      "url": "https://earthsaathi.com/solutions"
    }
  },
  projects: {
    title: 'EarthSaathi Projects - Sustainable Energy & Environmental Initiatives',
    description: 'Discover EarthSaathi\'s groundbreaking projects in sustainable energy and environmental protection. See our real-world impact in creating a sustainable future.',
    keywords: 'EarthSaathi projects, sustainable energy projects, environmental projects, green technology projects, sustainability initiatives',
    url: 'https://earthsaathi.com/projects',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "EarthSaathi Projects",
      "description": "Sustainable energy and environmental protection projects",
      "url": "https://earthsaathi.com/projects"
    }
  },
  resources: {
    title: 'EarthSaathi Resources - Sustainable Energy Knowledge Hub',
    description: 'Access EarthSaathi\'s comprehensive resources on sustainable energy, environmental innovation, and climate change solutions. Expert insights and educational content.',
    keywords: 'EarthSaathi resources, sustainable energy resources, environmental innovation resources, climate change education, sustainability knowledge',
    url: 'https://earthsaathi.com/resources',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "EarthSaathi Resources",
      "description": "Sustainable energy and environmental innovation resources",
      "url": "https://earthsaathi.com/resources"
    }
  },
  career: {
    title: 'EarthSaathi Careers - Join Our Sustainable Energy Mission',
    description: 'Build your career with EarthSaathi and contribute to sustainable energy solutions and environmental innovation. Join our team of passionate professionals.',
    keywords: 'EarthSaathi careers, sustainable energy jobs, environmental technology careers, green jobs, sustainability careers',
    url: 'https://earthsaathi.com/careers',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "EarthSaathi Careers",
      "description": "Career opportunities in sustainable energy and environmental innovation",
      "url": "https://earthsaathi.com/careers"
    }
  },
  community: {
    title: 'EarthSaathi Community - Sustainable Energy & Environmental Network',
    description: 'Join the EarthSaathi community of sustainability advocates, environmental innovators, and green technology enthusiasts. Connect, collaborate, and create change.',
    keywords: 'EarthSaathi community, sustainable energy community, environmental innovation network, sustainability advocates, green technology community',
    url: 'https://earthsaathi.com/community',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "EarthSaathi Community",
      "description": "Community of sustainability advocates and environmental innovators",
      "url": "https://earthsaathi.com/community"
    }
  }
};

// Hook for easy SEO implementation
export const useSEO = (pageKey) => {
  const config = SEO_CONFIGS[pageKey] || SEO_CONFIGS.home;
  return config;
};
