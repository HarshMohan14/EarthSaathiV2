-- ============================================
-- COMPLETE CRUD FIX FOR ALL TABLES
-- Copy and paste this ENTIRE file into Supabase SQL Editor
-- This enables Create, Read, Update, Delete on ALL tables
-- ============================================

-- ADVISORS
DROP POLICY IF EXISTS "Public read access" ON advisors;
DROP POLICY IF EXISTS "Admins can manage advisors" ON advisors;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON advisors;
DROP POLICY IF EXISTS "Public can read advisors" ON advisors;
DROP POLICY IF EXISTS "Allow all operations on advisors" ON advisors;

CREATE POLICY "Public can read advisors" ON advisors FOR SELECT USING (true);
CREATE POLICY "Allow all operations on advisors" ON advisors FOR ALL USING (true) WITH CHECK (true);

-- PROJECTS
DROP POLICY IF EXISTS "Public read access" ON projects;
DROP POLICY IF EXISTS "Admins can manage projects" ON projects;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON projects;
DROP POLICY IF EXISTS "Public can read projects" ON projects;
DROP POLICY IF EXISTS "Allow all operations on projects" ON projects;

CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow all operations on projects" ON projects FOR ALL USING (true) WITH CHECK (true);

-- TEAM
DROP POLICY IF EXISTS "Public read access" ON team;
DROP POLICY IF EXISTS "Admins can manage team" ON team;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON team;
DROP POLICY IF EXISTS "Public can read team" ON team;
DROP POLICY IF EXISTS "Allow all operations on team" ON team;

CREATE POLICY "Public can read team" ON team FOR SELECT USING (true);
CREATE POLICY "Allow all operations on team" ON team FOR ALL USING (true) WITH CHECK (true);

-- NEWSLETTERS
DROP POLICY IF EXISTS "Public read published newsletters" ON newsletters;
DROP POLICY IF EXISTS "Admins can manage newsletters" ON newsletters;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON newsletters;
DROP POLICY IF EXISTS "Public can read newsletters" ON newsletters;
DROP POLICY IF EXISTS "Allow all operations on newsletters" ON newsletters;

CREATE POLICY "Public can read newsletters" ON newsletters FOR SELECT USING (true);
CREATE POLICY "Allow all operations on newsletters" ON newsletters FOR ALL USING (true) WITH CHECK (true);

-- NEWSLETTER SUBSCRIBERS
DROP POLICY IF EXISTS "Public can subscribe" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public subscription" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Public can read subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow unsubscribe" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow delete subscribers" ON newsletter_subscribers;

CREATE POLICY "Allow public subscription" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read subscribers" ON newsletter_subscribers FOR SELECT USING (true);
CREATE POLICY "Allow unsubscribe" ON newsletter_subscribers FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow delete subscribers" ON newsletter_subscribers FOR DELETE USING (true);

-- RESOURCES
DROP POLICY IF EXISTS "Public read access" ON resources;
DROP POLICY IF EXISTS "Admins can manage resources" ON resources;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON resources;
DROP POLICY IF EXISTS "Public can read resources" ON resources;
DROP POLICY IF EXISTS "Allow all operations on resources" ON resources;

CREATE POLICY "Public can read resources" ON resources FOR SELECT USING (true);
CREATE POLICY "Allow all operations on resources" ON resources FOR ALL USING (true) WITH CHECK (true);

-- Verify policies were created
SELECT tablename, policyname, cmd FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename;

