import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { adminSuccessAPI } from '../../utils/adminApi';
import SuccessForm from '../../components/admin/SuccessForm';
import { successData as staticSuccess } from '../../utils/successData';
import Pagination from '../../components/admin/Pagination';
import { useToast } from '../../components/admin/Toast';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { success, error: showError } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStories();
    // Check if we should open the form (from Quick Actions)
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('new') === 'true') {
      setShowForm(true);
      // Clean up URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      // Fetch dynamic data from Supabase
      const dynamicData = await adminSuccessAPI.getAll().catch(() => []);
      // Merge static and dynamic data, marking static as read-only
      const mergedData = [
        ...staticSuccess.map(story => ({ ...story, isStatic: true })),
        ...dynamicData.map(story => ({ ...story, isStatic: false }))
      ];
      setStories(Array.isArray(mergedData) ? mergedData : []);
    } catch (error) {
      console.error('Error fetching success stories:', error);
      showError('Failed to load success stories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, isStatic) => {
    if (isStatic) {
      showError('Static success stories cannot be deleted.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this success story?')) return;

    try {
      await adminSuccessAPI.delete(id);
      setStories(stories.filter(s => (s._id || s.id) !== id));
      success('Success story deleted successfully');
    } catch (error) {
      showError(error.message || 'Failed to delete success story');
    }
  };

  const handleEdit = (story) => {
    if (story.isStatic) {
      showError('Static success stories cannot be edited.');
      return;
    }
    setEditingStory(story);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingStory(null);
  };

  const handleFormSuccess = () => {
    fetchStories();
    handleFormClose();
    success(editingStory ? 'Success story updated successfully' : 'Success story created successfully');
  };

  const filteredStories = stories.filter(story =>
    story.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStories = filteredStories.slice(startIndex, endIndex);

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
          <h1 className="text-3xl font-bold text-[#0C1F5E] mb-2 openSans">Success Stories</h1>
          <p className="text-gray-700 poppins">Manage your success stories and awards</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#01DC98] text-[#0C1F5E] rounded-lg font-semibold hover:bg-[#0C1F5E] hover:text-white transition-all"
        >
          <Plus size={20} />
          Add Story
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search success stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.length === 0 ? (
          <div className="col-span-full p-12 text-center">
            <p className="text-gray-600 text-lg poppins">No success stories found</p>
          </div>
        ) : (
          paginatedStories.map((story) => (
            <motion.div
              key={story._id || story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              {story.imageUrl || story.image_url ? (
                <img
                  src={story.imageUrl || story.image_url}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0C1F5E] mb-2 openSans">
                  {story.title} {story.isStatic && <span className="text-xs text-blue-500 font-normal">(Static)</span>}
                </h3>
                <p className="text-gray-700 text-sm mb-4 poppins line-clamp-3">
                  {story.description}
                </p>
                <div className="flex items-center text-gray-500 text-xs mb-4 poppins">
                  <span>{story.date}</span>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(story)}
                    className={`text-[#01DC98] hover:text-[#0C1F5E] transition-colors ${story.isStatic ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={story.isStatic}
                    title={story.isStatic ? 'Static stories cannot be edited' : 'Edit'}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(story._id || story.id, story.isStatic)}
                    className={`text-red-500 hover:text-red-700 transition-colors ${story.isStatic ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={story.isStatic}
                    title={story.isStatic ? 'Static stories cannot be deleted' : 'Delete'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {filteredStories.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredStories.length}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Form Modal */}
      {showForm && (
        <SuccessForm
          story={editingStory}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default SuccessStories;

