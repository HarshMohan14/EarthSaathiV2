-- ============================================
-- SUCCESS STORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  date TEXT,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE TRIGGER update_success_stories_updated_at BEFORE UPDATE ON success_stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

-- Public can read success stories
CREATE POLICY "Public can read success stories" ON success_stories
  FOR SELECT
  USING (true);

-- Public can insert (for admin panel)
CREATE POLICY "Public can insert success stories" ON success_stories
  FOR INSERT
  WITH CHECK (true);

-- Public can update (for admin panel)
CREATE POLICY "Public can update success stories" ON success_stories
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Public can delete (for admin panel)
CREATE POLICY "Public can delete success stories" ON success_stories
  FOR DELETE
  USING (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_success_stories_created_at ON success_stories(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_success_stories_date ON success_stories(date);

