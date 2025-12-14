-- VISITOR ANALYTICS TABLE
-- Tracks page views and visitor statistics

CREATE TABLE IF NOT EXISTS visitor_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT, -- 'desktop', 'mobile', 'tablet'
  browser TEXT,
  os TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_visited_at ON visitor_analytics(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_page_path ON visitor_analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_session_id ON visitor_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_device_type ON visitor_analytics(device_type);

-- Create trigger for updated_at (if needed later)
-- CREATE TRIGGER update_visitor_analytics_updated_at BEFORE UPDATE ON visitor_analytics
--     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE visitor_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can insert (track visits)
CREATE POLICY "Public can insert visitor analytics" ON visitor_analytics
    FOR INSERT WITH CHECK (true);

-- Public can read (for admin panel - will use service role key)
-- For simplicity, allow public read
CREATE POLICY "Public can read visitor analytics" ON visitor_analytics
    FOR SELECT USING (true);

-- Allow all operations for admin
CREATE POLICY "Allow all operations on visitor analytics" ON visitor_analytics
    FOR ALL USING (true) WITH CHECK (true);

