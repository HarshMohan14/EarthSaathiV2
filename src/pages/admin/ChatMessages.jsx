import React, { useState, useEffect } from 'react';
import { Trash2, MessageSquare, Eye, Archive, Search, X, User, Calendar, Send, Mail, Download, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminChatAPI } from '../../utils/adminApi';
import Pagination from '../../components/admin/Pagination';
import { useToast } from '../../components/admin/Toast';

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { success, error: showError } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await adminChatAPI.getAll();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      showError('Failed to load chat messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await adminChatAPI.delete(id);
      setMessages(messages.filter(m => (m._id || m.id) !== id));
      success('Message deleted successfully');
    } catch (error) {
      showError(error.message || 'Failed to delete message');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await adminChatAPI.updateStatus(id, newStatus);
      setMessages(messages.map(m => 
        (m._id || m.id) === id ? { ...m, status: newStatus } : m
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
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredMessages = messages.filter(msg =>
    msg.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.sender_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.sender_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 poppins">Chat Messages</h1>
          <p className="text-gray-700 poppins">Manage messages from Let's Chat feature</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search messages, names, or emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100/50 overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg poppins">No chat messages found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm border-b border-blue-100/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider poppins">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider poppins">Sender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider poppins">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider poppins">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider poppins">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedMessages.map((msg) => (
                  <tr key={msg._id || msg.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-900 poppins max-w-xs truncate">
                          {msg.message}
                        </div>
                        {msg.attachments && Array.isArray(msg.attachments) && msg.attachments.length > 0 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs poppins">
                            <Paperclip className="w-3 h-3" />
                            {msg.attachments.length}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 poppins">
                        {msg.sender_name || 'Anonymous'}
                      </div>
                      {msg.sender_email && (
                        <div className="text-xs text-gray-500 poppins flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {msg.sender_email}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 poppins flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(msg.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={msg.status || 'new'}
                        onChange={(e) => handleStatusUpdate(msg._id || msg.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium poppins border-0 ${getStatusColor(msg.status || 'new')}`}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedMessage(msg)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(msg._id || msg.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {filteredMessages.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredMessages.length}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      )}

      {/* View Message Modal */}
      {selectedMessage && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-100/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-start z-10">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 poppins">Chat Message Details</h2>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status || 'new')}`}>
                    {selectedMessage.status || 'new'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-600 hover:text-gray-900 transition-colors ml-4"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm rounded-lg p-4 border border-blue-100/50">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 poppins mb-1">
                      {selectedMessage.sender_name || 'Anonymous User'}
                    </div>
                    {selectedMessage.sender_email && (
                      <div className="text-sm text-gray-600 poppins flex items-center gap-1 mb-2">
                        <Mail className="w-4 h-4" />
                        {selectedMessage.sender_email}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 poppins flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(selectedMessage.created_at)}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100/50">
                  <p className="text-gray-900 whitespace-pre-wrap break-words poppins">
                    {selectedMessage.message}
                  </p>
                </div>

                {selectedMessage.attachments && Array.isArray(selectedMessage.attachments) && selectedMessage.attachments.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2 poppins">Attachments:</div>
                    <div className="space-y-2">
                      {selectedMessage.attachments.map((file, index) => (
                        <div key={index} className="flex items-start justify-between gap-3 p-3 bg-white/70 rounded-lg border border-blue-100/50 hover:bg-white transition-colors">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                              <Send className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 poppins break-words break-all">{file.name}</div>
                              {file.size && (
                                <div className="text-xs text-gray-500 poppins mt-1">
                                  {(file.size / 1024).toFixed(2)} KB • {file.type || 'Unknown type'}
                                </div>
                              )}
                              {file.error && (
                                <div className="text-xs text-red-600 poppins mt-1">{file.error}</div>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {file.url ? (
                              <a
                                href={file.url}
                                download={file.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 poppins whitespace-nowrap"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </a>
                            ) : (
                              <div className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed flex items-center gap-2 poppins whitespace-nowrap">
                                <X className="w-4 h-4" />
                                Not Available
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedMessage._id || selectedMessage.id, 'replied');
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors poppins"
                >
                  Mark as Replied
                </button>
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedMessage._id || selectedMessage.id, 'archived');
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors poppins"
                >
                  Archive
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedMessage._id || selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors poppins"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;

