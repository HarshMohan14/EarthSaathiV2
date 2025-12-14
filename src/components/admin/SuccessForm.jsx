import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminSuccessAPI } from '../../utils/adminApi';
import ImageUpload from './ImageUpload';

const SuccessForm = ({ story, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    date: '',
    linkUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title || '',
        description: story.description || '',
        imageUrl: story.imageUrl || story.image_url || '',
        date: story.date || '',
        linkUrl: story.linkUrl || story.link_url || '',
      });
    }
  }, [story]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        image_url: formData.imageUrl,
        date: formData.date,
        link_url: formData.linkUrl,
      };

      if (story) {
        // Update existing story
        await adminSuccessAPI.update(story._id || story.id, dataToSend);
      } else {
        // Create new story
        await adminSuccessAPI.create(dataToSend);
      }

      onSuccess();
    } catch (err) {
      console.error('Error saving success story:', err);
      setError(err.message || 'Failed to save success story. Please try again.');
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
              {story ? 'Edit Success Story' : 'Add New Success Story'}
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
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
                placeholder="Enter success story title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 poppins">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
                placeholder="Enter success story description"
              />
            </div>

            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              label="Image"
              required={false}
            />

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 poppins">
                Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
                placeholder="Enter date (e.g., 15-12-2023)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 poppins">
                Link URL
              </label>
              <input
                type="url"
                value={formData.linkUrl}
                onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
                placeholder="Enter link URL (optional)"
              />
            </div>

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
                {loading ? 'Saving...' : story ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SuccessForm;

