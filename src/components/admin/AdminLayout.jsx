import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Newspaper,
  Mail,
  FileText,
  MessageSquare,
  Award,
  Wrench,
  LogOut,
  Menu,
  X,
  BarChart3,
  Receipt
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ToastProvider } from './Toast';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-panel/login');
  };

  const menuItems = [
    { path: '/admin-panel', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin-panel/advisors', icon: Users, label: 'Advisors' },
    { path: '/admin-panel/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/admin-panel/team', icon: Users, label: 'Team' },
    { path: '/admin-panel/solutions', icon: Wrench, label: 'Solutions' },
    { path: '/admin-panel/success-stories', icon: Award, label: 'Success Stories' },
    { path: '/admin-panel/newsletters', icon: Newspaper, label: 'Newsletters' },
    { path: '/admin-panel/subscribers', icon: Mail, label: 'Subscribers' },
    { path: '/admin-panel/resources', icon: FileText, label: 'Resources' },
    { path: '/admin-panel/contact-submissions', icon: MessageSquare, label: 'Contact Submissions' },
    { path: '/admin-panel/quote-requests', icon: Receipt, label: 'Quote Requests' },
    { path: '/admin-panel/chat-messages', icon: MessageSquare, label: 'Chat Messages' },
    { path: '/admin-panel/visitor-analytics', icon: BarChart3, label: 'Visitor Analytics' },
  ];

  const isActive = (path) => {
    if (path === '/admin-panel') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0C1F5E] text-white z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Link
                to="/admin-panel"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <img
                  src="/earthSaathiFavicon.jpg"
                  alt="EarthSaathi"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="font-bold text-lg text-white openSans">Admin Panel</h1>
                  <p className="text-xs text-gray-200 poppins">EarthSaathi</p>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:bg-white/10 rounded p-1 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all poppins ${
                    active
                      ? 'bg-[#01DC98] text-[#0C1F5E] font-semibold'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-white/10">
            <div className="mb-3 p-3 bg-white/10 rounded-lg">
              <p className="text-sm font-medium text-white">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-200">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-red-600 hover:text-white transition-all font-medium"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-[#0C1F5E] capitalize openSans">
              {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
            </h2>
            <div className="w-6" /> {/* Spacer for mobile */}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
      </div>
    </ToastProvider>
  );
};

export default AdminLayout;

