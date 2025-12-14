# 🔧 Quick Fix: Row Level Security (RLS) Error

## ❌ Error You're Seeing

```
401 (Unauthorized)
new row violates row-level security policy for table "newsletter_subscribers"
```

## ✅ Quick Fix (2 minutes)

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **"New query"**

### Step 2: Run This SQL

Copy and paste this SQL code into the editor:

```sql
-- Fix Newsletter Subscribers RLS Policy
DROP POLICY IF EXISTS "Public can subscribe" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Public read access" ON newsletter_subscribers;

-- Allow anyone to subscribe
CREATE POLICY "Allow public subscription" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Allow reading subscribers
CREATE POLICY "Public can read subscribers" ON newsletter_subscribers
  FOR SELECT
  USING (true);

-- Allow updates (for unsubscribing)
CREATE POLICY "Allow unsubscribe" ON newsletter_subscribers
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
```

### Step 3: Click "Run"

Click the **"Run"** button (or press Cmd/Ctrl + Enter)

### Step 4: Test

1. Go back to your website
2. Try subscribing to the newsletter again
3. It should work now! ✅

## 🔧 Complete Fix (All Tables)

If you want to fix RLS for all tables at once, use the file:
- `supabase/fix_rls_policies.sql`

Copy the entire content and run it in SQL Editor.

## 📝 What This Does

- **Allows public newsletter subscriptions** - Anyone can subscribe
- **Allows reading data** - Website visitors can see content
- **Allows admin operations** - Admin panel can manage all data

## 🎯 After Fixing

Your newsletter subscription should work immediately!

