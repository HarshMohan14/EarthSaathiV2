-- Create Supabase Storage Bucket for Chat Attachments
-- Run this in Supabase SQL Editor

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-files', 'chat-files', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for public access (for downloads)
-- Allow public to read files
CREATE POLICY "Public can read chat files" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'chat-files');

-- Allow public to upload files (for chat messages)
CREATE POLICY "Public can upload chat files" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'chat-files');

-- Allow public to delete files (optional - for cleanup)
-- CREATE POLICY "Public can delete chat files" ON storage.objects
--   FOR DELETE
--   USING (bucket_id = 'chat-files');

