import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminNewslettersAPI } from '../../utils/adminApi';
import ImageUpload from './ImageUpload';

const NewsletterForm = ({ newsletter, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (newsletter) {
      setFormData({
        title: newsletter.title || '',
        description: newsletter.description || '',
        content: newsletter.content || '',
        imageUrl: newsletter.imageUrl || newsletter.image_url || '',
        published: newsletter.published || false,
      });
    }
  }, [newsletter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        image_url: formData.imageUrl,
        published: formData.published,
      };

      if (newsletter) {
        // Update existing newsletter
        await adminNewslettersAPI.update(newsletter._id || newsletter.id, dataToSend);
      } else {
        // Create new newsletter
        await adminNewslettersAPI.create(dataToSend);
      }

      onSuccess();
    } catch (err) {
      console.error('Error saving newsletter:', err);
      setError(err.message || 'Failed to save newsletter. Please try again.');
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
          className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 poppins">
              {newsletter ? 'Edit Newsletter' : 'Add New Newsletter'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors"
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
              <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                placeholder="Enter newsletter title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                placeholder="Enter newsletter description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                Content *
              </label>
              <textarea
                required
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                placeholder="Enter newsletter content"
              />
            </div>

            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              label="Image"
              required={false}
            />

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="published" className="text-sm font-medium text-gray-700 poppins cursor-pointer">
                Publish newsletter
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium poppins"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 poppins"
              >
                {loading ? 'Saving...' : newsletter ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NewsletterForm;

