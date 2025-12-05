const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 200));
      throw new Error(`Server returned non-JSON response. Status: ${response.status}. Make sure the backend server is running on ${API_BASE_URL}`);
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: `HTTP ${response.status}: ${response.statusText}` }));
      throw new Error(error.error || error.message || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Provide more helpful error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.name === 'TypeError') {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running on port 5000.`);
    }
    throw error;
  }
};

// Projects API
export const projectsAPI = {
  getAll: () => apiCall('/projects'),
  getById: (id) => apiCall(`/projects/${id}`),
};

// Newsletters API
export const newslettersAPI = {
  getAll: () => apiCall('/newsletters'),
  getPublished: () => apiCall('/newsletters/published/all'),
  getById: (id) => apiCall(`/newsletters/${id}`),
};

// Newsletter Subscribers API
export const newsletterSubscribersAPI = {
  subscribe: (data) => apiCall('/newsletter-subscribers/subscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  unsubscribe: (data) => apiCall('/newsletter-subscribers/unsubscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Advisors API
export const advisorsAPI = {
  getAll: () => apiCall('/advisors'),
  getById: (id) => apiCall(`/advisors/${id}`),
};

// Team API
export const teamAPI = {
  getAll: () => apiCall('/team'),
  getById: (id) => apiCall(`/team/${id}`),
};

// Resources API
export const resourcesAPI = {
  getAll: () => apiCall('/resources'),
  getById: (id) => apiCall(`/resources/${id}`),
  incrementDownload: (id) => apiCall(`/resources/${id}/download`, {
    method: 'PATCH',
  }),
};

export default {
  projects: projectsAPI,
  newsletters: newslettersAPI,
  advisors: advisorsAPI,
  team: teamAPI,
  resources: resourcesAPI,
};

