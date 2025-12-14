import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, ArrowRight } from 'lucide-react';
import { SEO } from '../utils/SEO';
import ErrorBoundary from '../utils/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const { newslettersAPI } = await import('../utils/api');
        const data = await newslettersAPI.getPublished();
        setNewsletters(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching newsletters:', error);
        setNewsletters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <ErrorBoundary>
        <SEO 
          title="EarthSaathi Newsletters - Latest Updates & Insights"
          description="Stay updated with EarthSaathi's latest newsletters featuring sustainable energy solutions, environmental innovations, and project updates."
          keywords="EarthSaathi newsletters, sustainable energy updates, environmental news, green technology insights, renewable energy news"
          url="https://earthsaathi.com/newsletters"
          image="/Logo.png"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EarthSaathi Newsletters",
            "description": "Latest newsletters and updates from EarthSaathi",
            "url": "https://earthsaathi.com/newsletters"
          }}
        />
      </ErrorBoundary>

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-[#01DC98] to-[#021358] rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0C1F5E] mb-4 openSans">
              Our Newsletters
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto poppins">
              Stay informed with our latest updates, insights, and stories about sustainable energy solutions and environmental innovations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletters List */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm min-h-screen">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSpinner message="Loading newsletters..." variant="card" />
          ) : newsletters.length === 0 ? (
            <div className="text-center py-20">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg poppins">No newsletters available at the moment.</p>
              <p className="text-gray-500 text-sm mt-2 poppins">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsletters.map((newsletter, index) => (
                <motion.div
                  key={newsletter._id || newsletter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100/50 cursor-pointer group"
                  onClick={() => setSelectedNewsletter(newsletter)}
                >
                  {/* Image */}
                  {(newsletter.imageUrl || newsletter.image_url) && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={newsletter.imageUrl || newsletter.image_url}
                        alt={newsletter.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 poppins">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(newsletter.published_at || newsletter.created_at)}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0C1F5E] mb-3 openSans group-hover:text-[#01DC98] transition-colors">
                      {newsletter.title}
                    </h3>
                    
                    {newsletter.description && (
                      <p className="text-gray-700 text-sm mb-4 poppins line-clamp-3">
                        {newsletter.description}
                      </p>
                    )}
                    
                    {newsletter.content && (
                      <p className="text-gray-600 text-sm mb-4 poppins line-clamp-2">
                        {newsletter.content.substring(0, 150)}...
                      </p>
                    )}

                    <div className="flex items-center text-[#01DC98] font-medium text-sm poppins group-hover:gap-2 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Detail Modal */}
      {selectedNewsletter && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedNewsletter(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-100/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-start z-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 poppins">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedNewsletter.published_at || selectedNewsletter.created_at)}</span>
                </div>
                <h2 className="text-3xl font-bold text-[#0C1F5E] openSans">
                  {selectedNewsletter.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedNewsletter(null)}
                className="text-gray-600 hover:text-gray-900 transition-colors ml-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {(selectedNewsletter.imageUrl || selectedNewsletter.image_url) && (
                <img
                  src={selectedNewsletter.imageUrl || selectedNewsletter.image_url}
                  alt={selectedNewsletter.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl"
                />
              )}

              {selectedNewsletter.description && (
                <p className="text-lg text-gray-700 poppins font-medium">
                  {selectedNewsletter.description}
                </p>
              )}

              {selectedNewsletter.content && (
                <div className="prose max-w-none">
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed poppins">
                    {selectedNewsletter.content}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Newsletter;

