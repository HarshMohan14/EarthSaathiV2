import { supabase, supabaseAdmin, getTableName, handleSupabaseError } from './supabase';

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return supabase !== null && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
};

// Convert Supabase response to match expected format
const formatResponse = (data, isArray = false) => {
  if (isArray) {
    return data.map(item => {
      const processed = {
        ...item,
        _id: item.id, // Convert id to _id for compatibility
        imageUrl: item.image_url,
        linkUrl: item.link_url,
        imagePosition: item.image_position,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      };
      // Parse JSONB fields
      if (item.points && typeof item.points === 'string') {
        try {
          processed.points = JSON.parse(item.points);
        } catch (e) {
          processed.points = [];
        }
      }
      if (item.sections && typeof item.sections === 'string') {
        try {
          processed.sections = JSON.parse(item.sections);
        } catch (e) {
          processed.sections = [];
        }
      }
      return processed;
    });
  }
  const processed = {
    ...data,
    _id: data.id,
    imageUrl: data.image_url,
    linkUrl: data.link_url,
    imagePosition: data.image_position,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
  // Parse JSONB fields
  if (data.points && typeof data.points === 'string') {
    try {
      processed.points = JSON.parse(data.points);
    } catch (e) {
      processed.points = [];
    }
  }
  if (data.sections && typeof data.sections === 'string') {
    try {
      processed.sections = JSON.parse(data.sections);
    } catch (e) {
      processed.sections = [];
    }
  }
  return processed;
};

// Convert request data to Supabase format
const formatRequest = (data) => {
  const formatted = { ...data };
  
  // Convert _id to id if present
  if (formatted._id) {
    formatted.id = formatted._id;
    delete formatted._id;
  }
  
  // Convert imageUrl to image_url
  if (formatted.imageUrl !== undefined) {
    formatted.image_url = formatted.imageUrl;
    delete formatted.imageUrl;
  }
  
  // Convert linkUrl to link_url
  if (formatted.linkUrl !== undefined) {
    formatted.link_url = formatted.linkUrl;
    delete formatted.linkUrl;
  }
  
  // Convert imagePosition to image_position
  if (formatted.imagePosition !== undefined) {
    formatted.image_position = formatted.imagePosition;
    delete formatted.imagePosition;
  }
  
  // Convert sections and points to JSON strings if they're arrays/objects
  if (formatted.sections && (Array.isArray(formatted.sections) || typeof formatted.sections === 'object')) {
    formatted.sections = JSON.stringify(formatted.sections);
  }
  if (formatted.points && (Array.isArray(formatted.points) || typeof formatted.points === 'object')) {
    formatted.points = JSON.stringify(formatted.points);
  }
  
  // Remove createdAt/updatedAt as they're auto-managed
  delete formatted.createdAt;
  delete formatted.updatedAt;
  
  return formatted;
};

// Generic CRUD operations using Supabase
export const createSupabaseAPI = (tableName) => ({
  getAll: async () => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase is not configured. Please check your .env file.');
    }
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false });
    
    handleSupabaseError(error);
    return formatResponse(data || [], true);
  },

  getById: async (id) => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase is not configured.');
    }
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single();
    
    handleSupabaseError(error);
    return formatResponse(data);
  },

  create: async (itemData) => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase is not configured.');
    }
    
    const formatted = formatRequest(itemData);
    const { data, error } = await supabase
      .from(tableName)
      .insert([formatted])
      .select()
      .single();
    
    handleSupabaseError(error);
    return formatResponse(data);
  },

  update: async (id, itemData) => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase is not configured.');
    }
    
    const formatted = formatRequest(itemData);
    delete formatted.id; // Don't update the ID
    
    const { data, error } = await supabase
      .from(tableName)
      .update(formatted)
      .eq('id', id)
      .select()
      .single();
    
    handleSupabaseError(error);
    return formatResponse(data);
  },

  delete: async (id) => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase is not configured.');
    }
    
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    handleSupabaseError(error);
    return { success: true };
  },
});

// Advisors API
export const supabaseAdvisorsAPI = createSupabaseAPI('advisors');

// Projects API
export const supabaseProjectsAPI = createSupabaseAPI('projects');

// Team API
export const supabaseTeamAPI = createSupabaseAPI('team');

// Newsletters API
export const supabaseNewslettersAPI = {
  ...createSupabaseAPI('newsletters'),
  
  publish: async (id) => {
    const { data, error } = await supabase
      .from('newsletters')
      .update({ published: true, published_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    handleSupabaseError(error);
    return formatResponse(data);
  },

  unpublish: async (id) => {
    const { data, error } = await supabase
      .from('newsletters')
      .update({ published: false })
      .eq('id', id)
      .select()
      .single();
    
    handleSupabaseError(error);
    return formatResponse(data);
  },

  getPublished: async () => {
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });
    
    handleSupabaseError(error);
    return formatResponse(data, true);
  },
};

