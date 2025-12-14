# 🚀 Quick Start: Supabase Backend

## ✅ What's Already Done

- ✅ Supabase client installed (`@supabase/supabase-js`)
- ✅ Database schema created (`supabase/schema.sql`)
- ✅ API integration code ready
- ✅ Authentication updated to support Supabase
- ✅ All CRUD operations configured

## 🎯 3 Steps to Get Started

### Step 1: Create Supabase Project (5 minutes)

1. Go to https://supabase.com and sign up (free)
2. Create a new project
3. Wait for it to initialize

### Step 2: Set Up Database (2 minutes)

1. In Supabase dashboard → **SQL Editor**
2. Open `supabase/schema.sql` from this project
3. Copy and paste into SQL Editor
4. Click **"Run"**

### Step 3: Configure Environment (1 minute)

1. Create `.env` file in project root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

2. Get keys from: Supabase Dashboard → Settings → API

3. Restart dev server:
```bash
npm run dev
```

## 🎉 Done!

Your admin panel now uses Supabase backend!

- ✅ All data stored in Supabase
- ✅ Real-time updates
- ✅ Free tier (500MB database, 2GB storage)
- ✅ No backend server needed

## 📖 Full Guide

See `SUPABASE_SETUP_GUIDE.md` for detailed instructions.

## 🔍 Test It

1. Go to `/admin-panel/login`
2. Login: `admin@earthsaathi.com` / `EarthSaathiAdmin`
3. Create an advisor
4. Check Supabase Dashboard → Table Editor → advisors
5. See your data! 🎊

