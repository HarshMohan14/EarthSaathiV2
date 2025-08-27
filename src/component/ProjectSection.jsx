import { motion } from "framer-motion";
import React from "react";

const ProjectSection = () => {
  const projects = [
    {
      title: "Enhancing Methane Purity at Cattle Research Institute",
      subtitle: "Ongoing Project",
      imageUrl: "/Project1.jpg", // Replace with your image
      sections: [
        {
          title: "Client Challenge",
          content: "The Cattle Research Institute in Pune operates a biogas plant that currently achieves methane purity levels of around 80–85% using a traditional water scrubbing system. While effective to a degree, the existing setup has limitations in energy efficiency and output quality, making it less suitable for high-value clean energy applications."
        },
        {
          title: "Our Approach",
          content: "EarthSaathi is collaborating with the institute on a large-scale pilot to integrate our proprietary NS-MAX™ solvent technology into their biogas purification process. The goal is to enhance methane purity up to 99%, while also reducing energy consumption and operational inefficiencies."
        },
        {
          title: "Project Highlights",
          content: [
            "Focused on improving methane quality for better energy utilization",
            "Collaboration with a Japanese biogas plant for additional R&D support",
            "Designed for energy savings and operational efficiency"
          ]
        },
        {
          title: "Status",
          content: "The project is currently in the pilot implementation phase. Early results are promising, and ongoing testing will help validate improvements in gas quality, energy use, and system scalability."
        },
        {
          title: "Why It Matters",
          content: "This pilot represents a significant step in demonstrating how innovative solvent technologies can upgrade existing biogas systems, making them more sustainable and impactful for rural and research-based energy initiatives."
        }
      ]
    },
    {
      title: "Cashew Waste to Energy - Pilot in Africa",
      subtitle: "Ongoing Project",
      imageUrl: "/Project2.jpg", // Replace with your image
      sections: [
        {
          title: "Client Challenge",
          content: "A new cashew processing plant in Africa was looking for a sustainable way to meet its electricity demands while managing the significant organic waste generated from processing. Traditional power sources were either unreliable or costly, and waste disposal posed an environmental burden."
        },
        {
          title: "Our Approach",
          content: "EarthSaathi designed a proof-of-concept (POC) biogas solution that turns cashew waste into clean energy. The goal is to meet at least 19% of the plant's daily electricity needs by converting organic waste into biomethane using advanced digestion and purification technology."
        },
        {
          title: "Project Components",
          content: [
            "Biogas system setup: digesters, agitators, membranes, and H₂S control",
            "External biomethane storage tanks (3000m³ x 2)",
            "CHP-enabled electrical generators",
            "Biogas purification using NS-MAX™ solvent",
            "Integration of fertilizer processing for digestate reuse",
            "Full installation and implementation support"
          ]
        },
        {
          title: "Status",
          content: "The pilot is in the system design and component selection stage. Once operational, it will serve as a blueprint for other agro-processing plants across Africa to adopt circular energy solutions."
        },
        {
          title: "Why It Matters",
          content: "This project showcases how agricultural waste can be converted into power-reducing energy dependence, cutting emissions, and improving overall sustainability in rural industries. It's a strong example of EarthSaathi's mission to build low-carbon solutions tailored to real-world challenges."
        }
      ]
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-[#0C1F5E] mb-12"
      >
        Our Projects
      </motion.h1>
      
      <div className="max-w-6xl mx-auto space-y-16">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="card bg-white shadow-xl rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Project Image */}
              <div className="w-full lg:w-2/5 p-6 flex justify-center ">
                <div className="relative w-full h-auto max-w-xs rounded-xl overflow-hidden ">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              
              {/* Project Details */}
              <div className="w-full lg:w-3/5 p-6">
                <h2 className="text-2xl font-bold text-[#0C1F5E] mb-2">
                  {project.title}
                </h2>
                
                <div className="space-y-6 mt-6">
                  {project.sections.map((section, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-bold text-[#01DC98] mb-2">
                        {section.title}
                      </h3>
                      {Array.isArray(section.content) ? (
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {section.content.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700">{section.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
