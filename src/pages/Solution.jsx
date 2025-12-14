import React, { useState, useEffect } from "react";
import SolutionHero from "../component/SolutionHero";
import ImageRevealSection from "../component/ImageRevealSection ";
import { SEO } from '../utils/SEO';
import ErrorBoundary from '../utils/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';

const Solution = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const { solutionsAPI } = await import('../utils/api');
        const data = await solutionsAPI.getAll();
        setSolutions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching solutions:', error);
        setSolutions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  return (
    <>
      <ErrorBoundary>
        <SEO 
          title="EarthSaathi Solutions - Sustainable Energy & Environmental Technologies"
          description="Explore EarthSaathi's innovative sustainable energy solutions and environmental technologies. From renewable energy to carbon reduction, discover how we're building a greener future."
          keywords="EarthSaathi solutions, sustainable energy technologies, environmental technologies, renewable energy solutions, carbon reduction, green technology solutions, NS-Max solvent, CO2 capture, biogas upgrading"
          url="https://earthsaathi.com/solutions"
          image="/Logo.png"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EarthSaathi Solutions",
            "description": "Sustainable energy and environmental technology solutions",
            "url": "https://earthsaathi.com/solutions"
          }}
        />
      </ErrorBoundary>
      <div>
        <SolutionHero />
        {loading ? (
          <div className="bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm">
            <LoadingSpinner message="Loading solutions..." variant="default" />
          </div>
        ) : solutions.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm">
            <p className="text-gray-600 poppins">No solutions available at the moment.</p>
          </div>
        ) : (
          <div id="solutions">
            {solutions.map((solution) => (
              <ImageRevealSection
                key={solution._id || solution.id}
                title={solution.title}
                description={solution.description}
                mainImage={solution.imageUrl || solution.image_url || '/earthSaathiFavicon.jpg'}
                points={Array.isArray(solution.points) ? solution.points : (typeof solution.points === 'string' ? JSON.parse(solution.points) : [])}
                imagePosition={solution.imagePosition || solution.image_position || 'left'}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Solution;
