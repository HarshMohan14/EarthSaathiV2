-- ============================================
-- SOLUTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS solutions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  image_position TEXT DEFAULT 'left' CHECK (image_position IN ('left', 'right')),
  points JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE TRIGGER update_solutions_updated_at BEFORE UPDATE ON solutions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;

-- Public can read solutions
CREATE POLICY "Public can read solutions" ON solutions
  FOR SELECT
  USING (true);

-- Public can insert (for admin panel)
CREATE POLICY "Public can insert solutions" ON solutions
  FOR INSERT
  WITH CHECK (true);

-- Public can update (for admin panel)
CREATE POLICY "Public can update solutions" ON solutions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Public can delete (for admin panel)
CREATE POLICY "Public can delete solutions" ON solutions
  FOR DELETE
  USING (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_solutions_created_at ON solutions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_solutions_image_position ON solutions(image_position);

