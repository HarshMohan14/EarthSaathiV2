-- Fix RLS policies for visitor_analytics table
-- This enables full CRUD operations for visitor analytics

-- Drop existing policies
DROP POLICY IF EXISTS "Public can insert visitor analytics" ON visitor_analytics;
DROP POLICY IF EXISTS "Public can read visitor analytics" ON visitor_analytics;
DROP POLICY IF EXISTS "Allow all operations on visitor analytics" ON visitor_analytics;

-- Create new policies for full access
-- Public can insert (track visits)
CREATE POLICY "Public can insert visitor analytics" ON visitor_analytics
    FOR INSERT WITH CHECK (true);

-- Public can read (for admin panel access)
CREATE POLICY "Public can read visitor analytics" ON visitor_analytics
    FOR SELECT USING (true);

-- Allow all operations (for admin panel CRUD)
CREATE POLICY "Allow all operations on visitor analytics" ON visitor_analytics
    FOR ALL USING (true) WITH CHECK (true);

