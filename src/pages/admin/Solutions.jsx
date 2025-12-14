import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { adminSolutionsAPI } from '../../utils/adminApi';
import SolutionsForm from '../../components/admin/SolutionsForm';
import Pagination from '../../components/admin/Pagination';
import { useToast } from '../../components/admin/Toast';

const Solutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSolution, setEditingSolution] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { success, error: showError } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSolutions();
    // Check if we should open the form (from Quick Actions)
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('new') === 'true') {
      setShowForm(true);
      // Clean up URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const fetchSolutions = async () => {
    try {
      setLoading(true);
      // Fetch all data from database
      const allData = await adminSolutionsAPI.getAll().catch(() => []);
      
      // Filter out duplicates - if a static solution was migrated, it's now in the database
      // Remove any duplicates based on title matching
      const uniqueSolutions = [];
      const seenTitles = new Set();
      
      for (const solution of allData) {
        const title = solution.title?.toLowerCase().trim();
        if (title && !seenTitles.has(title)) {
          seenTitles.add(title);
          uniqueSolutions.push(solution);
        }
      }
      
      setSolutions(Array.isArray(uniqueSolutions) ? uniqueSolutions : []);
    } catch (error) {
      console.error('Error fetching solutions:', error);
      showError('Failed to load solutions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this solution?')) return;

    try {
      await adminSolutionsAPI.delete(id);
      setSolutions(solutions.filter(s => (s._id || s.id) !== id));
      success('Solution deleted successfully');
    } catch (error) {
      showError(error.message || 'Failed to delete solution');
    }
  };

  const handleEdit = (solution) => {
    setEditingSolution(solution);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSolution(null);
  };

  const handleFormSuccess = () => {
    fetchSolutions();
    handleFormClose();
    success(editingSolution ? 'Solution updated successfully' : 'Solution created successfully');
  };

  const filteredSolutions = solutions.filter(solution =>
    solution.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solution.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredSolutions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSolutions = filteredSolutions.slice(startIndex, endIndex);

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0C1F5E] mb-2 openSans">Solutions</h1>
          <p className="text-gray-700 poppins">Manage your solutions and products</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#01DC98] text-[#0C1F5E] rounded-lg font-semibold hover:bg-[#0C1F5E] hover:text-white transition-all"
        >
          <Plus size={20} />
          Add Solution
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search solutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSolutions.length === 0 ? (
          <div className="col-span-full p-12 text-center">
            <p className="text-gray-600 text-lg poppins">No solutions found</p>
          </div>
        ) : (
          paginatedSolutions.map((solution) => (
            <motion.div
              key={solution._id || solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              {solution.imageUrl || solution.image_url ? (
                <img
                  src={solution.imageUrl || solution.image_url}
                  alt={solution.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#0C1F5E] openSans">
                    {solution.title}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium poppins ${
                    (solution.imagePosition || solution.image_position) === 'right' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {(solution.imagePosition || solution.image_position) === 'right' ? 'Right' : 'Left'}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-4 poppins line-clamp-3">
                  {solution.description}
                </p>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2 poppins">Points: {Array.isArray(solution.points) ? solution.points.length : (typeof solution.points === 'string' ? JSON.parse(solution.points || '[]').length : 0)}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(solution)}
                    className="text-[#01DC98] hover:text-[#0C1F5E] transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(solution._id || solution.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {filteredSolutions.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredSolutions.length}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Form Modal */}
      {showForm && (
        <SolutionsForm
          solution={editingSolution}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Solutions;

