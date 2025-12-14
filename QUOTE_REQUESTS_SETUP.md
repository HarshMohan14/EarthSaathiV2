# 📋 Quote Requests Setup Guide

## ✅ What's Been Done

1. ✅ **Quote Modal Integration** - Quote requests are now saved with proper fields (phone, company, service)
2. ✅ **Admin Panel Page** - New "Quote Requests" page to manage all quote requests
3. ✅ **Dashboard Integration** - Quote requests count displayed on dashboard
4. ✅ **Separate from Contact Submissions** - Quote requests and contact submissions are now separate

## 🚀 Setup Steps (2 minutes)

### Step 1: Add Database Fields

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **"New query"**
3. Copy and paste the entire contents of `supabase/ADD_QUOTE_REQUEST_FIELD.sql`
4. Click **"Run"** (or press `Cmd/Ctrl + Enter`)
5. Wait for "Success" message

This will add:
- `submission_type` field (to distinguish quote requests from contact submissions)
- `phone` field (for quote requests)
- `company` field (for quote requests)
- `service` field (for quote requests)

### Step 2: Test the Quote Request Flow

1. Go to your website's homepage
2. Click the **"Get a Quote"** button in the header
3. Fill out the 3-step form:
   - **Step 1**: Name, Email, Phone
   - **Step 2**: Company, Service
   - **Step 3**: Message
4. Submit the form
5. Go to **Admin Panel** → **Quote Requests**
6. You should see your quote request! ✅

## 🎨 Features

### Quote Modal
- ✅ 3-step form with validation
- ✅ Clean, simple design matching website theme
- ✅ Cannot close on step 3 until submission is complete
- ✅ Success message after submission

### Admin Panel - Quote Requests
- ✅ View all quote requests in a table
- ✅ Search by name, email, company, service, or message
- ✅ View detailed information (name, email, phone, company, service, message)
- ✅ Update status (New → Read → Replied → Archived)
- ✅ Delete quote requests
- ✅ Click email/phone to contact directly
- ✅ Reply via email button

### Dashboard
- ✅ Separate count for Quote Requests
- ✅ Quick link to Quote Requests page
- ✅ Shows total number of quote requests

## 📊 Status Types

- **New** - Just received (blue badge)
- **Read** - You've viewed it (yellow badge)
- **Replied** - You've responded (green badge)
- **Archived** - Completed/archived (gray badge)

## 🔗 Navigation

- **Frontend**: Click "Get a Quote" button in header
- **Admin Panel**: `/admin-panel/quote-requests`
- **Dashboard**: Shows count of quote requests

## 📝 Data Structure

Quote requests are stored in the `contact_submissions` table with:
- `submission_type = 'quote_request'`
- `phone` - Phone number (optional)
- `company` - Company name (optional)
- `service` - Service requested (optional)
- `name`, `email`, `message` - Standard fields

Regular contact submissions have:
- `submission_type = 'contact'` (or null for older entries)
- No phone, company, or service fields

## 🎯 Next Steps

1. Run the SQL script in Supabase
2. Test the quote request form
3. Check the admin panel to see quote requests
4. Start managing quote requests! 🎉

