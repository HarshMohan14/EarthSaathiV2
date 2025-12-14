-- Fix RLS policies for chat_messages table
-- This enables full CRUD operations for chat messages

-- Drop existing policies
DROP POLICY IF EXISTS "Public can insert chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Public can read chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Allow all operations on chat messages" ON chat_messages;

-- Create new policies for full access
-- Public can insert (users can send messages)
CREATE POLICY "Public can insert chat messages" ON chat_messages
    FOR INSERT WITH CHECK (true);

-- Public can read (for admin panel access)
CREATE POLICY "Public can read chat messages" ON chat_messages
    FOR SELECT USING (true);

-- Allow all operations (for admin panel CRUD)
CREATE POLICY "Allow all operations on chat messages" ON chat_messages
    FOR ALL USING (true) WITH CHECK (true);

