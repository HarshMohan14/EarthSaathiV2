import { motion } from "framer-motion";
import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const AdvisorCard = ({ name, title, description, imageUrl }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="w-full bg-white/90 backdrop-blur-md shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-blue-100/50"
  >
    <div className="flex flex-col lg:flex-row h-full">
      <div className="w-full lg:w-1/3 flex justify-center items-center p-6 lg:p-8 bg-gradient-to-br from-blue-50/30 to-white">
        <img
          src={imageUrl}
          alt={name}
          className="rounded-lg w-48 h-48 lg:w-56 lg:h-56 object-cover border-4 border-[#01DC98]/20 shadow-md"
        />
      </div>
      <div className="w-full lg:w-2/3 p-6 lg:p-8 flex flex-col justify-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0C1F5E] mb-2 openSans">{name}</h2>
        <h3 className="text-xl lg:text-2xl font-semibold text-[#01DC98] mb-4 poppins">{title}</h3>
        <p className="text-gray-700 text-base lg:text-lg leading-relaxed poppins">{description}</p>
      </div>
    </div>
  </motion.div>
);

const AdvisorsSection = () => {
  const [advisors, setAdvisors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const { advisorsAPI } = await import('../utils/api');
        const data = await advisorsAPI.getAll();
        setAdvisors(data);
      } catch (error) {
        console.error('Error fetching advisors:', error);
        setAdvisors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvisors();
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-20 px-4 md:px-8 lg:px-16 xl:px-24 w-full relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#0C1F5E] mb-12 lg:mb-16 openSans">
            Our Advisors
          </h1>
          <LoadingSpinner message="Loading advisors..." variant="card" />
        </div>
      </section>
    );
  }

  if (advisors.length === 0) {
    return (
      <section className="py-16 lg:py-20 px-4 md:px-8 lg:px-16 xl:px-24 w-full relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#0C1F5E] mb-12 lg:mb-16 openSans">
            Our Advisors
          </h1>
          <div className="text-center text-gray-600 poppins">
            <p>No advisors available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 px-4 md:px-8 lg:px-16 xl:px-24 w-full relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm">
      {/* Clean Earth decorative elements - whitish blue */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#0C1F5E] mb-12 lg:mb-16 openSans"
        >
          Our Advisors
        </motion.h1>
        <div className="w-full flex flex-col gap-8 lg:gap-10">
          {advisors.map((advisor, index) => (
            <motion.div 
              key={advisor._id || index} 
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AdvisorCard {...advisor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvisorsSection;
