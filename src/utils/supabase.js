import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://siwcabninyvjqwxgqdhp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

// Public client (for regular users)
// Only create client if we have the URL and key
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Admin client (for admin operations - uses service role key)
// Only use this on the server side or with proper security
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  if (error) {
    console.error('Supabase Error:', error);
    throw new Error(error.message || 'Database operation failed');
  }
};

// Helper function to get table name from endpoint
export const getTableName = (endpoint) => {
  const mapping = {
    'advisors': 'advisors',
    'projects': 'projects',
    'team': 'team',
    'newsletters': 'newsletters',
    'newsletter-subscribers': 'newsletter_subscribers',
    'resources': 'resources',
  };
  
  // Extract table name from endpoint like '/admin/advisors' or '/advisors'
  const parts = endpoint.split('/').filter(Boolean);
  const lastPart = parts[parts.length - 1];
  return mapping[lastPart] || lastPart;
};

export default supabase;

