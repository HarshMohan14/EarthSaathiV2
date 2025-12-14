-- Quick Fix for Newsletter Subscribers RLS Error
-- Copy and paste this into Supabase SQL Editor and run it

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Public can subscribe" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public subscription" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Public can read subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow unsubscribe" ON newsletter_subscribers;

-- Allow anyone to subscribe (INSERT)
CREATE POLICY "Allow public subscription" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Allow reading subscribers (for admin panel)
CREATE POLICY "Public can read subscribers" ON newsletter_subscribers
  FOR SELECT
  USING (true);

-- Allow updates (for unsubscribing)
CREATE POLICY "Allow unsubscribe" ON newsletter_subscribers
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Verify the policy was created
SELECT policyname, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'newsletter_subscribers';

