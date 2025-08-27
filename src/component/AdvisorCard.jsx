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
  const advisors = [
    {
      name: "Wahid A. Kamalian",
      title: "Co-Founder & Managing Partner, Amaly Legacy",
      description:
        "EarthSaathi’s groundbreaking CNS biogas solution is a true game-changer in sustainable energy, especially at industrial scale. We saw their solution expertly designed and customized for a large-scale cashew processing plant project in Tanzania, where it transforms onsite organic waste into a self-contained energy hub. This not only reduces disposal costs and environmental impact-which is critical for the procurement divisions of large clients seeking to reduce their scope 3 emissions-but also offsets the plant’s energy use, making operations more circular, resilient, and cost-effective.",
      imageUrl: "/Wahid A. Kamalian.jpg", // Replace with your image
    },
    {
      name: "Prof. P.D. Vaidya",
      title: "Professor at ICT Mumbai",
      description:
        "Prof. P.D. Vaidya has been closely involved in EarthSaathi’s journey since its early days. As a senior professor at ICT Mumbai, he mentored both co-founders during their PhDs in carbon capture and solvent development. With deep expertise in gas purification and sustainable chemistry, he played a key role in shaping the scientific thinking behind EarthSaathi’s NS-MAX™ technology. He often highlights the founders’ rare ability to blend research with real-world impact taking complex chemistry and turning it into a solution that can work at scale. His continued guidance ensures that the team stays grounded in science.",
      imageUrl: "/Professor.jpg", // Replace with your image
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <h1 className="text-3xl font-bold text-center text-[#0C1F5E] mb-12">
        Our Advisors
      </h1>
      <div className="flex  flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {advisors.map((advisor, index) => (
          <div key={index} className="w-full lg:w-1/2">
            <AdvisorCard {...advisor} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvisorsSection;
