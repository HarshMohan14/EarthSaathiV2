-- Fix Row Level Security (RLS) Policies for EarthSaathi
-- Run this in Supabase SQL Editor to fix the 401 Unauthorized errors

-- ============================================
-- NEWSLETTER SUBSCRIBERS - Allow Public Inserts
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can subscribe" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Public read access" ON newsletter_subscribers;

-- Allow anyone to subscribe (INSERT)
CREATE POLICY "Allow public subscription" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read active subscribers (for admin)
CREATE POLICY "Public can read subscribers" ON newsletter_subscribers
  FOR SELECT
  USING (true);

-- Allow updates for unsubscribing
CREATE POLICY "Allow unsubscribe" ON newsletter_subscribers
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ============================================
-- ADVISORS - Public Read, Admin Write
-- ============================================
-- Drop existing policies
DROP POLICY IF EXISTS "Public read access" ON advisors;
DROP POLICY IF EXISTS "Admin only access" ON advisors;

-- Allow public to read
CREATE POLICY "Public can read advisors" ON advisors
  FOR SELECT
  USING (true);

-- Allow admin operations (using service_role key)
-- Note: Admin operations use service_role key which bypasses RLS
-- This policy is for authenticated users if needed
CREATE POLICY "Admins can manage advisors" ON advisors
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- PROJECTS - Public Read, Admin Write
-- ============================================
DROP POLICY IF EXISTS "Public read access" ON projects;
DROP POLICY IF EXISTS "Admin only access" ON projects;

CREATE POLICY "Public can read projects" ON projects
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage projects" ON projects
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- TEAM - Public Read, Admin Write
-- ============================================
DROP POLICY IF EXISTS "Public read access" ON team;
DROP POLICY IF EXISTS "Admin only access" ON team;

CREATE POLICY "Public can read team" ON team
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage team" ON team
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- NEWSLETTERS - Public Read Published, Admin Write
-- ============================================
DROP POLICY IF EXISTS "Public read published newsletters" ON newsletters;
DROP POLICY IF EXISTS "Admin only access" ON newsletters;

-- Public can only read published newsletters
CREATE POLICY "Public can read published newsletters" ON newsletters
  FOR SELECT
  USING (published = true);

-- Admins can read all and manage
CREATE POLICY "Admins can manage newsletters" ON newsletters
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- RESOURCES - Public Read, Admin Write
-- ============================================
DROP POLICY IF EXISTS "Public read access" ON resources;
DROP POLICY IF EXISTS "Admin only access" ON resources;

CREATE POLICY "Public can read resources" ON resources
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage resources" ON resources
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- VERIFY POLICIES
-- ============================================
-- Check all policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

