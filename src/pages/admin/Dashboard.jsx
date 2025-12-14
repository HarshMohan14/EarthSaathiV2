import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  Users, 
  FolderKanban, 
  Newspaper, 
  Mail, 
  FileText,
  MessageSquare,
  Award,
  Wrench,
  TrendingUp,
  Eye,
  BarChart3,
  Receipt,
  Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import { adminAdvisorsAPI, adminProjectsAPI, adminTeamAPI, adminSolutionsAPI, adminSuccessAPI, adminNewslettersAPI, adminSubscribersAPI, adminResourcesAPI, adminContactAPI, adminChatAPI, adminVisitorAnalyticsAPI } from '../../utils/adminApi';
import { useToast } from '../../components/admin/Toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    advisors: 0,
    projects: 0,
    team: 0,
    solutions: 0,
    successStories: 0,
    newsletters: 0,
    subscribers: 0,
    resources: 0,
    contactSubmissions: 0,
    quoteRequests: 0,
    chatMessages: 0,
    totalViews: 0,
    uniqueVisitors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const { success, error: showError } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [advisors, projects, team, solutions, successStories, newsletters, subscribers, resources, contactSubmissions, chatMessages, visitorStats] = await Promise.all([
          adminAdvisorsAPI.getAll().catch(() => []),
          adminProjectsAPI.getAll().catch(() => []),
          adminTeamAPI.getAll().catch(() => []),
          adminSolutionsAPI.getAll().catch(() => []),
          adminSuccessAPI.getAll().catch(() => []),
          adminNewslettersAPI.getAll().catch(() => []),
          adminSubscribersAPI.getAll().catch(() => []),
          adminResourcesAPI.getAll().catch(() => []),
          adminContactAPI.getAll().catch(() => []),
          adminChatAPI.getAll().catch(() => []),
          adminVisitorAnalyticsAPI.getStats().catch(() => ({ totalViews: 0, uniqueVisitors: 0 })),
        ]);

        // Separate contact submissions and quote requests
        const allContacts = Array.isArray(contactSubmissions) ? contactSubmissions : [];
        const regularContacts = allContacts.filter(sub => !sub.submission_type || sub.submission_type === 'contact');
        const quoteReqs = allContacts.filter(sub => sub.submission_type === 'quote_request');

        setStats({
          advisors: Array.isArray(advisors) ? advisors.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
          team: Array.isArray(team) ? team.length : 0,
          solutions: Array.isArray(solutions) ? solutions.length : 0,
          successStories: Array.isArray(successStories) ? successStories.length : 0,
          newsletters: Array.isArray(newsletters) ? newsletters.length : 0,
          subscribers: Array.isArray(subscribers) ? subscribers.length : 0,
          resources: Array.isArray(resources) ? resources.length : 0,
          contactSubmissions: regularContacts.length,
          quoteRequests: quoteReqs.length,
          chatMessages: Array.isArray(chatMessages) ? chatMessages.length : 0,
          totalViews: visitorStats?.totalViews || 0,
          uniqueVisitors: visitorStats?.uniqueVisitors || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleMigrateStaticData = async () => {
    if (!window.confirm('This will add static team members, advisors, projects, and solutions to the database. Continue?')) {
      return;
    }

    setMigrating(true);
    try {
      const { migrateStaticData } = await import('../../utils/migrateStaticData');
      const results = await migrateStaticData();
      
      const teamSuccess = results.team.success.length;
      const advisorsSuccess = results.advisors.success.length;
      const projectsSuccess = results.projects.success.length;
      const solutionsSuccess = results.solutions.success.length;
      const teamErrors = results.team.errors.length;
      const advisorsErrors = results.advisors.errors.length;
      const projectsErrors = results.projects.errors.length;
      const solutionsErrors = results.solutions.errors.length;

      const totalSuccess = teamSuccess + advisorsSuccess + projectsSuccess + solutionsSuccess;
      const totalErrors = teamErrors + advisorsErrors + projectsErrors + solutionsErrors;

      if (totalSuccess > 0) {
        const parts = [];
        if (teamSuccess > 0) parts.push(`${teamSuccess} team member${teamSuccess > 1 ? 's' : ''}`);
        if (advisorsSuccess > 0) parts.push(`${advisorsSuccess} advisor${advisorsSuccess > 1 ? 's' : ''}`);
        if (projectsSuccess > 0) parts.push(`${projectsSuccess} project${projectsSuccess > 1 ? 's' : ''}`);
        if (solutionsSuccess > 0) parts.push(`${solutionsSuccess} solution${solutionsSuccess > 1 ? 's' : ''}`);
        success(`Migration complete! ${parts.join(', ')} migrated.`);
      }
      if (totalErrors > 0) {
        showError(`Some items failed to migrate. Check console for details.`);
      }
      if (totalSuccess === 0 && totalErrors === 0) {
        success('All static data already exists in database.');
      }
      
      // Refresh stats
      const fetchStats = async () => {
        try {
          const [advisors, team, projects, solutions] = await Promise.all([
            adminAdvisorsAPI.getAll().catch(() => []),
            adminTeamAPI.getAll().catch(() => []),
            adminProjectsAPI.getAll().catch(() => []),
            adminSolutionsAPI.getAll().catch(() => []),
          ]);
          setStats(prev => ({
            ...prev,
            advisors: Array.isArray(advisors) ? advisors.length : 0,
            team: Array.isArray(team) ? team.length : 0,
            projects: Array.isArray(projects) ? projects.length : 0,
            solutions: Array.isArray(solutions) ? solutions.length : 0,
          }));
        } catch (error) {
          console.error('Error refreshing stats:', error);
        }
      };
      await fetchStats();
    } catch (error) {
      console.error('Migration error:', error);
      showError('Migration failed. Check console for details.');
    } finally {
      setMigrating(false);
    }
  };

  const statCards = [
    { 
      label: 'Advisors', 
      value: stats.advisors, 
      icon: Users, 
      color: 'bg-blue-500',
      link: '/admin-panel/advisors'
    },
    { 
      label: 'Projects', 
      value: stats.projects, 
      icon: FolderKanban, 
      color: 'bg-green-500',
      link: '/admin-panel/projects'
    },
    { 
      label: 'Team Members', 
      value: stats.team, 
      icon: Users, 
      color: 'bg-purple-500',
      link: '/admin-panel/team'
    },
    { 
      label: 'Newsletters', 
      value: stats.newsletters, 
      icon: Newspaper, 
      color: 'bg-yellow-500',
      link: '/admin-panel/newsletters'
    },
    { 
      label: 'Subscribers', 
      value: stats.subscribers, 
      icon: Mail, 
      color: 'bg-pink-500',
      link: '/admin-panel/subscribers'
    },
    { 
      label: 'Resources', 
      value: stats.resources, 
      icon: FileText, 
      color: 'bg-indigo-500',
      link: '/admin-panel/resources'
    },
    { 
      label: 'Solutions', 
      value: stats.solutions, 
      icon: Wrench, 
      color: 'bg-cyan-500',
      link: '/admin-panel/solutions'
    },
    { 
      label: 'Success Stories', 
      value: stats.successStories, 
      icon: Award, 
      color: 'bg-orange-500',
      link: '/admin-panel/success-stories'
    },
    { 
      label: 'Contact Submissions', 
      value: stats.contactSubmissions, 
      icon: MessageSquare, 
      color: 'bg-teal-500',
      link: '/admin-panel/contact-submissions'
    },
    { 
      label: 'Quote Requests', 
      value: stats.quoteRequests, 
      icon: Receipt, 
      color: 'bg-emerald-500',
      link: '/admin-panel/quote-requests'
    },
    { 
      label: 'Chat Messages', 
      value: stats.chatMessages, 
      icon: MessageSquare, 
      color: 'bg-blue-600',
      link: '/admin-panel/chat-messages'
    },
    { 
      label: 'Total Page Views', 
      value: stats.totalViews, 
      icon: Eye, 
      color: 'bg-indigo-600',
      link: '/admin-panel/visitor-analytics'
    },
    { 
      label: 'Unique Visitors', 
      value: stats.uniqueVisitors, 
      icon: BarChart3, 
      color: 'bg-teal-600',
      link: '/admin-panel/visitor-analytics'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01DC98]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0C1F5E] mb-2 openSans">Dashboard</h1>
        <p className="text-gray-700 poppins">Welcome to the EarthSaathi Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={stat.link}
                className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1 poppins font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#0C1F5E] openSans">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-lg shadow-md`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-[#01DC98] font-medium poppins">
                  <Eye size={16} className="mr-1" />
                  <span>View Details</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Migration Notice */}
      {(stats.team === 0 || stats.advisors === 0 || stats.projects === 0 || stats.solutions === 0) && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Database className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2 openSans">Migrate Static Data</h3>
                <p className="text-blue-700 text-sm poppins mb-4">
                  Add static team members and advisors to the database for easier management. This will prevent duplicate entries when editing.
                </p>
                <button
                  onClick={handleMigrateStaticData}
                  disabled={migrating}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed poppins"
                >
                  {migrating ? 'Migrating...' : 'Migrate Static Data to Database'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#0C1F5E] mb-4 openSans">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin-panel/advisors?new=true"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#01DC98] hover:bg-[#01DC98]/10 transition-all text-center group"
          >
            <Users className="mx-auto mb-2 text-gray-500 group-hover:text-[#01DC98] transition-colors" size={32} />
            <p className="font-medium text-gray-800 group-hover:text-[#0C1F5E] poppins">Add New Advisor</p>
          </Link>
          <Link
            to="/admin-panel/projects?new=true"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#01DC98] hover:bg-[#01DC98]/10 transition-all text-center group"
          >
            <FolderKanban className="mx-auto mb-2 text-gray-500 group-hover:text-[#01DC98] transition-colors" size={32} />
            <p className="font-medium text-gray-800 group-hover:text-[#0C1F5E] poppins">Add New Project</p>
          </Link>
          <Link
            to="/admin-panel/newsletters?new=true"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#01DC98] hover:bg-[#01DC98]/10 transition-all text-center group"
          >
            <Newspaper className="mx-auto mb-2 text-gray-500 group-hover:text-[#01DC98] transition-colors" size={32} />
            <p className="font-medium text-gray-800 group-hover:text-[#0C1F5E] poppins">Create Newsletter</p>
          </Link>
          <Link
            to="/admin-panel/team?new=true"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#01DC98] hover:bg-[#01DC98]/10 transition-all text-center group"
          >
            <Users className="mx-auto mb-2 text-gray-500 group-hover:text-[#01DC98] transition-colors" size={32} />
            <p className="font-medium text-gray-800 group-hover:text-[#0C1F5E] poppins">Add Team Member</p>
          </Link>
          <Link
            to="/admin-panel/solutions?new=true"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#01DC98] hover:bg-[#01DC98]/10 transition-all text-center group"
          >
            <Wrench className="mx-auto mb-2 text-gray-500 group-hover:text-[#01DC98] transition-colors" size={32} />
            <p className="font-medium text-gray-800 group-hover:text-[#0C1F5E] poppins">Add Solution</p>
          </Link>
          <Link
            to="/admin-panel/success-stories?new=true"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#01DC98] hover:bg-[#01DC98]/10 transition-all text-center group"
          >
            <Award className="mx-auto mb-2 text-gray-500 group-hover:text-[#01DC98] transition-colors" size={32} />
            <p className="font-medium text-gray-800 group-hover:text-[#0C1F5E] poppins">Add Success Story</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

