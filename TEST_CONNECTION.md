# 🧪 Test Supabase Connection

## Quick Connection Test

### Step 1: Restart Dev Server

```bash
npm run dev
```

### Step 2: Test Newsletter Subscription

1. Go to your website footer
2. Enter an email and click "Subscribe"
3. **Expected:** Success message
4. **If error:** See troubleshooting below

### Step 3: Test Admin Panel

1. Go to `/admin-panel/login`
2. Login: `admin@earthsaathi.com` / `EarthSaathiAdmin`
3. Go to Advisors page
4. Click "Add Advisor"
5. Fill form and submit
6. **Expected:** Advisor appears in list
7. **Check:** Supabase Dashboard → Table Editor → advisors

### Step 4: Verify in Supabase

1. Open Supabase Dashboard
2. Go to **Table Editor**
3. Check tables:
   - `newsletter_subscribers` - Should have your test email
   - `advisors` - Should have test advisor if created
   - `projects` - Should show any projects

## ✅ Connection Status

Your backend is **already connected**! Here's what's working:

- ✅ Supabase client configured
- ✅ API integration ready
- ✅ Environment variables set
- ✅ Auto-detection enabled (uses Supabase when available)

## 🔧 Fix RLS Error (If You See 401)

Run this SQL in Supabase SQL Editor:

```sql
-- Fix Newsletter Subscribers
DROP POLICY IF EXISTS "Public can subscribe" ON newsletter_subscribers;
CREATE POLICY "Allow public subscription" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read subscribers" ON newsletter_subscribers
  FOR SELECT USING (true);
```

See `supabase/FIX_NEWSLETTER_RLS.sql` for complete fix.

## 🎯 Success Indicators

- ✅ Newsletter subscription works
- ✅ Admin panel CRUD operations work
- ✅ Data appears in Supabase Table Editor
- ✅ No console errors

Your backend is connected! Just fix RLS policies if needed.

