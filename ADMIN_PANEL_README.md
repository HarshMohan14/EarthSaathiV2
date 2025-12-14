# EarthSaathi Admin Panel

A comprehensive admin panel for managing EarthSaathi website content with route protection and authentication.

## Features

- 🔐 **Secure Authentication** - Login system with protected routes
- 📊 **Dashboard** - Overview of all content statistics
- 👥 **Advisors Management** - CRUD operations for advisors
- 📁 **Projects Management** - Create, edit, and delete projects
- 👨‍💼 **Team Management** - Manage team members
- 📰 **Newsletters Management** - Create and manage newsletters
- 📧 **Subscribers Management** - View and manage newsletter subscribers
- 📄 **Resources Management** - Manage downloadable resources

## Access

The admin panel is accessible at: `/admin-panel`

### Default Login Credentials

- **Email:** `admin@earthsaathi.com`
- **Password:** `EarthSaathiAdmin`

> ⚠️ **Important:** Change these credentials in production by updating the authentication logic in `src/context/AuthContext.jsx`

## Route Protection

All admin routes are protected using the `ProtectedRoute` component. Unauthenticated users are automatically redirected to `/admin-panel/login`.

### Protected Routes

- `/admin-panel` - Dashboard
- `/admin-panel/advisors` - Advisors management
- `/admin-panel/projects` - Projects management
- `/admin-panel/team` - Team management
- `/admin-panel/newsletters` - Newsletters management
- `/admin-panel/subscribers` - Subscribers management
- `/admin-panel/resources` - Resources management

### Public Route

- `/admin-panel/login` - Login page (accessible without authentication)

## File Structure

```
src/
├── context/
│   └── AuthContext.jsx          # Authentication context and logic
├── components/
│   └── admin/
│       ├── ProtectedRoute.jsx    # Route protection component
│       ├── AdminLayout.jsx       # Admin panel layout with sidebar
│       ├── AdvisorsForm.jsx      # Form for creating/editing advisors
│       └── ProjectsForm.jsx       # Form for creating/editing projects
├── pages/
│   └── admin/
│       ├── Login.jsx             # Login page
│       ├── Dashboard.jsx         # Admin dashboard
│       ├── Advisors.jsx          # Advisors management page
│       ├── Projects.jsx           # Projects management page
│       ├── Team.jsx              # Team management page
│       ├── Newsletters.jsx        # Newsletters management page
│       ├── Subscribers.jsx       # Subscribers management page
│       └── Resources.jsx         # Resources management page
└── utils/
    └── adminApi.js               # Admin API functions for CRUD operations
```

## API Integration

The admin panel uses the `adminApi.js` utility which provides CRUD operations for all entities. The API functions are designed to work with a backend API at `VITE_API_URL` (defaults to `http://localhost:5000/api`).

### API Endpoints Structure

The admin API expects the following endpoints:

- `POST /api/admin/advisors` - Create advisor
- `GET /api/admin/advisors` - Get all advisors
- `PUT /api/admin/advisors/:id` - Update advisor
- `DELETE /api/admin/advisors/:id` - Delete advisor

Similar structure for:
- Projects (`/api/admin/projects`)
- Team (`/api/admin/team`)
- Newsletters (`/api/admin/newsletters`)
- Subscribers (`/api/admin/newsletter-subscribers`)
- Resources (`/api/admin/resources`)

### Authentication

All admin API calls include an Authorization header with the JWT token:
```
Authorization: Bearer <token>
```

## Usage

### Managing Advisors

1. Navigate to `/admin-panel/advisors`
2. Click "Add Advisor" to create a new advisor
3. Fill in the form with:
   - Name (required)
   - Title (required)
   - Description (required)
   - Image URL (optional)
4. Click "Create" to save

### Managing Projects

1. Navigate to `/admin-panel/projects`
2. Click "Add Project" to create a new project
3. Fill in the form with:
   - Title (required)
   - Subtitle (required)
   - Image URL (optional)
   - Sections (can add multiple sections with title and content)
4. Click "Create" to save

### Search Functionality

All management pages include a search bar to filter content by name, title, or description.

## Customization

### Changing Default Credentials

Edit `src/context/AuthContext.jsx` and update the login function:

```javascript
if (email === 'your-email@example.com' && password === 'your-password') {
  // ... authentication logic
}
```

### Connecting to Backend API

Update the API base URL in `.env` file:

```
VITE_API_URL=http://your-backend-url/api
```

### Styling

The admin panel uses the same theme colors as the main website:
- Primary Green: `#01DC98`
- Primary Blue: `#0C1F5E`
- Dark Blue: `#021358`

## Security Notes

1. **Change Default Credentials:** Always change the default login credentials in production
2. **Backend Validation:** Ensure your backend API validates authentication tokens
3. **HTTPS:** Use HTTPS in production to protect authentication tokens
4. **Token Expiration:** Implement token expiration and refresh logic
5. **Rate Limiting:** Add rate limiting to login attempts

## Development

To run the development server:

```bash
npm run dev
```

Then navigate to `http://localhost:5173/admin-panel/login`

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Ensure environment variables are set:
   - `VITE_API_URL` - Your production API URL

3. Deploy the built files to your hosting service

## Support

For issues or questions, please refer to the main project documentation or contact the development team.

