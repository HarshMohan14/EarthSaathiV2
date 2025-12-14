# Deploying EarthSaathi to GoDaddy with Supabase

This guide will help you deploy your React application to GoDaddy while maintaining the Supabase connection.

## Prerequisites

1. GoDaddy hosting account (cPanel access)
2. Supabase project credentials
3. FTP/SFTP access or File Manager access in cPanel

## Step 1: Build Your React Application

### 1.1 Update Environment Variables for Production

Before building, ensure your `.env` file has the correct Supabase credentials:

```env
VITE_SUPABASE_URL=https://siwcabninyvjqwxgqdhp.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Important:** These environment variables will be embedded in your build. Make sure your Supabase RLS policies are properly configured for public access.

### 1.2 Build the Application

Run the build command in your terminal:

```bash
cd EarthSaathiV2
npm run build
```

This will create a `dist` folder with all the production-ready files.

## Step 2: Prepare Files for Upload

### 2.1 Check Build Output

After building, you should have:
- `dist/index.html` - Main HTML file
- `dist/assets/` - All JavaScript, CSS, and other assets

### 2.2 Verify Build

Test the build locally:

```bash
npm run preview
```

Visit `http://localhost:4173` to ensure everything works correctly.

## Step 3: Upload to GoDaddy

### Option A: Using cPanel File Manager

1. **Log in to GoDaddy cPanel**
   - Go to your GoDaddy account
   - Navigate to cPanel
   - Open "File Manager"

2. **Navigate to Public HTML**
   - Go to `public_html` folder (or your domain's root folder)
   - If you want a subdomain, create a folder like `earthsaathi` or `admin`

3. **Clear Existing Files (if any)**
   - Delete or backup existing files in the target directory
   - **Important:** Keep `.htaccess` if it exists (we'll create one)

4. **Upload Files**
   - Select all files from your `dist` folder
   - Upload them to `public_html` (or your subdomain folder)
   - Ensure `index.html` is in the root of the directory

### Option B: Using FTP/SFTP

1. **Get FTP Credentials**
   - From cPanel, go to "FTP Accounts"
   - Note your FTP host, username, and password

2. **Connect via FTP Client**
   - Use FileZilla, Cyberduck, or any FTP client
   - Connect to your GoDaddy server
   - Navigate to `public_html` (or your domain folder)

3. **Upload Files**
   - Upload all contents from `dist` folder
   - Maintain the folder structure

## Step 4: Configure .htaccess for React Router

Since you're using React Router, you need to configure URL rewriting so all routes work correctly.

### 4.1 Create .htaccess File

Create a file named `.htaccess` in your `dist` folder (or upload it to the root of your public_html):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

### 4.2 Upload .htaccess

- Upload the `.htaccess` file to the same directory as `index.html`
- Ensure it's named exactly `.htaccess` (with the dot at the beginning)

## Step 5: Verify Supabase Connection

### 5.1 Check Supabase RLS Policies

Ensure your Supabase Row Level Security (RLS) policies allow public access where needed:

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Policies
3. Verify that tables have appropriate policies:
   - Public SELECT for reading data
   - Public INSERT for forms (newsletter, contact, chat, etc.)
   - Admin-only UPDATE/DELETE (handled via service role key in admin panel)

### 5.2 Test the Connection

1. Visit your deployed site
2. Open browser DevTools (F12)
3. Check the Console for any Supabase connection errors
4. Test key features:
   - Newsletter subscription
   - Contact form
   - Admin panel login
   - Data fetching

## Step 6: Configure Domain/Subdomain (Optional)

### 6.1 Using Main Domain

If deploying to your main domain:
- Files go directly in `public_html`
- Access via `https://yourdomain.com`

### 6.2 Using Subdomain

If deploying to a subdomain (e.g., `app.yourdomain.com`):

1. **Create Subdomain in cPanel**
   - Go to "Subdomains" in cPanel
   - Create subdomain: `app` (or your preferred name)
   - Point it to `public_html/app` folder

2. **Upload Files**
   - Upload to `public_html/app` folder
   - Include `.htaccess` in that folder

## Step 7: SSL Certificate (HTTPS)

### 7.1 Enable SSL

1. Go to cPanel > SSL/TLS Status
2. Install SSL certificate (Let's Encrypt is free)
3. Force HTTPS redirect (optional but recommended)

### 7.2 Update Supabase Settings

If you switch to HTTPS, ensure:
- Supabase allows your new domain in CORS settings
- Update any hardcoded URLs if necessary

## Step 8: Post-Deployment Checklist

- [ ] Build completed successfully
- [ ] All files uploaded to correct directory
- [ ] `.htaccess` file uploaded and configured
- [ ] `index.html` is in the root directory
- [ ] All routes work (test navigation)
- [ ] Supabase connection works (check browser console)
- [ ] Forms submit correctly (newsletter, contact, chat)
- [ ] Admin panel accessible and functional
- [ ] Images and assets load correctly
- [ ] SSL certificate installed (HTTPS enabled)

## Troubleshooting

### Issue: Routes return 404

**Solution:** Ensure `.htaccess` is uploaded and Apache mod_rewrite is enabled.

### Issue: Supabase connection errors

**Solution:** 
- Check environment variables are in the build
- Verify Supabase RLS policies
- Check browser console for specific errors
- Ensure CORS is configured in Supabase

### Issue: Assets not loading

**Solution:**
- Check file paths are relative
- Verify all files uploaded correctly
- Clear browser cache

### Issue: Admin panel not working

**Solution:**
- Verify service role key is in environment variables
- Check admin routes are accessible
- Test login functionality

## Environment Variables in Production

**Important:** Vite embeds environment variables at build time. The values from your `.env` file are included in the JavaScript bundle. This means:

1. **Build with production values** - Use your actual Supabase keys when building
2. **Security Note** - The anon key is safe to expose (it's public by design)
3. **Service Role Key** - Only used in admin panel, but still embedded in the build. Ensure RLS policies protect your data.

## Alternative: Using Environment Variables at Runtime

If you need to change Supabase credentials without rebuilding, you can:

1. Create a `config.js` file in `public` folder
2. Load it dynamically in your app
3. Update `config.js` on the server when needed

However, for most use cases, building with environment variables is sufficient.

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify Supabase dashboard for connection status
3. Test Supabase connection with curl or Postman
4. Check GoDaddy error logs in cPanel

---

**Note:** This deployment process creates a static site. All dynamic functionality (database operations) happens through Supabase API calls from the browser.

