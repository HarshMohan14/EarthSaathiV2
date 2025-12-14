import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { projectsAPI } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";

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
      <section className="py-24 px-4 md:px-8 lg:px-16 w-full relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl -z-10" />
        <LoadingSpinner message="Loading projects..." variant="default" />
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-24 px-4 md:px-8 lg:px-16 w-full relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl -z-10" />
        <div className="relative z-10">
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
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 w-full relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm">
      {/* Clean Earth decorative elements - whitish blue */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl -z-10" />
      <div className="relative z-10">
      
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
              className="card bg-white/90 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-blue-100/50 hover:shadow-2xl transition-all duration-300"
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
      </div>
    </section>
  );
};

export default ProjectSection;
