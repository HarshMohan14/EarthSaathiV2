// Visitor Tracking Utility
// Tracks page views and visitor statistics

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
};

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const getBrowser = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Unknown';
};

const getOS = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
};

export const trackPageView = async (pagePath) => {
  try {
    const USE_SUPABASE = !!import.meta.env.VITE_SUPABASE_URL;
    
    if (!USE_SUPABASE) {
      // If Supabase not configured, just log locally
      console.log('Page view tracked:', pagePath);
      return;
    }

    const { supabase } = await import('./supabase');
    
    if (!supabase) {
      console.warn('Supabase not configured for visitor tracking');
      return;
    }

    const sessionId = getSessionId();
    const deviceType = getDeviceType();
    const browser = getBrowser();
    const os = getOS();

    const analyticsData = {
      session_id: sessionId,
      page_path: pagePath,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      device_type: deviceType,
      browser: browser,
      os: os,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      visited_at: new Date().toISOString(),
    };

    // Insert into Supabase
    const { error } = await supabase
      .from('visitor_analytics')
      .insert([analyticsData]);

    if (error) {
      console.error('Error tracking page view:', error);
    }
  } catch (error) {
    console.error('Error in visitor tracking:', error);
    // Fail silently - don't break the app if tracking fails
  }
};

// Track unique visitors (based on session)
export const getUniqueVisitors = async (startDate, endDate) => {
  try {
    const { supabase } = await import('./supabase');
    if (!supabase) return 0;

    let query = supabase
      .from('visitor_analytics')
      .select('session_id', { count: 'exact', head: true });

    if (startDate) {
      query = query.gte('visited_at', startDate);
    }
    if (endDate) {
      query = query.lte('visited_at', endDate);
    }

    const { count, error } = await query;

    if (error) {
      console.error('Error getting unique visitors:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in getUniqueVisitors:', error);
    return 0;
  }
};

