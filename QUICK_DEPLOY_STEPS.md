# 🚀 Quick Deployment Steps to GoDaddy

## Pre-Deployment Checklist

- [ ] `.env` file has correct Supabase credentials
- [ ] Supabase RLS policies are configured
- [ ] All features tested locally

## Step-by-Step Deployment

### 1. Build Your Application

```bash
cd EarthSaathiV2
npm run build
```

This creates a `dist` folder with production files.

### 2. Prepare Files

The `deploy.sh` script will:
- Build your app
- Copy `.htaccess` to dist folder
- Prepare everything for upload

Run it:
```bash
./deploy.sh
```

Or manually:
```bash
npm run build
cp .htaccess dist/
```

### 3. Upload to GoDaddy

#### Option A: cPanel File Manager

1. Login to GoDaddy → cPanel
2. Open "File Manager"
3. Navigate to `public_html` (or your domain folder)
4. Upload ALL contents from `dist` folder
5. Ensure `.htaccess` is uploaded (may be hidden)

#### Option B: FTP

1. Get FTP credentials from cPanel
2. Connect via FileZilla/Cyberduck
3. Upload all `dist` contents to `public_html`

### 4. Verify

1. Visit your domain
2. Test navigation (all routes should work)
3. Test Supabase connection (check browser console)
4. Test forms (newsletter, contact, chat)
5. Test admin panel login

## Important Files

- ✅ `dist/index.html` - Main file
- ✅ `dist/assets/` - All JS/CSS files
- ✅ `dist/.htaccess` - URL rewriting (critical!)
- ✅ All images and static assets

## Troubleshooting

**404 on routes?** → Ensure `.htaccess` is uploaded
**Supabase errors?** → Check environment variables were in build
**Assets not loading?** → Verify all files uploaded correctly

---

**Full guide:** See `DEPLOY_GODADDY_GUIDE.md` for detailed instructions.

