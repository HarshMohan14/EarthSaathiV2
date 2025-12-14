# 🔌 Supabase Backend Connection Test

## ✅ Connection Status Check

Your React app is already configured to use Supabase! Here's how to verify:

### 1. Check Environment Variables

Make sure your `.env` file has all three values:

```env
VITE_SUPABASE_URL="https://siwcabninyvjqwxgqdhp.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
VITE_SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 2. Verify Connection Files

✅ **Already Created:**
- `src/utils/supabase.js` - Supabase client
- `src/utils/supabaseApi.js` - API wrapper
- `src/utils/api.js` - Updated to use Supabase
- `src/utils/adminApi.js` - Updated to use Supabase

### 3. Test the Connection

#### Option A: Test in Browser Console

1. Start your dev server: `npm run dev`
2. Open browser console (F12)
3. Type this:
```javascript
import('./src/utils/supabase.js').then(m => {
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Supabase Client:', m.supabase);
});
```

#### Option B: Test Newsletter Subscription

1. Go to your website footer
2. Try subscribing to newsletter
3. Check browser console for errors
4. Check Supabase Dashboard → Table Editor → newsletter_subscribers

#### Option C: Test Admin Panel

1. Go to `/admin-panel/login`
2. Login: `admin@earthsaathi.com` / `EarthSaathiAdmin`
3. Try creating an advisor
4. Check Supabase Dashboard → Table Editor → advisors

### 4. Verify Data Flow

**Frontend → Supabase:**
- React app uses `supabaseApi.js`
- Calls Supabase REST API
- Data stored in Supabase database

**Supabase → Frontend:**
- Data fetched from Supabase
- Displayed in admin panel
- Shown on website

## 🔧 Troubleshooting

### Issue: "Cannot connect to Supabase"
- ✅ Check `.env` file has correct URL and keys
- ✅ Restart dev server after changing `.env`
- ✅ Verify Supabase project is active

### Issue: "401 Unauthorized"
- ✅ Run the RLS fix SQL (see `supabase/FIX_NEWSLETTER_RLS.sql`)
- ✅ Check anon key is correct
- ✅ Verify RLS policies are set

### Issue: "Table doesn't exist"
- ✅ Run `supabase/schema.sql` in Supabase SQL Editor
- ✅ Check Table Editor to see if tables exist

## ✅ Success Indicators

You'll know it's working when:
- ✅ Newsletter subscription works without errors
- ✅ Admin panel can create/edit/delete data
- ✅ Data appears in Supabase Table Editor
- ✅ No 401/404 errors in console

## 🎯 Next Steps

1. **Run the RLS fix** (if you haven't): `supabase/FIX_NEWSLETTER_RLS.sql`
2. **Test newsletter subscription** on your website
3. **Test admin panel** CRUD operations
4. **Verify data** in Supabase Dashboard

Your backend is already connected! Just need to fix RLS policies if you see 401 errors.

