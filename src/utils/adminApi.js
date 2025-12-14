import {
  supabaseAdvisorsAPI,
  supabaseProjectsAPI,
  supabaseTeamAPI,
  supabaseNewslettersAPI,
  supabaseSubscribersAPI,
  supabaseResourcesAPI,
  supabaseSuccessAPI,
  supabaseSolutionsAPI,
  supabaseContactAPI,
  supabaseChatAPI,
  supabaseVisitorAnalyticsAPI
} from './supabaseApi';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const USE_SUPABASE = !!import.meta.env.VITE_SUPABASE_URL;

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('admin_token');
};

// Generic admin API call function (fallback for non-Supabase)
const adminApiCall = async (endpoint, options = {}) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized - clear auth and redirect to login
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
        window.location.href = '/admin-panel/login';
        throw new Error('Unauthorized. Please login again.');
      }
      const error = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
      throw new Error(error.error || error.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Admin API Error:', error);
    throw error;
  }
};

// Admin Advisors API
export const adminAdvisorsAPI = USE_SUPABASE ? supabaseAdvisorsAPI : {
  getAll: () => adminApiCall('/admin/advisors'),
  getById: (id) => adminApiCall(`/admin/advisors/${id}`),
  create: (data) => adminApiCall('/admin/advisors', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => adminApiCall(`/admin/advisors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => adminApiCall(`/admin/advisors/${id}`, {
    method: 'DELETE',
  }),
};

// Admin Projects API
export const adminProjectsAPI = USE_SUPABASE ? supabaseProjectsAPI : {
  getAll: () => adminApiCall('/admin/projects'),
  getById: (id) => adminApiCall(`/admin/projects/${id}`),
  create: (data) => adminApiCall('/admin/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => adminApiCall(`/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => adminApiCall(`/admin/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Admin Team API
export const adminTeamAPI = USE_SUPABASE ? supabaseTeamAPI : {
  getAll: () => adminApiCall('/admin/team'),
  getById: (id) => adminApiCall(`/admin/team/${id}`),
  create: (data) => adminApiCall('/admin/team', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => adminApiCall(`/admin/team/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => adminApiCall(`/admin/team/${id}`, {
    method: 'DELETE',
  }),
};

// Admin Newsletters API
export const adminNewslettersAPI = USE_SUPABASE ? supabaseNewslettersAPI : {
  getAll: () => adminApiCall('/admin/newsletters'),
  getById: (id) => adminApiCall(`/admin/newsletters/${id}`),
  create: (data) => adminApiCall('/admin/newsletters', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => adminApiCall(`/admin/newsletters/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => adminApiCall(`/admin/newsletters/${id}`, {
    method: 'DELETE',
  }),
  publish: (id) => adminApiCall(`/admin/newsletters/${id}/publish`, {
    method: 'PATCH',
  }),
  unpublish: (id) => adminApiCall(`/admin/newsletters/${id}/unpublish`, {
    method: 'PATCH',
  }),
};

// Admin Newsletter Subscribers API
export const adminSubscribersAPI = USE_SUPABASE ? supabaseSubscribersAPI : {
  getAll: () => adminApiCall('/admin/newsletter-subscribers'),
  getById: (id) => adminApiCall(`/admin/newsletter-subscribers/${id}`),
  delete: (id) => adminApiCall(`/admin/newsletter-subscribers/${id}`, {
    method: 'DELETE',
  }),
};

// Admin Resources API
export const adminResourcesAPI = USE_SUPABASE ? supabaseResourcesAPI : {
  getAll: () => adminApiCall('/admin/resources'),
  getById: (id) => adminApiCall(`/admin/resources/${id}`),
  create: (data) => adminApiCall('/admin/resources', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => adminApiCall(`/admin/resources/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => adminApiCall(`/admin/resources/${id}`, {
    method: 'DELETE',
  }),
};

// Admin Success Stories API
export const adminSuccessAPI = USE_SUPABASE ? supabaseSuccessAPI : {
  getAll: () => adminApiCall('/admin/success-stories'),
  getById: (id) => adminApiCall(`/admin/success-stories/${id}`),
  create: (data) => adminApiCall('/admin/success-stories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => adminApiCall(`/admin/success-stories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => adminApiCall(`/admin/success-stories/${id}`, {
    method: 'DELETE',
  }),
};

// Admin Solutions API
export const adminSolutionsAPI = USE_SUPABASE ? supabaseSolutionsAPI : {
  getAll: () => adminApiCall('/admin/solutions'),
  getById: (id) => adminApiCall(`/admin/solutions/${id}`),
  create: (data) => adminApiCall('/admin/solutions', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => adminApiCall(`/admin/solutions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => adminApiCall(`/admin/solutions/${id}`, {
    method: 'DELETE',
  }),
};

// Admin Contact Submissions API
export const adminContactAPI = USE_SUPABASE ? {
  getAll: () => supabaseContactAPI.getAll(),
  getById: (id) => supabaseContactAPI.getById(id),
  updateStatus: (id, status) => supabaseContactAPI.updateStatus(id, status),
  delete: (id) => supabaseContactAPI.remove(id),
} : {
  getAll: () => adminApiCall('/admin/contact-submissions'),
  getById: (id) => adminApiCall(`/admin/contact-submissions/${id}`),
  updateStatus: (id, status) => adminApiCall(`/admin/contact-submissions/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
  delete: (id) => adminApiCall(`/admin/contact-submissions/${id}`, {
    method: 'DELETE',
  }),
};

// Admin Chat Messages API
export const adminChatAPI = USE_SUPABASE ? supabaseChatAPI : {
  getAll: () => adminApiCall('/admin/chat-messages'),
  getById: (id) => adminApiCall(`/admin/chat-messages/${id}`),
  updateStatus: (id, status) => adminApiCall(`/admin/chat-messages/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
  delete: (id) => adminApiCall(`/admin/chat-messages/${id}`, {
    method: 'DELETE',
  }),
};

// Admin Visitor Analytics API
export const adminVisitorAnalyticsAPI = USE_SUPABASE ? supabaseVisitorAnalyticsAPI : {
  getAll: (startDate, endDate) => adminApiCall(`/admin/visitor-analytics?startDate=${startDate || ''}&endDate=${endDate || ''}`),
  getStats: (startDate, endDate) => adminApiCall(`/admin/visitor-analytics/stats?startDate=${startDate || ''}&endDate=${endDate || ''}`),
  getRecent: (limit) => adminApiCall(`/admin/visitor-analytics/recent?limit=${limit || 50}`),
};

export default {
  advisors: adminAdvisorsAPI,
  projects: adminProjectsAPI,
  team: adminTeamAPI,
  newsletters: adminNewslettersAPI,
  subscribers: adminSubscribersAPI,
  resources: adminResourcesAPI,
  success: adminSuccessAPI,
  solutions: adminSolutionsAPI,
  contact: adminContactAPI,
  chat: adminChatAPI,
  visitorAnalytics: adminVisitorAnalyticsAPI,
};

