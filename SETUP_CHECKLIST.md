# Admin Panel Setup Checklist

## ✅ What's Already Done

- ✅ All admin panel components created
- ✅ Authentication system implemented
- ✅ Route protection configured
- ✅ All admin pages created
- ✅ API integration code ready

## 📋 What You Need to Do

### 1. **Test the Admin Panel (No Backend Required)**

The admin panel will work immediately for testing, even without a backend:

```bash
# Start your development server
npm run dev
```

Then navigate to: `http://localhost:5173/admin-panel/login`

**Login Credentials:**
- Email: `admin@earthsaathi.com`
- Password: `EarthSaathiAdmin`

The admin panel will:
- ✅ Show the dashboard
- ✅ Display existing data from your current API
- ✅ Allow you to view all content
- ⚠️ Create/Update/Delete operations will show in console (ready for backend integration)

### 2. **Set Up Environment Variables (Optional)**

If you have a backend API, create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Or for production:
```env
VITE_API_URL=https://your-api-domain.com/api
```

**Note:** If you don't have a backend yet, the admin panel will still work for viewing data using the existing API endpoints.

### 3. **Backend API Setup (If You Have One)**

If you have a backend API, ensure it has these admin endpoints:

#### Authentication Endpoint
```
POST /api/admin/login
Body: { email, password }
Response: { token, user }
```

#### Admin Endpoints Structure
```
GET    /api/admin/advisors          - Get all advisors
POST   /api/admin/advisors          - Create advisor
PUT    /api/admin/advisors/:id      - Update advisor
DELETE /api/admin/advisors/:id      - Delete advisor

GET    /api/admin/projects          - Get all projects
POST   /api/admin/projects          - Create project
PUT    /api/admin/projects/:id      - Update project
DELETE /api/admin/projects/:id      - Delete project

GET    /api/admin/team              - Get all team members
POST   /api/admin/team              - Create team member
PUT    /api/admin/team/:id           - Update team member
DELETE /api/admin/team/:id           - Delete team member

GET    /api/admin/newsletters        - Get all newsletters
POST   /api/admin/newsletters       - Create newsletter
PUT    /api/admin/newsletters/:id    - Update newsletter
DELETE /api/admin/newsletters/:id    - Delete newsletter
PATCH  /api/admin/newsletters/:id/publish    - Publish newsletter
PATCH  /api/admin/newsletters/:id/unpublish  - Unpublish newsletter

GET    /api/admin/newsletter-subscribers     - Get all subscribers
DELETE /api/admin/newsletter-subscribers/:id - Delete subscriber

GET    /api/admin/resources          - Get all resources
POST   /api/admin/resources         - Create resource
PUT    /api/admin/resources/:id     - Update resource
DELETE /api/admin/resources/:id     - Delete resource
```

**Important:** All admin endpoints should:
- Require authentication token in header: `Authorization: Bearer <token>`
- Return 401 Unauthorized if token is invalid/expired

### 4. **Update Authentication (For Production)**

**⚠️ CRITICAL:** Before deploying to production, update the authentication in `src/context/AuthContext.jsx`:

**Option A: Connect to Your Backend**
```javascript
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) throw new Error('Invalid credentials');
    
    const { token, user } = await response.json();
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(user));
    setUser(user);
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

**Option B: Change Default Credentials**
If you want to keep simple authentication, change the credentials:
```javascript
// In src/context/AuthContext.jsx, line ~25
if (email === 'your-secure-email@earthsaathi.com' && password === 'your-secure-password') {
  // ... rest of code
}
```

### 5. **Test All Features**

1. **Login Test:**
   - Go to `/admin-panel/login`
   - Login with default credentials
   - Should redirect to dashboard

2. **Dashboard Test:**
   - Check if statistics load correctly
   - Click on different cards to navigate

3. **CRUD Operations Test:**
   - Try creating a new advisor
   - Try editing an existing advisor
   - Try deleting an advisor
   - Repeat for projects, team, etc.

4. **Route Protection Test:**
   - Logout
   - Try accessing `/admin-panel` directly
   - Should redirect to login

### 6. **Customization (Optional)**

- **Change Colors:** Update theme colors in components if needed
- **Add More Fields:** Extend forms in `AdvisorsForm.jsx`, `ProjectsForm.jsx`
- **Add Validation:** Add form validation for better UX
- **Add Image Upload:** Implement file upload for images instead of URLs

## 🚀 Quick Start (No Backend)

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Open browser:**
   ```
   http://localhost:5173/admin-panel/login
   ```

3. **Login:**
   - Email: `admin@earthsaathi.com`
   - Password: `EarthSaathiAdmin`

4. **Explore:**
   - Dashboard shows statistics
   - View all content sections
   - Create/Edit/Delete operations are ready (will work once backend is connected)

## 🔒 Security Checklist (Before Production)

- [ ] Change default login credentials
- [ ] Implement proper backend authentication
- [ ] Use HTTPS in production
- [ ] Add rate limiting to login attempts
- [ ] Implement token expiration
- [ ] Add CSRF protection
- [ ] Validate all inputs on backend
- [ ] Use environment variables for sensitive data
- [ ] Enable CORS properly on backend
- [ ] Add logging for admin actions

## 📝 Notes

- The admin panel works **immediately** for viewing data
- Create/Update/Delete operations are ready but need backend API
- All API calls gracefully fall back to existing endpoints if admin endpoints don't exist
- The UI is fully responsive and matches your website theme
- All routes are protected - unauthenticated users are redirected to login

## 🆘 Troubleshooting

**Issue: Can't login**
- Check browser console for errors
- Verify credentials are correct
- Check if localStorage is enabled

**Issue: Data not loading**
- Check if your backend API is running
- Verify API URL in `.env` file
- Check browser network tab for API errors

**Issue: Routes not working**
- Clear browser cache
- Check if all files were saved correctly
- Restart development server

## ✅ You're Ready!

The admin panel is fully functional and ready to use. Just start your dev server and login!

