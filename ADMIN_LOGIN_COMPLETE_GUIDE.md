# Complete Admin Login Setup Guide

## Current Issue
Admin login is failing with "Invalid email or password" because the user doesn't exist in Supabase Auth.

## ✅ Complete Solution

### Step 1: Create Admin User in Supabase Dashboard

1. **Go to Supabase Dashboard**
   - Open your Supabase project: https://supabase.com/dashboard
   - Navigate to **Authentication** → **Users**

2. **Create the Admin User**
   - Click **"Create User"** button
   - Fill in the details:
     - **Email**: `Rajkarthikeya10@gmail.com`
     - **Password**: `SatyaANil@0804`
     - **✅ Check "Auto Confirm User"** (very important!)
   - Click **"Create User"**

### Step 2: Verify User Creation
After creating the user, you should see:
- User appears in the Users list
- Email status shows as "Confirmed" (green checkmark)
- User has a UUID assigned

### Step 3: Test Login
1. Go to `/login` on your website
2. Enter credentials:
   - Email: `Rajkarthikeya10@gmail.com`
   - Password: `SatyaANil@0804`
3. Click "Sign In as Admin"

## 🔧 Alternative Quick Fixes

### Option A: Disable Email Confirmation (Easiest)
1. Go to **Authentication** → **Settings**
2. Scroll to **"Email Auth"** section
3. **Uncheck** "Enable email confirmations"
4. Save settings
5. Try creating user again or logging in

### Option B: Manual Email Confirmation
If user exists but isn't confirmed:
1. Go to **Authentication** → **Users**
2. Find `Rajkarthikeya10@gmail.com`
3. Click the three dots (⋯) → **"Confirm User"**

## 🚀 What Happens After Successful Login

### Admin Dashboard Access
Once logged in, admin will have access to:
- **Overview Dashboard**: Stats and recent activity
- **Media Library**: View all uploaded photos/videos
- **Upload Media**: Add new content to gallery
- **Inquiries**: View contact form submissions

### Admin Capabilities
The admin can:
- ✅ Upload photos and videos
- ✅ Organize media by categories (wedding, pre-wedding, etc.)
- ✅ View and respond to client inquiries
- ✅ Manage media library (view, edit, delete)
- ✅ Access all admin-only sections

### Security Features
- ✅ Only `Rajkarthikeya10@gmail.com` can login
- ✅ Case-insensitive email validation
- ✅ Automatic user profile creation
- ✅ Owner role assignment
- ✅ Protected admin routes

## 🔄 Automatic User Profile Creation

The system now automatically:
1. Creates user profile in database if missing
2. Assigns "owner" role to admin
3. Handles case-insensitive email matching
4. Provides better error messages

## 🧪 Testing Checklist

### Login Flow
- [ ] Admin can access `/login`
- [ ] Form validates admin email (case insensitive)
- [ ] Login succeeds with correct credentials
- [ ] Redirects to `/admin` dashboard
- [ ] Shows admin name and capabilities

### Admin Dashboard
- [ ] Overview tab shows statistics
- [ ] Media library displays content
- [ ] Upload form accepts files
- [ ] Inquiries tab shows contact submissions
- [ ] Navigation works between all tabs

### Security
- [ ] Non-admin emails are rejected
- [ ] Logged out users can't access admin routes
- [ ] Public pages remain accessible to all

## 🆘 Troubleshooting

### "Invalid email or password"
- User doesn't exist in Supabase Auth
- **Solution**: Create user via Supabase Dashboard

### "Email not confirmed"
- User exists but email not verified
- **Solution**: Confirm user manually or disable email confirmation

### "Only admin access is permitted"
- Email doesn't match exactly
- **Solution**: Use exact email `Rajkarthikeya10@gmail.com`

### Can't access admin dashboard
- User logged in but not owner role
- **Solution**: Check user profile creation in database

## 📞 Support
If issues persist:
1. Check Supabase logs: Authentication → Logs
2. Check browser console for errors
3. Verify database policies are correct
4. Contact support with specific error messages

## 🎯 Expected Final State
After setup:
- Admin can login with `Rajkarthikeya10@gmail.com` / `SatyaANil@0804`
- Full access to admin dashboard
- Can upload and manage media
- Can view client inquiries
- Secure admin-only authentication
