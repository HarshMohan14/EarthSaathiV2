import { 
  supabaseAdvisorsAPI, 
  supabaseProjectsAPI, 
  supabaseTeamAPI, 
  supabaseNewslettersAPI, 
  supabaseSubscribersAPI, 
  supabaseResourcesAPI,
  supabaseSuccessAPI,
  supabaseSolutionsAPI,
  supabaseContactAPI
} from './supabaseApi';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const USE_SUPABASE = !!import.meta.env.VITE_SUPABASE_URL;

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

// Projects API - Only returns database data (no static data)
export const projectsAPI = USE_SUPABASE ? {
  getAll: async () => {
    try {
      const data = await supabaseProjectsAPI.getAll();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching projects from Supabase:', error);
      return [];
    }
  },
  getById: (id) => {
    return supabaseProjectsAPI.getById(id);
  },
} : {
  getAll: async () => {
    try {
      const data = await apiCall('/projects');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching projects from API:', error);
      return [];
    }
  },
  getById: (id) => {
    return apiCall(`/projects/${id}`);
  },
};

// Newsletters API
export const newslettersAPI = USE_SUPABASE ? {
  getAll: () => supabaseNewslettersAPI.getAll(),
  getPublished: () => supabaseNewslettersAPI.getPublished(),
  getById: (id) => supabaseNewslettersAPI.getById(id),
} : {
  getAll: () => apiCall('/newsletters'),
  getPublished: () => apiCall('/newsletters/published/all'),
  getById: (id) => apiCall(`/newsletters/${id}`),
};

// Newsletter Subscribers API
export const newsletterSubscribersAPI = USE_SUPABASE ? {
  subscribe: (data) => supabaseSubscribersAPI.subscribe(data),
  unsubscribe: (data) => supabaseSubscribersAPI.unsubscribe(data),
} : {
  subscribe: (data) => apiCall('/newsletter-subscribers/subscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  unsubscribe: (data) => apiCall('/newsletter-subscribers/unsubscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Advisors API - Only returns database data (no static data)
export const advisorsAPI = USE_SUPABASE ? {
  getAll: async () => {
    try {
      const data = await supabaseAdvisorsAPI.getAll();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching advisors from Supabase:', error);
      return [];
    }
  },
  getById: (id) => {
    return supabaseAdvisorsAPI.getById(id);
  },
} : {
  getAll: async () => {
    try {
      const data = await apiCall('/advisors');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching advisors from API:', error);
      return [];
    }
  },
  getById: (id) => {
    return apiCall(`/advisors/${id}`);
  },
};

// Team API - Only returns database data (no static data)
export const teamAPI = USE_SUPABASE ? {
  getAll: async () => {
    try {
      const data = await supabaseTeamAPI.getAll();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching team from Supabase:', error);
      return [];
    }
  },
  getById: (id) => {
    return supabaseTeamAPI.getById(id);
  },
} : {
  getAll: async () => {
    try {
      const data = await apiCall('/team');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching team from API:', error);
      return [];
    }
  },
  getById: (id) => {
    return apiCall(`/team/${id}`);
  },
};

// Resources API
export const resourcesAPI = USE_SUPABASE ? {
  getAll: () => supabaseResourcesAPI.getAll(),
  getById: (id) => supabaseResourcesAPI.getById(id),
  incrementDownload: (id) => supabaseResourcesAPI.incrementDownload(id),
} : {
  getAll: () => apiCall('/resources'),
  getById: (id) => apiCall(`/resources/${id}`),
  incrementDownload: (id) => apiCall(`/resources/${id}/download`, {
    method: 'PATCH',
  }),
};

// Success Stories API - Only returns database data (no static data)
export const successAPI = USE_SUPABASE ? {
  getAll: async () => {
    try {
      const data = await supabaseSuccessAPI.getAll();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching success stories from Supabase:', error);
      return [];
    }
  },
  getById: (id) => {
    return supabaseSuccessAPI.getById(id);
  },
} : {
  getAll: async () => {
    try {
      const data = await apiCall('/success-stories');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching success stories from API:', error);
      return [];
    }
  },
  getById: (id) => {
    return apiCall(`/success-stories/${id}`);
  },
};

// Solutions API - Only returns database data (no static data)
export const solutionsAPI = USE_SUPABASE ? {
  getAll: async () => {
    try {
      const data = await supabaseSolutionsAPI.getAll();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching solutions from Supabase:', error);
      return [];
    }
  },
  getById: (id) => {
    return supabaseSolutionsAPI.getById(id);
  },
} : {
  getAll: async () => {
    try {
      const data = await apiCall('/solutions');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching solutions from API:', error);
      return [];
    }
  },
  getById: (id) => {
    return apiCall(`/solutions/${id}`);
  },
};

// Contact Submissions API
export const contactAPI = USE_SUPABASE ? {
  submit: (data) => supabaseContactAPI.submit(data),
} : {
  submit: (data) => apiCall('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export default {
  projects: projectsAPI,
  newsletters: newslettersAPI,
  advisors: advisorsAPI,
  team: teamAPI,
  resources: resourcesAPI,
  success: successAPI,
  solutions: solutionsAPI,
  contact: contactAPI,
};

