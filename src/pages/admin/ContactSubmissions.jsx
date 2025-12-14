import React, { useState, useEffect } from 'react';
import { Trash2, Mail, Eye, Archive, Search, X, User, Calendar, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminContactAPI } from '../../utils/adminApi';
import Pagination from '../../components/admin/Pagination';
import { useToast } from '../../components/admin/Toast';

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { success, error: showError } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const allData = await adminContactAPI.getAll();
      // Filter out quote requests - only show regular contact submissions
      const contactOnly = (Array.isArray(allData) ? allData : [])
        .filter(sub => !sub.submission_type || sub.submission_type === 'contact');
      setSubmissions(contactOnly);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      showError('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;

    try {
      await adminContactAPI.delete(id);
      setSubmissions(submissions.filter(s => (s._id || s.id) !== id));
      success('Submission deleted successfully');
    } catch (error) {
      showError(error.message || 'Failed to delete submission');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await adminContactAPI.updateStatus(id, newStatus);
      setSubmissions(submissions.map(s => 
        (s._id || s.id) === id ? { ...s, status: newStatus } : s
      ));
      success('Status updated successfully');
    } catch (error) {
      showError(error.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);

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
          <h1 className="text-3xl font-bold text-[#0C1F5E] mb-2 openSans">Contact Submissions</h1>
          <p className="text-gray-700 poppins">Manage contact form submissions</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredSubmissions.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 text-lg poppins">No contact submissions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider poppins">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider poppins">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider poppins">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider poppins">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider poppins">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider poppins">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedSubmissions.map((submission) => (
                  <motion.tr
                    key={submission._id || submission.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900 poppins">{submission.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`mailto:${submission.email}`}
                        className="text-[#01DC98] hover:text-[#0C1F5E] transition-colors poppins"
                      >
                        {submission.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-gray-700 poppins truncate">
                        {submission.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={submission.status || 'new'}
                        onChange={(e) => handleStatusUpdate(submission._id || submission.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium poppins ${getStatusColor(submission.status || 'new')} border-0 focus:ring-2 focus:ring-[#01DC98]`}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 poppins">
                      {new Date(submission.created_at || submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-[#01DC98] hover:text-[#0C1F5E] transition-colors"
                          title="View details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(submission._id || submission.id)}
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

      {filteredSubmissions.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredSubmissions.length}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      )}

      {/* View Details Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-white via-sky-50/30 to-blue-50/20 backdrop-blur-md rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-blue-100/50"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#0C1F5E] to-[#021358] text-white px-6 py-5 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold openSans">Contact Submission Details</h2>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white hover:text-red-200"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Name Field */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-blue-100/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <User size={18} className="text-[#0C1F5E]" />
                    <label className="text-sm font-semibold text-[#0C1F5E] poppins">Name</label>
                  </div>
                  <p className="text-gray-900 text-base font-medium poppins ml-7">{selectedSubmission.name}</p>
                </div>

                {/* Email Field */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-blue-100/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={18} className="text-[#0C1F5E]" />
                    <label className="text-sm font-semibold text-[#0C1F5E] poppins">Email</label>
                  </div>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="text-[#01DC98] hover:text-[#0C1F5E] transition-colors poppins text-base font-medium ml-7 inline-flex items-center gap-2 hover:underline"
                  >
                    {selectedSubmission.email}
                    <Send size={14} />
                  </a>
                </div>

                {/* Message Field */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-blue-100/50 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <MessageSquare size={18} className="text-[#0C1F5E]" />
                      <label className="text-sm font-semibold text-[#0C1F5E] poppins">Message</label>
                    </div>
                    <span className="text-xs text-gray-500 poppins">
                      {selectedSubmission.message?.length || 0} / 400 characters
                    </span>
                  </div>
                  <div className="ml-7 bg-gray-50/80 rounded-lg p-4 border border-gray-200/50 max-h-64 overflow-y-auto">
                    <p className="text-gray-900 whitespace-pre-wrap poppins text-base leading-relaxed break-words">
                      {selectedSubmission.message}
                    </p>
                  </div>
                </div>

                {/* Status and Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Status Field */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-blue-100/50 shadow-sm">
                    <label className="block text-sm font-semibold text-[#0C1F5E] mb-2 poppins">Status</label>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold poppins ${getStatusColor(selectedSubmission.status || 'new')}`}>
                      {(selectedSubmission.status || 'new').charAt(0).toUpperCase() + (selectedSubmission.status || 'new').slice(1)}
                    </span>
                  </div>

                  {/* Date Field */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-blue-100/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar size={18} className="text-[#0C1F5E]" />
                      <label className="text-sm font-semibold text-[#0C1F5E] poppins">Submitted</label>
                    </div>
                    <p className="text-gray-900 poppins text-base font-medium ml-7">
                      {new Date(selectedSubmission.created_at || selectedSubmission.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200/50">
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedSubmission._id || selectedSubmission.id, 'replied');
                      setSelectedSubmission(null);
                    }}
                    className="flex-1 px-6 py-3 bg-[#01DC98] text-[#0C1F5E] rounded-lg font-semibold hover:bg-[#0C1F5E] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl poppins flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Mark as Replied
                  </button>
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedSubmission._id || selectedSubmission.id, 'archived');
                      setSelectedSubmission(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl poppins flex items-center justify-center gap-2"
                  >
                    <Archive size={18} />
                    Archive
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactSubmissions;

