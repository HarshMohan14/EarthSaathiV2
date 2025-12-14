# 🚀 Quick Migration Steps

## Simple 3-Step Process

### Step 1: Go to Admin Dashboard
1. Open your browser
2. Navigate to: `http://localhost:5173/admin-panel` (or your deployed URL)
3. Make sure you're logged in

### Step 2: Click Migration Button
1. On the Dashboard, you'll see a blue box that says **"Migrate Static Data"**
2. Click the button: **"Migrate Static Data to Database"**
3. Confirm when prompted

### Step 3: Wait for Completion
1. The button will show "Migrating..." while processing
2. You'll see a success message when done
3. Refresh the page or check Team/Advisors pages

## That's It! ✅

After migration:
- ✅ All static team members are in the database
- ✅ All static advisors are in the database
- ✅ You can now edit them without creating duplicates
- ✅ Everything is manageable through the admin panel

## Alternative: Manual Migration via Browser Console

If the button doesn't appear, you can run it manually:

1. **Open Browser Console** (Press F12)
2. **Go to Console tab**
3. **Run this command:**
   ```javascript
   const { migrateStaticData } = await import('/src/utils/migrateStaticData.js');
   await migrateStaticData();
   ```
4. **Check the console** for migration results

## What Gets Migrated?

### Team Members (2 items):
- Dr. Shaurya Mohan - CEO & Co-Founder
- Dr. Namrata - CTO, Co-founder

### Advisors (2 items):
- Prof. Wahid A. Kamalian - Senior Advisor
- Professor - Technical Advisor

## Verification

After migration, verify:
1. Go to `/admin-panel/team` - should see 2+ team members
2. Go to `/admin-panel/advisors` - should see 2+ advisors
3. Try editing one - should update, not create duplicate

---

**Note**: Migration is safe to run multiple times - it checks for duplicates before adding.

