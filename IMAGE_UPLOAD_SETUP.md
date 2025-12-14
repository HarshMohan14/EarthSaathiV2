# Image Upload Setup Guide

## Overview

The admin panel now supports **both file upload and URL input** for images across all forms:
- ✅ Advisors
- ✅ Team Members
- ✅ Projects
- ✅ Success Stories
- ✅ Solutions
- ✅ Newsletters

## Features

### 1. **Dual Upload Methods**
   - **Upload File**: Upload images directly from your computer
   - **Use URL**: Enter an image URL (existing functionality)

### 2. **Image Preview**
   - Real-time preview of uploaded/entered images
   - Remove button to clear the image

### 3. **Automatic Storage**
   - Uploaded files are automatically saved to Supabase Storage
   - Public URLs are generated and stored in the database

## Setup Instructions

### Step 1: Create Supabase Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Name: `admin-images`
5. Public bucket: **Yes** (checked)
6. Click **"Create bucket"**

**OR** run the SQL script:

1. Go to **SQL Editor** in Supabase Dashboard
2. Open `supabase/CREATE_ADMIN_IMAGES_BUCKET.sql`
3. Copy and paste the SQL
4. Click **"Run"**

### Step 2: Verify Storage Policies

The SQL script automatically creates these policies:
- ✅ Public can read images
- ✅ Public can upload images
- ✅ Public can update images
- ✅ Public can delete images

### Step 3: Test Image Upload

1. Go to any admin form (Advisors, Team, Projects, etc.)
2. Click **"Upload File"** tab
3. Select an image from your computer
4. Wait for upload to complete
5. Image preview should appear
6. Save the form

## How It Works

### Upload Flow:
1. User selects an image file
2. File is validated (type and size - max 5MB)
3. File is uploaded to Supabase Storage (`admin-images` bucket)
4. Public URL is generated
5. URL is stored in the database

### URL Flow:
1. User enters an image URL
2. URL is validated
3. Preview is shown
4. URL is stored in the database

## File Size Limits

- **Maximum file size**: 5MB
- **Supported formats**: PNG, JPG, GIF, WebP, SVG

## Troubleshooting

### Issue: "Bucket not found" error
**Solution**: 
1. Create the `admin-images` bucket in Supabase Storage
2. Or run the SQL script: `supabase/CREATE_ADMIN_IMAGES_BUCKET.sql`

### Issue: Upload fails silently
**Solution**:
1. Check browser console for errors
2. Verify Supabase Storage is configured
3. Check storage policies allow public uploads
4. Try using URL method as fallback

### Issue: Images not displaying
**Solution**:
1. Check if the bucket is set to "Public"
2. Verify storage policies allow public read access
3. Check the image URL in the database

## Fallback Behavior

If Supabase Storage is not configured:
- The component will use a blob URL (local preview)
- A warning message will be shown
- You can still use the URL method

## Storage Usage

- **Free Tier**: 1GB storage included
- **File Organization**: Files are stored in `admin-images/{timestamp}_{random}.{ext}`
- **Automatic Cleanup**: Consider implementing cleanup for deleted items

## Best Practices

1. **Optimize Images**: Compress images before uploading to save storage
2. **Use Descriptive URLs**: When using URL method, use descriptive paths
3. **Regular Cleanup**: Periodically clean up unused images from storage
4. **Monitor Usage**: Check Supabase dashboard for storage usage

---

**Note**: The image upload component is reusable and can be used in any form that needs image input.

