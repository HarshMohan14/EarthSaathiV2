import React, { useState, useEffect } from 'react';
import { Trash2, Mail, Eye, Archive, Search, X, User, Calendar, MessageSquare, Send, Building2, Phone, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminContactAPI } from '../../utils/adminApi';
import Pagination from '../../components/admin/Pagination';
import { useToast } from '../../components/admin/Toast';

const QuoteRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { success, error: showError } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const allSubmissions = await adminContactAPI.getAll();
      // Filter only quote requests
      const quoteRequests = (Array.isArray(allSubmissions) ? allSubmissions : [])
        .filter(sub => sub.submission_type === 'quote_request');
      setRequests(quoteRequests);
    } catch (error) {
      console.error('Error fetching quote requests:', error);
      showError('Failed to load quote requests');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote request?')) return;

    try {
      await adminContactAPI.delete(id);
      setRequests(requests.filter(r => (r._id || r.id) !== id));
      success('Quote request deleted successfully');
    } catch (error) {
      showError(error.message || 'Failed to delete quote request');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await adminContactAPI.updateStatus(id, newStatus);
      setRequests(requests.map(r => 
        (r._id || r.id) === id ? { ...r, status: newStatus } : r
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const filteredRequests = requests.filter(request =>
    request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

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
          <h1 className="text-3xl font-bold text-[#0C1F5E] mb-2 openSans">Quote Requests</h1>
          <p className="text-gray-700 poppins">Manage quote requests from customers</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-200">
          <span className="text-gray-700 poppins font-medium">Total: {requests.length}</span>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, company, service, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 poppins"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-blue-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-sky-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider openSans">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider openSans">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider openSans">Company</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider openSans">Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider openSans">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider openSans">Date</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider openSans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <MessageSquare className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-500 poppins">No quote requests found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedRequests.map((request) => (
                  <tr key={request._id || request.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 poppins font-medium">{request.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`mailto:${request.email}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 poppins"
                      >
                        <Mail className="w-4 h-4" />
                        {request.email || 'N/A'}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-700 poppins">{request.company || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-700 poppins">{request.service || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={request.status || 'new'}
                        onChange={(e) => handleStatusUpdate(request._id || request.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium poppins cursor-pointer border-0 ${getStatusColor(request.status || 'new')}`}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-600 poppins text-sm">{formatDate(request.created_at)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(request._id || request.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredRequests.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredRequests.length}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      )}

      {/* View Details Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-sky-600 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white openSans">Quote Request Details</h2>
                  <p className="text-blue-100 text-sm poppins mt-1">
                    {formatDate(selectedRequest.created_at)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-5 h-5 text-blue-600" />
                        <label className="text-sm font-semibold text-gray-700 openSans">Name</label>
                      </div>
                      <p className="text-gray-900 poppins">{selectedRequest.name || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <label className="text-sm font-semibold text-gray-700 openSans">Email</label>
                      </div>
                      <a
                        href={`mailto:${selectedRequest.email}`}
                        className="text-blue-600 hover:text-blue-800 poppins break-all"
                      >
                        {selectedRequest.email || 'N/A'}
                      </a>
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <label className="text-sm font-semibold text-gray-700 openSans">Phone</label>
                      </div>
                      {selectedRequest.phone ? (
                        <a
                          href={`tel:${selectedRequest.phone}`}
                          className="text-blue-600 hover:text-blue-800 poppins"
                        >
                          {selectedRequest.phone}
                        </a>
                      ) : (
                        <p className="text-gray-500 poppins">N/A</p>
                      )}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <label className="text-sm font-semibold text-gray-700 openSans">Company</label>
                      </div>
                      <p className="text-gray-900 poppins">{selectedRequest.company || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Service */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <label className="text-sm font-semibold text-gray-700 openSans">Service Requested</label>
                    </div>
                    <p className="text-gray-900 poppins">{selectedRequest.service || 'N/A'}</p>
                  </div>

                  {/* Message */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <label className="text-sm font-semibold text-gray-700 openSans">Message</label>
                    </div>
                    <p className="text-gray-900 poppins whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
                      {selectedRequest.message || 'No message provided'}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="text-sm font-semibold text-gray-700 openSans mb-2 block">Status</label>
                    <select
                      value={selectedRequest.status || 'new'}
                      onChange={(e) => {
                        handleStatusUpdate(selectedRequest._id || selectedRequest.id, e.target.value);
                        setSelectedRequest({ ...selectedRequest, status: e.target.value });
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium poppins cursor-pointer border-0 ${getStatusColor(selectedRequest.status || 'new')}`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors poppins font-medium"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedRequest.email}?subject=Re: Quote Request from ${selectedRequest.name}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors poppins font-medium flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Reply via Email
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuoteRequests;

