# Supabase Keys Mapping Guide

## 🔑 Which Key Goes Where?

In your Supabase Dashboard → Settings → API, you'll see:

### 1. **Project URL** → `VITE_SUPABASE_URL`
- **What it is:** Your Supabase project URL
- **Looks like:** `https://abcdefghijklmnop.supabase.co`
- **Where to find:** At the top of the API settings page
- **Use in:** `VITE_SUPABASE_URL`

### 2. **Publishable Key (anon/public key)** → `VITE_SUPABASE_ANON_KEY`
- **What it is:** Public key for frontend use
- **Label:** Usually says "anon" or "public" or "publishable"
- **Looks like:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ...`
- **Safe to expose:** ✅ Yes, this is safe for frontend
- **Use in:** `VITE_SUPABASE_ANON_KEY`

### 3. **Secret Key (service_role key)** → `VITE_SUPABASE_SERVICE_ROLE_KEY`
- **What it is:** Secret key for admin operations
- **Label:** Usually says "service_role" or "secret"
- **Looks like:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTY3MjkwLCJleHAiOjE5NTQ1NDMyOTB9...`
- **Safe to expose:** ❌ NO! Keep this secret!
- **Use in:** `VITE_SUPABASE_SERVICE_ROLE_KEY`

## 📝 How to Fill Your .env File

1. **Open your `.env` file** in the project root

2. **Copy from Supabase Dashboard:**
   ```
   Project URL → VITE_SUPABASE_URL
   Publishable Key (anon) → VITE_SUPABASE_ANON_KEY
   Secret Key (service_role) → VITE_SUPABASE_SERVICE_ROLE_KEY
   ```

3. **Your .env should look like:**
   ```env
   VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ...
   VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTY3MjkwLCJleHAiOjE5NTQ1NDMyOTB9...
   ```

## ⚠️ Important Notes

- **Don't share** your `service_role` key publicly
- **Don't commit** `.env` to Git (it's already in `.gitignore`)
- The **anon key** is safe to use in frontend code
- The **service_role key** bypasses Row Level Security - use carefully!

## ✅ After Filling .env

1. **Save the `.env` file**
2. **Restart your dev server:**
   ```bash
   npm run dev
   ```
3. **Test the connection:**
   - Go to `/admin-panel/login`
   - Login with: `admin@earthsaathi.com` / `EarthSaathiAdmin`
   - Try creating an advisor or project
   - Check Supabase Dashboard → Table Editor to see your data!

## 🆘 Still Confused?

If you see multiple keys in Supabase:
- **anon/public/publishable** = Use for `VITE_SUPABASE_ANON_KEY`
- **service_role/secret** = Use for `VITE_SUPABASE_SERVICE_ROLE_KEY`
- **Project URL** = Use for `VITE_SUPABASE_URL`

