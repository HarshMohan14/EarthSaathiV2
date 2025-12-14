-- ============================================
-- FIX RLS FOR CONTACT SUBMISSIONS TABLE
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can submit contact forms" ON contact_submissions;
DROP POLICY IF EXISTS "Public can read own submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow all operations on contact_submissions" ON contact_submissions;

-- Allow public to insert (submit contact forms)
CREATE POLICY "Public can submit contact forms" ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Allow public to read all submissions (for admin panel via service role key)
-- Note: Admin panel uses service role key which bypasses RLS
-- But we also allow public read for flexibility
CREATE POLICY "Public can read contact submissions" ON contact_submissions
  FOR SELECT
  USING (true);

-- Allow public to update (for status changes)
CREATE POLICY "Public can update contact submissions" ON contact_submissions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow public to delete (for admin panel)
CREATE POLICY "Public can delete contact submissions" ON contact_submissions
  FOR DELETE
  USING (true);

