-- Create Supabase Storage Bucket for Admin Images
-- Run this in Supabase SQL Editor

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('admin-images', 'admin-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for public access
-- Allow public to read files
CREATE POLICY "Public can read admin images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'admin-images');

-- Allow public to upload files (for admin panel)
CREATE POLICY "Public can upload admin images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'admin-images');

-- Allow public to update files (for admin panel)
CREATE POLICY "Public can update admin images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'admin-images');

-- Allow public to delete files (for admin panel)
CREATE POLICY "Public can delete admin images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'admin-images');

