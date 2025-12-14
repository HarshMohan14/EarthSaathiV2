import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Leaf, CheckCircle, AlertCircle, Loader2, Building2, Mail } from 'lucide-react';

const QuoteModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
      setCurrentStep(1);
      setStatus({ type: '', message: '' });
      setLoading(false);
    }
  }, [isOpen]);

  const services = [
    'Carbon Capture Solutions',
    'Biogas Upgrading',
    'Waste to Energy',
    'Environmental Consulting',
    'Custom Solutions',
    'Other',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate step 1 fields before proceeding
      if (!formData.name || formData.name.trim() === '') {
        setStatus({
          type: 'error',
          message: 'Please enter your full name before proceeding.',
        });
        return;
      }
      if (!formData.email || formData.email.trim() === '') {
        setStatus({
          type: 'error',
          message: 'Please enter your email address before proceeding.',
        });
        return;
      }
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setStatus({
          type: 'error',
          message: 'Please enter a valid email address.',
        });
        return;
      }
      setCurrentStep(2);
      // Clear any previous status messages when moving forward
      setStatus({ type: '', message: '' });
    } else if (currentStep === 2) {
      setCurrentStep(3);
      // Clear any previous status messages when moving to step 3
      setStatus({ type: '', message: '' });
      // Ensure loading is false when reaching step 3
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateForm = () => {
    // Required fields validation
    if (!formData.name || formData.name.trim() === '') {
      setStatus({
        type: 'error',
        message: 'Please enter your full name.',
      });
      return false;
    }

    if (!formData.email || formData.email.trim() === '') {
      setStatus({
        type: 'error',
        message: 'Please enter your email address.',
      });
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent double submission
    if (loading || status.type === 'success') {
      return;
    }

    // Only allow submission on step 3
    if (currentStep !== 3) {
      console.log('Cannot submit: not on step 3');
      return;
    }

    // Validate all required fields before submission
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const { contactAPI } = await import('../utils/api');
      const result = await contactAPI.submit({
        name: formData.name,
        email: formData.email,
        message: formData.message || 'Quote request submitted',
        submission_type: 'quote_request',
        phone: formData.phone || null,
        company: formData.company || null,
        service: formData.service || null,
      });

      if (result && result.success) {
        setLoading(false);
        setStatus({
          type: 'success',
          message: 'Thank you! We\'ll get back to you soon with a customized quote.',
        });
        
        // Wait 3 seconds to show success message, then close
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            message: '',
          });
          setCurrentStep(1);
          setStatus({ type: '', message: '' });
          setLoading(false);
          onClose();
        }, 3000);
      } else {
        setLoading(false);
        setStatus({
          type: 'error',
          message: result?.error || 'Failed to submit request. Please try again.',
        });
      }
    } catch (error) {
      console.error('Quote request error:', error);
      setLoading(false);
      setStatus({
        type: 'error',
        message: 'Failed to submit request. Please try again later.',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    });
    setCurrentStep(1);
    setStatus({ type: '', message: '' });
  };

  const handleClose = () => {
    // Prevent closing on step 3 until form is successfully submitted
    if (currentStep === 3) {
      // Only allow closing if form was successfully submitted
      if (status.type === 'success') {
        resetForm();
        onClose();
        return;
      }
      // Otherwise, prevent closing on step 3 - show a message
      if (formData.name || formData.email || formData.message) {
        alert('Please submit the form to complete your quote request. The form will close automatically after successful submission.');
      }
      return;
    }
    
    // For steps 1 and 2, ask for confirmation if there's any data
    if (formData.name || formData.email) {
      if (window.confirm('Are you sure you want to close? Your progress will be lost.')) {
        resetForm();
        onClose();
      }
    } else {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            // Prevent closing on step 3 unless form was successfully submitted
            if (currentStep === 3 && status.type !== 'success') {
              return;
            }
            handleClose();
          }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 poppins">Get a Quote</h2>
              <p className="text-sm text-gray-600 poppins">Step {currentStep} of 3</p>
            </div>
            <button
              onClick={handleClose}
              disabled={currentStep === 3 && status.type !== 'success' && !loading}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              title={currentStep === 3 && status.type !== 'success' ? 'Please submit the form to close' : 'Close'}
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="bg-blue-600 h-2 rounded-full"
              />
            </div>
          </div>

          {/* Form Content */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              // Prevent any automatic form submission
              // Form will only submit when submit button is explicitly clicked
              return false;
            }} 
            className="p-6 space-y-6"
            onKeyDown={(e) => {
              // Prevent Enter key from submitting form unless submit button is focused
              if (e.key === 'Enter' && currentStep === 3) {
                const target = e.target;
                // Only allow Enter to submit if it's pressed on the submit button
                if (target.type !== 'submit') {
                  e.preventDefault();
                }
              }
            }}
          >
            {/* Status Message */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg flex items-center gap-3 ${
                  status.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span className="poppins text-sm">{status.message}</span>
              </motion.div>
            )}

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 poppins">Basic Information</h3>
                  <p className="text-gray-600 poppins text-sm">Tell us about yourself</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all poppins text-gray-900 placeholder:text-gray-400 ${
                      status.type === 'error' && !formData.name?.trim() ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all poppins text-gray-900 placeholder:text-gray-400 ${
                      status.type === 'error' && !formData.email?.trim() ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Company & Contact */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 poppins">Company Details</h3>
                  <p className="text-gray-600 poppins text-sm">Help us understand your needs</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all poppins text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all poppins text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Service & Message */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <Leaf className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 poppins">Service & Requirements</h3>
                  <p className="text-gray-600 poppins text-sm">Tell us what you need</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      // Prevent Enter key from submitting form
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all poppins text-gray-900"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us more about your requirements, timeline, or any specific questions..."
                    onKeyDown={(e) => {
                      // Prevent Enter key from submitting form (allow normal text entry)
                      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
                        // Allow normal Enter for new lines, but prevent form submission
                        e.stopPropagation();
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none poppins text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between gap-4 pt-4 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium poppins"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email || loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed poppins flex items-center gap-2 ml-auto"
                >
                  Next
                  <Send className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Only submit when button is explicitly clicked
                    if (currentStep === 3 && !loading && status.type !== 'success') {
                      handleSubmit(e);
                    }
                  }}
                  disabled={loading || status.type === 'success' || !formData.name?.trim() || !formData.email?.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed poppins flex items-center gap-2 ml-auto"
                  title={!formData.name?.trim() || !formData.email?.trim() ? 'Please fill in all required fields (Name and Email)' : ''}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : status.type === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Submitted!
                    </>
                  ) : (
                    <>
                      Submit Request
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuoteModal;

