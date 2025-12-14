import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";

const AnimatedTestimonials = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { teamAPI } = await import('../utils/api');
      const data = await teamAPI.getAll();
      setTeam(Array.isArray(data) ? data : []);
      setActiveIndex(0);
    } catch (error) {
      console.error('Error fetching team:', error);
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonial = (direction) => {
    if (team.length === 0) return;
    const newIndex =
      (activeIndex + direction + team.length) % team.length;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (team.length > 0) {
      const autoplayInterval = setInterval(() => updateTestimonial(1), 5000);
      return () => clearInterval(autoplayInterval);
    }
  }, [activeIndex, team.length]);


  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm py-16 lg:py-20">
      {/* Clean Earth decorative elements - whitish blue */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl -z-10" />
      <div className="flex justify-center flex-col items-center gap-12 py-10 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0C1F5E] openSans">Meet Our Team</h1>
        
        {loading ? (
          <LoadingSpinner message="Loading team members..." variant="card" />
        ) : team.length === 0 ? (
          <div className="text-center text-gray-600 poppins">
            <p>No team members available at the moment.</p>
          </div>
        ) : (
          <div className="max-w-7xl p-8 w-full">
            <div className="grid gap-8 md:grid-cols-4">
              {/* Image Container */}
              <div className="relative col-span-1 w-40 h-40 mx-auto">
                {team.map((member, index) => {
                  const offset = index - activeIndex;
                  const absOffset = Math.abs(offset);
                  const zIndex = team.length - absOffset;
                  const opacity = index === activeIndex ? 1 : 0.7;
                  const scale = 1 - absOffset * 0.15;
                  const imageUrl = member.imageUrl || member.image_url || '/earthSaathiFavicon.jpg';

                  return (
                    <img
                      key={member._id || member.id || index}
                      src={imageUrl}
                      alt={member.name}
                      className="absolute w-full h-full object-cover rounded-full shadow-lg transition-transform duration-700 border-4 border-blue-100/50"
                      style={{
                        zIndex,
                        opacity,
                        transform: `scale(${scale})`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Content */}
              <div className="flex col-span-3 flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#01DC98] mb-2 openSans">
                    {team[activeIndex]?.name}
                  </h3>
                  <p className="text-xl font-semibold text-[#0C1F5E] mb-4 poppins">
                    {team[activeIndex]?.designation}
                  </p>
                  <p className="text-gray-700 leading-relaxed poppins text-base">
                    {team[activeIndex]?.quote || team[activeIndex]?.description}
                  </p>
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-4 pt-12 md:pt-5">
                  <button
                    onClick={() => updateTestimonial(-1)}
                    className="w-10 h-10 rounded-full bg-[#0C1F5E] flex items-center justify-center hover:bg-[#01DC98] transition-colors shadow-lg"
                    aria-label="Previous team member"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-white"
                    >
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => updateTestimonial(1)}
                    className="w-10 h-10 rounded-full bg-[#0C1F5E] flex items-center justify-center hover:bg-[#01DC98] transition-colors shadow-lg"
                    aria-label="Next team member"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-white"
                    >
                      <path d="M10 6L8.59 7.41l4.58 4.59L10 18l6-6z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnimatedTestimonials;
