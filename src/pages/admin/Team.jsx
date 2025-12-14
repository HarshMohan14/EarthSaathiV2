import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { adminTeamAPI } from '../../utils/adminApi';
import TeamForm from '../../components/admin/TeamForm';
import Pagination from '../../components/admin/Pagination';
import { useToast } from '../../components/admin/Toast';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { success, error: showError } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeam();
    // Check if we should open the form (from Quick Actions)
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('new') === 'true') {
      setShowForm(true);
      // Clean up URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      // Fetch all team members from database (static data should be migrated to database)
      const data = await adminTeamAPI.getAll().catch(() => []);
      setTeam(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching team:', error);
      showError('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;

    try {
      await adminTeamAPI.delete(id);
      setTeam(team.filter(m => (m._id || m.id) !== id));
      success('Team member deleted successfully');
    } catch (error) {
      showError(error.message || 'Failed to delete team member');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  const handleFormSuccess = () => {
    fetchTeam();
    handleFormClose();
    success(editingMember ? 'Team member updated successfully' : 'Team member created successfully');
  };

  const filteredTeam = team.filter(member =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredTeam.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTeam = filteredTeam.slice(startIndex, endIndex);

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
          <h1 className="text-3xl font-bold text-[#0C1F5E] mb-2 openSans">Team Members</h1>
          <p className="text-gray-700 poppins">Manage your team members</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#01DC98] text-[#0C1F5E] rounded-lg font-semibold hover:bg-[#0C1F5E] hover:text-white transition-all"
        >
          <Plus size={20} /> Add Member
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredTeam.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg">No team members found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedTeam.map((member) => (
                  <motion.tr
                    key={member._id || member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {member.imageUrl && (
                          <img
                            src={member.imageUrl || member.image_url}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <span className="font-semibold text-gray-900 poppins">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 poppins">{member.designation}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-[#01DC98] hover:text-[#0C1F5E] transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id || member.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Delete"
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
        )}
      </div>

      {filteredTeam.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredTeam.length}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Form Modal */}
      {showForm && (
        <TeamForm
          member={editingMember}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Team;

