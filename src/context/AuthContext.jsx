import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('admin_user');
    const storedToken = localStorage.getItem('admin_token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simple password authentication (no Supabase Auth required)
      if (email === 'admin@earthsaathi.com' && password === 'EarthSaathiAdmin') {
        const userData = {
          id: '1',
          email: email,
          name: 'Admin User',
          role: 'admin'
        };
        const token = 'admin_token_' + Date.now();
        
        localStorage.setItem('admin_user', JSON.stringify(userData));
        localStorage.setItem('admin_token', token);
        setUser(userData);
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

