import { motion } from "framer-motion";
import React from "react";

const AdvisorCard = ({ name, title, description, imageUrl }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="card w-full bg-white shadow-lg rounded-xl overflow-hidden"
  >
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 flex justify-center p-4">
        <img
          src={imageUrl}
          alt={name}
          className="rounded-lg w-48 h-48 object-cover "
        />
      </div>
      <div className="w-full lg:w-2/3 p-6">
        <h2 className="text-2xl font-bold text-[#0C1F5E]">{name}</h2>
        <h3 className="text-xl font-semibold text-[#01DC98] mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
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
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <h1 className="text-3xl font-bold text-center text-[#0C1F5E] mb-12">
          Our Advisors
        </h1>
        <div className="text-center text-gray-600">
          <p>Loading advisors...</p>
        </div>
      </section>
    );
  }

  if (advisors.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <h1 className="text-3xl font-bold text-center text-[#0C1F5E] mb-12">
          Our Advisors
        </h1>
        <div className="text-center text-gray-600">
          <p>No advisors available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <h1 className="text-3xl font-bold text-center text-[#0C1F5E] mb-12">
        Our Advisors
      </h1>
      <div className="flex justify-center max-w-6xl mx-auto">
        {advisors.map((advisor, index) => (
          <div key={advisor._id || index} className="w-full max-w-2xl">
            <AdvisorCard {...advisor} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvisorsSection;
