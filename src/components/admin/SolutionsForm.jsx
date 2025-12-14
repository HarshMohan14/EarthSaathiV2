import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminSolutionsAPI } from '../../utils/adminApi';
import ImageUpload from './ImageUpload';

const SolutionsForm = ({ solution, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    imagePosition: 'left',
    points: [],
  });
  const [newPoint, setNewPoint] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (solution) {
      const points = Array.isArray(solution.points) 
        ? solution.points 
        : (typeof solution.points === 'string' ? JSON.parse(solution.points || '[]') : []);
      
      setFormData({
        title: solution.title || '',
        description: solution.description || '',
        imageUrl: solution.imageUrl || solution.image_url || '',
        imagePosition: solution.imagePosition || solution.image_position || 'left',
        points: points,
      });
    }
  }, [solution]);

  const handleAddPoint = () => {
    if (newPoint.trim()) {
      setFormData({
        ...formData,
        points: [...formData.points, newPoint.trim()],
      });
      setNewPoint('');
    }
  };

  const handleRemovePoint = (index) => {
    setFormData({
      ...formData,
      points: formData.points.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        image_url: formData.imageUrl,
        image_position: formData.imagePosition,
        points: JSON.stringify(formData.points),
      };

      if (solution) {
        // Update existing solution
        await adminSolutionsAPI.update(solution._id || solution.id, dataToSend);
      } else {
        // Create new solution
        await adminSolutionsAPI.create(dataToSend);
      }

      onSuccess();
    } catch (err) {
      console.error('Error saving solution:', err);
      setError(err.message || 'Failed to save solution. Please try again.');
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
              {solution ? 'Edit Solution' : 'Add New Solution'}
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
                placeholder="Enter solution title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                placeholder="Enter solution description"
              />
            </div>

            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              label="Image"
              required={false}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                Image Position *
              </label>
              <select
                value={formData.imagePosition}
                onChange={(e) => setFormData({ ...formData, imagePosition: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                Key Points
              </label>
              <div className="space-y-2 mb-2">
                {formData.points.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="flex-1 text-sm text-gray-900 poppins">{point}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePoint(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddPoint();
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                  placeholder="Add a key point and press Enter"
                />
                <button
                  type="button"
                  onClick={handleAddPoint}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
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
                {loading ? 'Saving...' : solution ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SolutionsForm;

