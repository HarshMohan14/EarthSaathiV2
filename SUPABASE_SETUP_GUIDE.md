# Supabase Setup Guide for EarthSaathi

Complete step-by-step guide to set up Supabase backend for your EarthSaathi admin panel.

## 📋 Prerequisites

- A Supabase account (free at https://supabase.com)
- Your React app running locally

## 🚀 Step-by-Step Setup

### Step 1: Create Supabase Account & Project

1. Go to https://supabase.com
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with GitHub, Google, or Email (free)
4. Click **"New Project"**
5. Fill in:
   - **Name:** `earthsaathi` (or your preferred name)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (perfect for starting)
6. Click **"Create new project"**
7. Wait 2-3 minutes for project to initialize

### Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, click **Settings** (gear icon)
2. Click **API** in the left sidebar
3. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

**Copy these values** - you'll need them in Step 4.

### Step 3: Create Database Tables

1. In Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase/schema.sql` from this project
4. Copy the entire SQL content
5. Paste it into the SQL Editor
6. Click **"Run"** (or press Cmd/Ctrl + Enter)
7. You should see: **"Success. No rows returned"**

✅ Your database tables are now created!

### Step 4: Configure Environment Variables

1. In your project root (`EarthSaathiV2`), create a `.env` file:

```bash
# Create .env file
touch .env
```

2. Add these variables to `.env`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Replace:**
- `your-project-id` with your actual Supabase project ID
- `your-anon-key-here` with your anon/public key
- `your-service-role-key-here` with your service_role key

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ.example
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTY3MjkwLCJleHAiOjE5NTQ1NDMyOTB9.example
```

⚠️ **Important:** 
- Never commit `.env` to Git (it's already in `.gitignore`)
- The `service_role` key should only be used server-side (we use it for admin operations)

### Step 5: Create Admin User (Optional - for Supabase Auth)

If you want to use Supabase authentication instead of simple auth:

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email:** `admin@earthsaathi.com`
   - **Password:** `EarthSaathiAdmin` (or your secure password)
4. Click **"Create user"**

**Note:** The app will fall back to simple authentication if Supabase Auth is not configured, so this step is optional.

### Step 6: Test the Setup

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Open your app:**
   ```
   http://localhost:5173
   ```

3. **Test Admin Panel:**
   - Go to: `http://localhost:5173/admin-panel/login`
   - Login with: `admin@earthsaathi.com` / `EarthSaathiAdmin`
   - Try creating an advisor or project
   - Check Supabase dashboard → **Table Editor** → **advisors** to see your data!

### Step 7: Verify Data in Supabase

1. In Supabase dashboard, click **Table Editor**
2. You should see all your tables:
   - `advisors`
   - `projects`
   - `team`
   - `newsletters`
   - `newsletter_subscribers`
   - `resources`
   - `admin_users`

3. Click on any table to view/edit data
4. Try creating data from your admin panel and see it appear here!

## 🎯 What's Working Now

✅ **Database:** All tables created with proper structure  
✅ **API Integration:** React app automatically uses Supabase when configured  
✅ **Authentication:** Works with Supabase Auth or fallback  
✅ **CRUD Operations:** Create, Read, Update, Delete all working  
✅ **Real-time:** Data syncs immediately  

## 🔒 Security Setup (Important!)

### Row Level Security (RLS)

The schema includes RLS policies, but you may want to customize them:

1. Go to **Authentication** → **Policies** in Supabase
2. For each table, you can:
   - Allow public read access (for website visitors)
   - Restrict admin operations to authenticated users

### Recommended RLS Policies

For admin operations, you can create policies like:

```sql
-- Allow authenticated users (admins) full access
CREATE POLICY "Admins can manage advisors" ON advisors
  FOR ALL USING (auth.role() = 'authenticated');
```

Or use the service_role key for admin operations (already implemented in code).

## 📊 Monitoring & Analytics

Supabase provides:
- **Database:** View all your data in Table Editor
- **Logs:** See API requests in **Logs** section
- **Metrics:** Monitor usage in **Settings** → **Usage**

## 🚨 Troubleshooting

### Issue: "Invalid API key"
- ✅ Check your `.env` file has correct keys
- ✅ Restart dev server after changing `.env`
- ✅ Verify keys in Supabase Settings → API

### Issue: "Table doesn't exist"
- ✅ Run the SQL schema again in SQL Editor
- ✅ Check Table Editor to see if tables were created

### Issue: "Authentication failed"
- ✅ Check if you created admin user in Supabase Auth
- ✅ Or use fallback authentication (default credentials)

### Issue: "CORS error"
- ✅ Supabase handles CORS automatically
- ✅ Check if your Supabase URL is correct

### Issue: Data not saving
- ✅ Check browser console for errors
- ✅ Verify RLS policies allow your operations
- ✅ Check Supabase Logs for API errors

## 🎉 You're Done!

Your Supabase backend is now fully configured and working!

### Next Steps:

1. **Add Sample Data:**
   - Use the admin panel to add advisors, projects, etc.
   - Or import data via Supabase Table Editor

2. **Customize:**
   - Add more fields to tables if needed
   - Customize RLS policies for your needs
   - Add file upload for images (Supabase Storage)

3. **Deploy:**
   - Your React app can be deployed anywhere (Vercel, Netlify, etc.)
   - Supabase works from anywhere (no backend deployment needed!)

## 📚 Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **Supabase Dashboard:** Your project dashboard
- **Community:** https://github.com/supabase/supabase/discussions

## 💡 Pro Tips

1. **Use Supabase Storage** for image uploads (free 1GB)
2. **Enable Realtime** if you want live updates
3. **Use Supabase Functions** for complex server-side logic
4. **Monitor Usage** to stay within free tier limits

---

**Need Help?** Check the Supabase documentation or create an issue in your project repository.