// Newsletter Subscribers API
export const supabaseSubscribersAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('active', true)
      .order('subscribed_at', { ascending: false });
    
    handleSupabaseError(error);
    return data.map(item => ({
      ...item,
      _id: item.id,
      email: item.email,
      createdAt: item.subscribed_at,
    }));
  },

  subscribe: async (emailData) => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase is not configured.');
    }
    
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .upsert([
        {
          email: emailData.email,
          active: true,
          unsubscribed_at: null,
        }
      ], {
        onConflict: 'email',
      })
      .select()
      .single();
    
    // Handle duplicate email error gracefully
    if (error) {
      if (error.code === '23505' || error.message.includes('duplicate')) {
        // Email already exists - return success
        return {
          success: true,
          message: 'You are already subscribed!',
          data: null,
        };
      }
      // For RLS errors, provide helpful message
      if (error.code === '42501') {
        throw new Error('Please run the RLS fix SQL in Supabase. See supabase/FIX_NEWSLETTER_RLS.sql');
      }
      handleSupabaseError(error);
    }
    
    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: data ? formatResponse(data) : null,
    };
  },

  unsubscribe: async (emailData) => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({
        active: false,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', emailData.email)
      .select()
      .single();
    
    handleSupabaseError(error);
    return {
      success: true,
      message: 'Successfully unsubscribed',
    };
  },

  delete: async (id) => {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id);
    
    handleSupabaseError(error);
    return { success: true };
  },
};

// Resources API
export const supabaseResourcesAPI = {
  ...createSupabaseAPI('resources'),
  
  incrementDownload: async (id) => {
    // Get current count
    const { data: resource } = await supabase
      .from('resources')
      .select('download_count')
      .eq('id', id)
      .single();
    
    // Increment
    const { data, error } = await supabase
      .from('resources')
      .update({ download_count: (resource?.download_count || 0) + 1 })
      .eq('id', id)
      .select()
      .single();
    
    handleSupabaseError(error);
    return formatResponse(data);
  },
};

// Success Stories API
export const supabaseSuccessAPI = createSupabaseAPI('success_stories');

// Solutions API
export const supabaseSolutionsAPI = createSupabaseAPI('solutions');

// Contact Submissions API
export const supabaseContactAPI = {
  getAll: async () => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured. Cannot fetch contact submissions.');
      return [];
    }
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    handleSupabaseError(error);
    return formatResponse(data, true);
  },

  getById: async (id) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured. Cannot fetch contact submission.');
      return null;
    }
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', id)
      .single();
    handleSupabaseError(error);
    return formatResponse(data);
  },

  submit: async (submission) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }
    const formattedSubmission = {
      name: submission.name,
      email: submission.email,
      message: submission.message,
      status: 'new',
      submission_type: submission.submission_type || 'contact',
      phone: submission.phone || null,
      company: submission.company || null,
      service: submission.service || null,
    };
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([formattedSubmission])
      .select();
    handleSupabaseError(error);
    return {
      success: true,
      message: submission.submission_type === 'quote_request' 
        ? 'Quote request received successfully!'
        : 'Contact submission received successfully!',
      data: formatResponse(data[0]),
    };
  },

  updateStatus: async (id, status) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
      .select();
    handleSupabaseError(error);
    return formatResponse(data[0]);
  },

  remove: async (id) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured. Cannot delete contact submission.');
    }
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);
    handleSupabaseError(error);
    return { success: true };
  },
};

// Chat Messages API
export const supabaseChatAPI = {
  getAll: async () => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: false });
    handleSupabaseError(error);
    return formatResponse(data, true);
  },

  getById: async (id) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('id', id)
      .single();
    handleSupabaseError(error);
    return formatResponse(data);
  },

  create: async (messageData) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        message: messageData.message,
        sender_name: messageData.sender_name || null,
        sender_email: messageData.sender_email || null,
        sender_type: messageData.sender_type || 'user',
        status: messageData.status || 'new',
        session_id: messageData.session_id || null,
        attachments: messageData.attachments || [],
      }])
      .select()
      .single();
    handleSupabaseError(error);
    return formatResponse(data);
  },

  updateStatus: async (id, status) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }
    const { data, error } = await supabase
      .from('chat_messages')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    handleSupabaseError(error);
    return formatResponse(data);
  },

  delete: async (id) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('id', id);
    handleSupabaseError(error);
    return { success: true };
  },
};

