import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Eye, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { adminNewslettersAPI } from '../../utils/adminApi';
import NewsletterForm from '../../components/admin/NewsletterForm';
import Pagination from '../../components/admin/Pagination';

const Newsletters = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);
  const [viewingNewsletter, setViewingNewsletter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNewsletters();
    // Check if we should open the form (from Quick Actions)
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('new') === 'true') {
      setShowForm(true);
      setSelectedNewsletter(null);
      // Clean up URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const fetchNewsletters = async () => {
    try {
      const data = await adminNewslettersAPI.getAll().catch(async () => {
        const { newslettersAPI } = await import('../../utils/api');
        return newslettersAPI.getAll();
      });
      setNewsletters(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this newsletter?')) {
      return;
    }

    try {
      await adminNewslettersAPI.delete(id);
      fetchNewsletters();
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      alert('Failed to delete newsletter. Please try again.');
    }
  };

  const handleView = (newsletter) => {
    setViewingNewsletter(newsletter);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedNewsletter(null);
    fetchNewsletters();
  };

  const filteredNewsletters = newsletters.filter(newsletter =>
    newsletter.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredNewsletters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNewsletters = filteredNewsletters.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div>
      {showForm && (
        <NewsletterForm
          newsletter={selectedNewsletter}
          onClose={() => {
            setShowForm(false);
            setSelectedNewsletter(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}

      {viewingNewsletter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 poppins">{viewingNewsletter.title}</h2>
              <button
                onClick={() => setViewingNewsletter(null)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {(viewingNewsletter.imageUrl || viewingNewsletter.image_url) && (
                <img
                  src={viewingNewsletter.imageUrl || viewingNewsletter.image_url}
                  alt={viewingNewsletter.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              {viewingNewsletter.description && (
                <p className="text-gray-700 poppins">{viewingNewsletter.description}</p>
              )}
              <div className="prose max-w-none">
                <p className="text-gray-900 whitespace-pre-wrap poppins">{viewingNewsletter.content}</p>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  viewingNewsletter.published
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {viewingNewsletter.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 poppins">Newsletters</h1>
          <p className="text-gray-700 poppins">Manage your newsletters</p>
        </div>
        <button 
          onClick={() => {
            setSelectedNewsletter(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} /> Create Newsletter
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search newsletters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNewsletters.length === 0 ? (
          <div className="col-span-full p-12 text-center">
            <p className="text-gray-500 text-lg poppins">No newsletters found</p>
          </div>
        ) : (
          paginatedNewsletters.map((newsletter) => (
            <div key={newsletter._id || newsletter.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2 poppins flex-1">{newsletter.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${
                  newsletter.published
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {newsletter.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-4 poppins line-clamp-2">
                {newsletter.description?.substring(0, 100) || newsletter.content?.substring(0, 100) || 'No description'}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleView(newsletter)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="View"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleEdit(newsletter)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(newsletter._id || newsletter.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredNewsletters.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredNewsletters.length}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
};

export default Newsletters;

