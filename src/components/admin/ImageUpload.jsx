import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageUpload = ({ value = '', onChange, label = 'Image', required = false, bucketName = 'admin-images' }) => {
  const [uploadMethod, setUploadMethod] = useState(value && !value.startsWith('blob:') ? 'url' : 'upload');
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Show preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Upload to Supabase Storage
    setUploading(true);
    try {
      const { supabase } = await import('../../utils/supabase');
      
      if (!supabase) {
        // Fallback to URL if Supabase not configured
        onChange(previewUrl);
        setUploading(false);
        return;
      }

      // Create bucket if it doesn't exist (this will fail silently if bucket exists)
      // Note: Bucket should be created via SQL script first
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 11)}.${fileExt}`;
      const filePath = `${bucketName}/${fileName}`;

      // Upload file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        // If bucket doesn't exist, try to create it or use fallback
        if (uploadError.message.includes('Bucket not found')) {
          console.warn('Storage bucket not found, using blob URL as fallback');
          onChange(previewUrl);
        } else {
          throw uploadError;
        }
      } else {
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);
        
        // Clean up preview URL
        URL.revokeObjectURL(previewUrl);
        setPreview(publicUrl);
        onChange(publicUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Using local preview. Please use URL method or check Supabase Storage configuration.');
      // Use blob URL as fallback
      onChange(preview);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
  };

  const handleRemove = () => {
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-800 mb-2 poppins">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Upload Method Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setUploadMethod('upload')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            uploadMethod === 'upload'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Upload size={16} />
          <span className="text-sm poppins">Upload File</span>
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod('url')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            uploadMethod === 'url'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <LinkIcon size={16} />
          <span className="text-sm poppins">Use URL</span>
        </button>
      </div>

      {/* Upload Method */}
      {uploadMethod === 'upload' ? (
        <div className="space-y-3">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              uploading
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id={`image-upload-${label}`}
              disabled={uploading}
            />
            <label
              htmlFor={`image-upload-${label}`}
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="text-sm text-gray-600 poppins">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600 poppins">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-500 poppins">
                    PNG, JPG, GIF up to 5MB
                  </span>
                </>
              )}
            </label>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="url"
            value={value || ''}
            onChange={handleUrlChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-transparent text-gray-900 placeholder:text-gray-400"
            placeholder="Enter image URL (e.g., /image.jpg or https://example.com/image.jpg)"
          />
        </div>
      )}

      {/* Preview */}
      {preview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block mt-3"
        >
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-w-xs h-48 object-cover rounded-lg border border-gray-300"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1 poppins truncate max-w-xs">
            {preview}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;

