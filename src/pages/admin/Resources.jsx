import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Download } from 'lucide-react';
import { adminResourcesAPI } from '../../utils/adminApi';
import Pagination from '../../components/admin/Pagination';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const data = await adminResourcesAPI.getAll().catch(async () => {
        const { resourcesAPI } = await import('../../utils/api');
        return resourcesAPI.getAll();
      });
      setResources(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter(resource =>
    resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResources = filteredResources.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01DC98]"></div>
    </div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0C1F5E] mb-2 openSans">Resources</h1>
          <p className="text-gray-700 poppins">Manage your resources</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#01DC98] text-[#0C1F5E] rounded-lg font-semibold hover:bg-[#0C1F5E] hover:text-white">
          <Plus size={20} /> Add Resource
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length === 0 ? (
          <div className="col-span-full p-12 text-center">
            <p className="text-gray-500 text-lg">No resources found</p>
          </div>
        ) : (
          paginatedResources.map((resource) => (
            <div key={resource._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6">
              <h3 className="text-xl font-bold text-[#0C1F5E] mb-2 openSans">{resource.title}</h3>
              <p className="text-gray-700 text-sm mb-4 poppins">{resource.description?.substring(0, 100)}...</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 poppins font-medium">
                  Downloads: {resource.downloadCount || 0}
                </span>
                <div className="flex gap-2">
                  <button className="text-[#01DC98] hover:text-[#0C1F5E]"><Download size={18} /></button>
                  <button className="text-[#01DC98] hover:text-[#0C1F5E]"><Edit size={18} /></button>
                  <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredResources.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredResources.length}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
};

export default Resources;

