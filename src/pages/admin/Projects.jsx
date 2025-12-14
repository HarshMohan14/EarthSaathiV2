import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { adminProjectsAPI } from '../../utils/adminApi';
import ProjectsForm from '../../components/admin/ProjectsForm';
import Pagination from '../../components/admin/Pagination';
import { useToast } from '../../components/admin/Toast';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { success, error: showError } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    // Check if we should open the form (from Quick Actions)
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('new') === 'true') {
      setShowForm(true);
      // Clean up URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Fetch all data from database
      const allData = await adminProjectsAPI.getAll().catch(() => []);
      
      // Filter out duplicates - if a static project was migrated, it's now in the database
      // Remove any duplicates based on title matching
      const uniqueProjects = [];
      const seenTitles = new Set();
      
      for (const project of allData) {
        const title = project.title?.toLowerCase().trim();
        if (title && !seenTitles.has(title)) {
          seenTitles.add(title);
          uniqueProjects.push(project);
        }
      }
      
      setProjects(Array.isArray(uniqueProjects) ? uniqueProjects : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      showError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await adminProjectsAPI.delete(id).catch(() => {
        setProjects(projects.filter(p => p._id !== id));
      });
      setProjects(projects.filter(p => p._id !== id));
      success('Project deleted successfully');
    } catch (error) {
      showError('Failed to delete project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSuccess = () => {
    fetchProjects();
    handleFormClose();
    success(editingProject ? 'Project updated successfully' : 'Project created successfully');
  };

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01DC98]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0C1F5E] mb-2 openSans">Projects</h1>
          <p className="text-gray-700 poppins">Manage your projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#01DC98] text-[#0C1F5E] rounded-lg font-semibold hover:bg-[#0C1F5E] hover:text-white transition-all"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full p-12 text-center">
            <p className="text-gray-500 text-lg">No projects found</p>
          </div>
        ) : (
          paginatedProjects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0C1F5E] mb-2 openSans">{project.title}</h3>
                <p className="text-gray-700 text-sm mb-4 poppins">{project.subtitle}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-[#01DC98] hover:text-[#0C1F5E] transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {filteredProjects.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredProjects.length}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      )}

      {showForm && (
        <ProjectsForm
          project={editingProject}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Projects;

