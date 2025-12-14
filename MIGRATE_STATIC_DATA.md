# Migrate Static Data to Database

## Overview

This guide will help you migrate static team members and advisors to your Supabase database. Once migrated, all data will be in the database, eliminating duplicate issues and simplifying management.

## Why Migrate?

- ✅ **No More Duplicates**: All data in one place (database)
- ✅ **Simpler Updates**: Edit any member/advisor directly
- ✅ **Consistent Management**: Everything managed through admin panel
- ✅ **No Complex Matching**: No need to match static vs dynamic versions

## Migration Steps

### Option 1: Run Migration Script (Recommended)

1. **Open Browser Console** on your admin panel page
   - Go to `/admin-panel/team` or `/admin-panel/advisors`
   - Press `F12` to open DevTools
   - Go to "Console" tab

2. **Import and Run Migration**
   ```javascript
   // Import the migration function
   const { migrateStaticData } = await import('/src/utils/migrateStaticData.js');
   
   // Run migration
   await migrateStaticData();
   ```

3. **Check Results**
   - The console will show which items were migrated
   - Check your admin panel - static items should now appear
   - Verify they can be edited without creating duplicates

### Option 2: Manual Migration via Admin Panel

1. **Go to Admin Panel**
   - Navigate to `/admin-panel/team` or `/admin-panel/advisors`

2. **Add Static Data Manually**
   - For each static team member/advisor:
     - Click "Add Member" or "Add Advisor"
     - Fill in the details from the static data files
     - Save

3. **Static Data Files Location**
   - Team: `src/utils/teamData.js`
   - Advisors: `src/utils/advisorsData.js`

## What Happens After Migration?

### Admin Panel
- ✅ Shows all data from database only
- ✅ No more static/dynamic distinction
- ✅ Edit any item directly (no duplicates)
- ✅ Delete any item

### Main Website
- ✅ Still shows static + dynamic data (merged)
- ✅ Static data files remain for fallback
- ✅ Dynamic data from database is prioritized

## Verification

After migration, verify:

1. **Admin Panel Shows All Items**
   - Go to `/admin-panel/team` - should see all team members
   - Go to `/admin-panel/advisors` - should see all advisors

2. **Can Edit Without Duplicates**
   - Edit a team member's description
   - Save
   - Check - should update existing, not create new

3. **Can Delete**
   - Delete a team member/advisor
   - Should be removed from admin panel

## Troubleshooting

### Issue: Migration script not found
**Solution**: Make sure you're running it from the admin panel page with the correct import path.

### Issue: Some items already exist
**Solution**: The script checks for duplicates and skips existing items. This is normal.

### Issue: Still seeing duplicates
**Solution**: 
1. Clear browser cache
2. Refresh admin panel
3. Check Supabase database directly

## After Migration

Once migration is complete:
- ✅ All team members and advisors are in Supabase
- ✅ Admin panel only shows database data
- ✅ Editing updates existing entries (no duplicates)
- ✅ Static data files remain for frontend fallback

---

**Note**: The migration is safe to run multiple times - it checks for existing items before creating.

