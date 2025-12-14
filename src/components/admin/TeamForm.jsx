import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminTeamAPI } from '../../utils/adminApi';
import ImageUpload from './ImageUpload';

const TeamForm = ({ member, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    quote: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        designation: member.designation || '',
        quote: member.quote || member.description || '',
        imageUrl: member.imageUrl || member.image_url || '',
      });
    }
  }, [member]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSend = {
        name: formData.name,
        designation: formData.designation,
        quote: formData.quote,
        image_url: formData.imageUrl,
      };

      if (member) {
        // Update existing team member (all data is now in database)
        const memberId = member._id || member.id;
        if (!memberId) {
          throw new Error('Cannot update: member ID is missing');
        }
        await adminTeamAPI.update(memberId, dataToSend);
      } else {
        // Create new team member
        await adminTeamAPI.create(dataToSend);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving team member:', error);
      setError(error.message || 'Failed to save team member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#0C1F5E] openSans">
              {member ? 'Edit Team Member' : 'Add New Team Member'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 poppins">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
                placeholder="Enter team member name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 poppins">
                Designation *
              </label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
                placeholder="Enter designation (e.g., CEO, CTO)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 poppins">
                Quote
              </label>
              <textarea
                rows={3}
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
                placeholder="Enter a quote or description"
              />
            </div>

            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              label="Image"
              required={false}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors font-medium poppins"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#01DC98] text-[#0C1F5E] rounded-lg font-semibold hover:bg-[#0C1F5E] hover:text-white transition-all disabled:opacity-50 poppins"
              >
                {loading ? 'Saving...' : member ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TeamForm;

