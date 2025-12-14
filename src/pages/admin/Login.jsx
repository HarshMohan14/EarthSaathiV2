import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

        const from = location.state?.from?.pathname || '/admin-panel';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0C1F5E] via-[#021358] to-[#0C1F5E] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/earthSaathiFavicon.jpg"
                alt="EarthSaathi"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-[#01DC98]"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0C1F5E] mb-2 openSans">Admin Panel</h1>
            <p className="text-gray-600 text-sm md:text-base poppins">Sign in to manage your content</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700"
            >
              <AlertCircle size={20} className="flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 poppins">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-[#01DC98] outline-none transition-all poppins text-sm md:text-base text-gray-900 placeholder:text-gray-400"
                  placeholder="admin@earthsaathi.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 poppins">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01DC98] focus:border-[#01DC98] outline-none transition-all poppins text-sm md:text-base text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#01DC98] text-[#0C1F5E] rounded-lg font-semibold hover:bg-[#0C1F5E] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-base md:text-lg poppins"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0C1F5E]"></span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Admin Credentials */}
          <div className="mt-6 p-4 bg-gradient-to-r from-[#01DC98]/10 to-[#0C1F5E]/10 rounded-lg border border-[#01DC98]/20">
            <p className="text-xs text-gray-700 text-center poppins">
              <strong className="text-[#0C1F5E]">Admin Credentials:</strong><br />
              <span className="text-gray-600">Email: admin@earthsaathi.com</span><br />
              <span className="text-gray-600">Password: EarthSaathiAdmin</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

