import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { projectsAPI } from "../utils/api";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to empty array on error
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
        <div className="text-center">
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-[#0C1F5E] mb-12"
        >
          Our Projects
        </motion.h1>
        <div className="text-center text-gray-600">
          <p>No projects available at the moment.</p>
        </div>
      </section>
    );
  }

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
            key={project._id || index}
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
