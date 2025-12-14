import React, { useState, useEffect, useRef } from "react";
import { Link as LucideLink, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedHeadline from "./AnimatedHeadline ";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SuccessCarousel() {
  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const timeoutRef = useRef();

  // Fetch success stories
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const { successAPI } = await import('../utils/api');
        const data = await successAPI.getAll();
        // Convert to format expected by carousel
        const formattedData = data.map(item => ({
          title: item.title,
          description: item.description,
          image: item.imageUrl || item.image_url || '/earthSaathiFavicon.jpg',
          date: item.date,
          linkUrl: item.linkUrl || item.link_url,
          _id: item._id || item.id,
        }));
        setPosts(formattedData);
        setCurrent(0);
      } catch (error) {
        console.error('Error fetching success stories:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  // Responsive slides calculation
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      setSlidesToShow(width >= 1280 ? 3 : width >= 768 ? 2 : 1);
    };
    
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // Smooth autoplay with pause on interaction
  useEffect(() => {
    if (posts.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrent(prev => (prev + 1) % posts.length);
      }, 5000);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [current, posts.length]);

  const prevSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrent(prev => (prev - 1 + posts.length) % posts.length);
  };

  const nextSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrent(prev => (prev + 1) % posts.length);
  };
  const getVisibleSlides = () => {
    if (posts.length === 0) return [];
    const visible = [];
    for (let i = 0; i < slidesToShow; i++) {
      visible.push(posts[(current + i) % posts.length]);
    }
    return visible;
  };
  // Calculate card width based on container
  const cardWidth = `calc((100% - ${(slidesToShow - 1) * 3}rem) / ${slidesToShow})`;

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm py-10 flex flex-col items-center w-full relative overflow-hidden">
        <LoadingSpinner message="Loading success stories..." variant="card" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm py-10 flex flex-col items-center w-full relative overflow-hidden">
        <div className="text-center text-gray-600 poppins">
          <p>No success stories available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm poppins-regular py-10 flex flex-col items-center w-full relative overflow-hidden">
      {/* Clean Earth decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl -z-10" />
      <div className="relative z-10 w-full flex flex-col items-center">
        <AnimatedHeadline />
        
        <div className="relative w-full py-10 max-w-7xl mx-auto overflow-hidden">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-blue-100 transition"
          aria-label="Previous"
        >
          <span className=" text-gray-700">&#8592;</span>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-blue-100 transition"
          aria-label="Next"
        >
          <span className=" text-gray-700">&#8594;</span>
        </button>

        {/* Animated Carousel Container */}
        <motion.div
          ref={containerRef}
          className="flex gap-8 px-4"
        >
          {getVisibleSlides().map((post, index) => (
            <motion.div
              key={post._id || index}
              className="shrink-0 relative"
              style={{ width: cardWidth }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex flex-col h-full border border-blue-100/50">
                <div className="relative overflow-hidden rounded-t-xl">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {post.linkUrl && (
                    <motion.a
                      href={post.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-cyan-400/75 to-blue-600/60 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <LucideLink className="text-white w-8 h-8" />
                    </motion.a>
                  )}
                </div>
                
                <div className="p-6 flex  flex-col flex-1">
                  <h3 className=" openSans font-semibold text-[#0C1F5E] mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 poppins text-base mb-4 flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Clock className="mr-2 w-5 h-5 text-green-400" />
                    {post.date}
                  </div>
                  {post.linkUrl && (
                    <a
                      href={post.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-full text-sm 
                       hover:bg-blue-600 transition-colors"
                    >
                      Read More
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? 'bg-blue-500 scale-125' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      </div>
    </div>
  );
}
