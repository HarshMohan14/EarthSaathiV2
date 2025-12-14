import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { adminAdvisorsAPI } from '../../utils/adminApi';
import AdvisorsForm from '../../components/admin/AdvisorsForm';
import Pagination from '../../components/admin/Pagination';
import { useToast } from '../../components/admin/Toast';

const Advisors = () => {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAdvisor, setEditingAdvisor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { success, error: showError } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdvisors();
    // Check if we should open the form (from Quick Actions)
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('new') === 'true') {
      setShowForm(true);
      // Clean up URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const fetchAdvisors = async () => {
    try {
      setLoading(true);
      // Fetch all advisors from database (static data should be migrated to database)
      const data = await adminAdvisorsAPI.getAll().catch(() => []);
      setAdvisors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching advisors:', error);
      showError('Failed to load advisors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this advisor?')) return;

    try {
      await adminAdvisorsAPI.delete(id);
      setAdvisors(advisors.filter(a => (a._id || a.id) !== id));
      success('Advisor deleted successfully');
    } catch (error) {
      showError(error.message || 'Failed to delete advisor');
    }
  };

  const handleEdit = (advisor) => {
    setEditingAdvisor(advisor);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingAdvisor(null);
  };

  const handleFormSuccess = () => {
    fetchAdvisors();
    handleFormClose();
    success(editingAdvisor ? 'Advisor updated successfully' : 'Advisor created successfully');
  };

  const filteredAdvisors = advisors.filter(advisor =>
    advisor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredAdvisors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAdvisors = filteredAdvisors.slice(startIndex, endIndex);

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
          <h1 className="text-3xl font-bold text-[#0C1F5E] mb-2 openSans">Advisors</h1>
          <p className="text-gray-700 poppins">Manage your advisors</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#01DC98] text-[#0C1F5E] rounded-lg font-semibold hover:bg-[#0C1F5E] hover:text-white transition-all"
        >
          <Plus size={20} />
          Add Advisor
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search advisors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Advisors List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredAdvisors.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 text-lg poppins">No advisors found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedAdvisors.map((advisor) => (
                  <motion.tr
                    key={advisor._id || advisor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {advisor.imageUrl && (
                          <img
                            src={advisor.imageUrl}
                            alt={advisor.name}
                            className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-gray-200"
                          />
                        )}
                        <span className="font-semibold text-gray-900 poppins">
                          {advisor.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 poppins">{advisor.title}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-md truncate poppins text-sm">{advisor.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(advisor)}
                          className="text-[#01DC98] hover:text-[#0C1F5E] transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(advisor._id || advisor.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredAdvisors.length}
              onItemsPerPageChange={(newItemsPerPage) => {
                setItemsPerPage(newItemsPerPage);
                setCurrentPage(1);
              }}
            />
          </>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <AdvisorsForm
          advisor={editingAdvisor}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Advisors;

