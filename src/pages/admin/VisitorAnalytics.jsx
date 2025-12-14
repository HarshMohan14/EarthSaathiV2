import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Eye, Monitor, Smartphone, Tablet, Calendar, BarChart3, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminVisitorAnalyticsAPI } from '../../utils/adminApi';

const VisitorAnalytics = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    pageViews: {},
    deviceStats: {},
  });
  const [recentVisits, setRecentVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 30 days
    end: new Date().toISOString().split('T')[0], // Today
  });

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [statsData, recentData] = await Promise.all([
        adminVisitorAnalyticsAPI.getStats(dateRange.start, dateRange.end),
        adminVisitorAnalyticsAPI.getRecent(20),
      ]);

      // Ensure stats data is properly formatted
      const formattedStats = statsData ? {
        totalViews: Number(statsData.totalViews) || 0,
        uniqueVisitors: Number(statsData.uniqueVisitors) || 0,
        pageViews: statsData.pageViews || {},
        deviceStats: statsData.deviceStats || {},
      } : {
        totalViews: 0,
        uniqueVisitors: 0,
        pageViews: {},
        deviceStats: {},
      };

      setStats(formattedStats);
      setRecentVisits(Array.isArray(recentData) ? recentData : []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
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

  const topPages = Object.entries(stats.pageViews || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2 poppins">Visitor Analytics</h1>
          <p className="text-gray-700 poppins">Track website performance and visitor statistics</p>
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1 poppins">{stats.totalViews.toLocaleString()}</h3>
          <p className="text-sm text-gray-600 poppins">Total Page Views</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1 poppins">{stats.uniqueVisitors.toLocaleString()}</h3>
          <p className="text-sm text-gray-600 poppins">Unique Visitors</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1 poppins">{topPages.length}</h3>
          <p className="text-sm text-gray-600 poppins">Tracked Pages</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-600 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1 poppins">
            {stats.totalViews > 0 ? ((stats.uniqueVisitors / stats.totalViews) * 100).toFixed(1) : 0}%
          </h3>
          <p className="text-sm text-gray-600 poppins">Return Rate</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Pages */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100/50 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 poppins flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Top Pages
          </h2>
          {topPages.length === 0 ? (
            <p className="text-gray-500 text-center py-8 poppins">No page views in this period</p>
          ) : (
            <div className="space-y-3">
              {topPages.map(([path, views], index) => (
                <div key={path} className="flex items-center justify-between p-3 bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm rounded-lg border border-blue-100/50">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm poppins">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 poppins truncate">{path || '/'}</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <span className="text-sm font-semibold text-blue-600 poppins">{views.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Device Statistics */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100/50 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 poppins flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-600" />
            Device Types
          </h2>
          {Object.keys(stats.deviceStats || {}).length === 0 ? (
            <p className="text-gray-500 text-center py-8 poppins">No device data in this period</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(stats.deviceStats || {}).map(([device, count]) => {
                const total = Object.values(stats.deviceStats || {}).reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                const Icon = device === 'mobile' ? Smartphone : device === 'tablet' ? Tablet : Monitor;
                
                return (
                  <div key={device} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900 poppins capitalize">{device}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 poppins">{count.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 poppins">({percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Visits */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100/50 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 poppins flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Recent Visits
        </h2>
        {recentVisits.length === 0 ? (
          <p className="text-gray-500 text-center py-8 poppins">No recent visits</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm border-b border-blue-100/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider poppins">Page</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider poppins">Device</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider poppins">Browser</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider poppins">OS</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider poppins">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentVisits.map((visit) => (
                  <tr key={visit._id || visit.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900 poppins">{visit.page_path || '/'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {visit.device_type === 'mobile' ? (
                          <Smartphone className="w-4 h-4 text-gray-600" />
                        ) : visit.device_type === 'tablet' ? (
                          <Tablet className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Monitor className="w-4 h-4 text-gray-600" />
                        )}
                        <span className="text-sm text-gray-700 poppins capitalize">{visit.device_type || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-700 poppins">{visit.browser || 'Unknown'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-700 poppins">{visit.os || 'Unknown'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500 poppins">{formatDate(visit.visited_at || visit.created_at)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorAnalytics;

