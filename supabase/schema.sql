-- EarthSaathi Supabase Database Schema
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ADVISORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS advisors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT,
  sections JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TEAM TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS team (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  description TEXT,
  quote TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- NEWSLETTERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS newsletters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT TRUE
);

-- ============================================
-- RESOURCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_name TEXT,
  file_size BIGINT,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ADMIN USERS TABLE (for custom admin auth)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- FUNCTIONS FOR UPDATED_AT TIMESTAMP
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_advisors_updated_at BEFORE UPDATE ON advisors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_updated_at BEFORE UPDATE ON team
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletters_updated_at BEFORE UPDATE ON newsletters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE advisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access (for website visitors)
CREATE POLICY "Public read access" ON advisors
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON team
  FOR SELECT USING (true);

CREATE POLICY "Public read published newsletters" ON newsletters
  FOR SELECT USING (published = true);

CREATE POLICY "Public read access" ON resources
  FOR SELECT USING (true);

-- Admin full access (requires authentication)
-- Note: You'll need to create a custom auth function or use Supabase Auth
-- For now, we'll use service_role key for admin operations

-- Allow public to subscribe to newsletter
DROP POLICY IF EXISTS "Public can subscribe" ON newsletter_subscribers;
CREATE POLICY "Allow public subscription" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Allow public to read subscribers (for admin panel)
CREATE POLICY "Public can read subscribers" ON newsletter_subscribers
  FOR SELECT
  USING (true);

-- Allow updates (for unsubscribing)
CREATE POLICY "Allow unsubscribe" ON newsletter_subscribers
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_newsletters_published ON newsletters(published);
CREATE INDEX IF NOT EXISTS idx_newsletters_created_at ON newsletters(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_active ON newsletter_subscribers(active);
CREATE INDEX IF NOT EXISTS idx_resources_download_count ON resources(download_count DESC);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================
-- Uncomment to insert sample data

/*
INSERT INTO advisors (name, title, description, image_url) VALUES
('Prof. Wahid A. Kamalian', 'Senior Advisor', 'Expert in sustainable energy technologies', '/Wahid A. Kamalian.jpg'),
('Professor', 'Technical Advisor', 'Renowned academic and researcher', '/Professor.jpg');

INSERT INTO projects (title, subtitle, image_url, sections) VALUES
('NS-Max CNS Biogas Technology', 'Revolutionary CO2 scrubbing solution', '/Project1.jpg', 
 '[{"title": "Overview", "content": "NS-Max CNS is our cutting-edge biogas technology"}, {"title": "Key Features", "content": ["Enhanced biogas production", "Advanced CO2 scrubbing"]}]'::jsonb);
*/

