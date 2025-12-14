# 📋 Static Data + Dynamic Data System

## ✅ How It Works

Your React application now uses a **hybrid data system**:

### 1. **Static Data (Read-Only)**
- Located in: `src/utils/advisorsData.js` and `src/utils/projectsData.js`
- **Cannot be edited or deleted** through admin panel
- Always displayed on the website
- Marked with `isStatic: true` flag

### 2. **Dynamic Data (Manageable)**
- Stored in Supabase database
- **Can be added, edited, or deleted** through admin panel
- Marked with `isStatic: false` flag

## 🎯 Frontend (Website)

The website displays **BOTH** static and dynamic data:

```javascript
// Frontend automatically merges:
Static Data (2 advisors) + Dynamic Data (from Supabase) = All Advisors
```

**Example:**
- Static: Prof. Wahid A. Kamalian, Professor
- Dynamic: Any new advisors you add via admin panel
- **Website shows all of them together**

## 🔐 Admin Panel

The admin panel **ONLY shows dynamic data**:

- ✅ Can add new advisors/projects
- ✅ Can edit new advisors/projects
- ✅ Can delete new advisors/projects
- ❌ Cannot see or edit static data (it's protected)

**Why?** Static data is your founding/original content that should remain unchanged.

## 📝 Current Static Data

### Advisors (`src/utils/advisorsData.js`):
1. Prof. Wahid A. Kamalian - Senior Advisor
2. Professor - Technical Advisor

### Projects (`src/utils/projectsData.js`):
1. NS-Max CNS Biogas Technology
2. Bio-CNG Production

## 🔄 Adding New Data

### Through Admin Panel:
1. Go to `/admin-panel/advisors` or `/admin-panel/projects`
2. Click "Add Advisor" or "Add Project"
3. Fill the form and submit
4. **New data is saved to Supabase**
5. **Website automatically shows it** (merged with static data)

## 🛡️ Data Protection

- **Static data** is hardcoded in files - cannot be accidentally deleted
- **Dynamic data** is in Supabase - can be managed through admin panel
- Frontend automatically combines both for display
- Admin panel only manages dynamic data

## 📊 Data Flow

```
Website Display:
├── Static Data (from files)
└── Dynamic Data (from Supabase)
    └── Combined and displayed together

Admin Panel:
└── Dynamic Data Only (from Supabase)
    ├── Can Add
    ├── Can Edit
    └── Can Delete
```

## ✅ Benefits

1. **Original content protected** - Static data never changes
2. **Easy to add new content** - Use admin panel
3. **All content visible** - Website shows everything
4. **Clear separation** - Admin only manages new content

Your static data is safe and will always be displayed! 🎉