// Visitor Analytics API
export const supabaseVisitorAnalyticsAPI = {
  getAll: async (startDate, endDate) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }
    let query = supabase
      .from('visitor_analytics')
      .select('*')
      .order('visited_at', { ascending: false });

    if (startDate) {
      query = query.gte('visited_at', startDate);
    }
    if (endDate) {
      query = query.lte('visited_at', endDate);
    }

    const { data, error } = await query;
    handleSupabaseError(error);
    return formatResponse(data, true);
  },

  getStats: async (startDate, endDate) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }

    // Format dates properly for PostgreSQL
    const formatDateForQuery = (dateStr) => {
      if (!dateStr || dateStr === '') return null;
      // If it's just a date (YYYY-MM-DD), return as is (we'll add time later)
      if (dateStr.length === 10) {
        return dateStr;
      }
      return dateStr;
    };

    const start = formatDateForQuery(startDate);
    const end = formatDateForQuery(endDate);

    // Get total page views
    let viewsQuery = supabase
      .from('visitor_analytics')
      .select('id', { count: 'exact', head: true });

    // Get unique visitors - fetch all session_ids and count distinct
    let uniqueQuery = supabase
      .from('visitor_analytics')
      .select('session_id');

    if (start) {
      // Add time to start date to include the entire day
      const startDateTime = `${start}T00:00:00.000Z`;
      viewsQuery = viewsQuery.gte('visited_at', startDateTime);
      uniqueQuery = uniqueQuery.gte('visited_at', startDateTime);
    }
    if (end) {
      // Add time to end date to include the entire day
      const endDateTime = `${end}T23:59:59.999Z`;
      viewsQuery = viewsQuery.lte('visited_at', endDateTime);
      uniqueQuery = uniqueQuery.lte('visited_at', endDateTime);
    }

    const [viewsResult, uniqueResult] = await Promise.all([
      viewsQuery,
      uniqueQuery
    ]);

    handleSupabaseError(viewsResult.error);
    handleSupabaseError(uniqueResult.error);

    const totalViews = viewsResult.count || 0;
    
    // Count unique session_ids
    const sessionIds = (uniqueResult.data || []).map(v => v.session_id).filter(Boolean);
    const uniqueSessions = new Set(sessionIds);
    const uniqueVisitors = uniqueSessions.size;

    // Get page views by path
    let pagesQuery = supabase
      .from('visitor_analytics')
      .select('page_path');

    if (start) {
      const startDateTime = `${start}T00:00:00.000Z`;
      pagesQuery = pagesQuery.gte('visited_at', startDateTime);
    }
    if (end) {
      const endDateTime = `${end}T23:59:59.999Z`;
      pagesQuery = pagesQuery.lte('visited_at', endDateTime);
    }

    const { data: pagesData, error: pagesError } = await pagesQuery;
    handleSupabaseError(pagesError);

    const pageViews = {};
    (pagesData || []).forEach(v => {
      const path = v.page_path || '/';
      pageViews[path] = (pageViews[path] || 0) + 1;
    });

    // Get device type stats
    let devicesQuery = supabase
      .from('visitor_analytics')
      .select('device_type');

    if (start) {
      const startDateTime = `${start}T00:00:00.000Z`;
      devicesQuery = devicesQuery.gte('visited_at', startDateTime);
    }
    if (end) {
      const endDateTime = `${end}T23:59:59.999Z`;
      devicesQuery = devicesQuery.lte('visited_at', endDateTime);
    }

    const { data: devicesData, error: devicesError } = await devicesQuery;
    handleSupabaseError(devicesError);

    const deviceStats = {};
    (devicesData || []).forEach(v => {
      const device = v.device_type || 'unknown';
      deviceStats[device] = (deviceStats[device] || 0) + 1;
    });

    // Return stats object directly (not formatted)
    return {
      totalViews: Number(totalViews) || 0,
      uniqueVisitors: Number(uniqueVisitors) || 0,
      pageViews: pageViews || {},
      deviceStats: deviceStats || {},
    };
  },

  getRecent: async (limit = 50) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }
    const { data, error } = await supabase
      .from('visitor_analytics')
      .select('*')
      .order('visited_at', { ascending: false })
      .limit(limit);
    
    handleSupabaseError(error);
    return formatResponse(data, true);
  },
};

export default {
  advisors: supabaseAdvisorsAPI,
  projects: supabaseProjectsAPI,
  team: supabaseTeamAPI,
  newsletters: supabaseNewslettersAPI,
  subscribers: supabaseSubscribersAPI,
  resources: supabaseResourcesAPI,
  success: supabaseSuccessAPI,
  solutions: supabaseSolutionsAPI,
  contact: supabaseContactAPI,
  chat: supabaseChatAPI,
  visitorAnalytics: supabaseVisitorAnalyticsAPI,
};

