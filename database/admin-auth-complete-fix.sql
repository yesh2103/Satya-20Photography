-- Complete Admin Authentication Fix for Satya Photography
-- This script ensures the admin user exists in both Supabase Auth and our users table

-- 1. First, clean up any existing problematic entries
DELETE FROM auth.users WHERE email = 'Rajkarthikeya10@gmail.com';
DELETE FROM users WHERE email = 'Rajkarthikeya10@gmail.com';

-- 2. Create the admin user in Supabase auth.users table
-- Note: In a real Supabase environment, you should use the Supabase Dashboard or API
-- This is for reference only - you'll need to do this through the Supabase Dashboard

-- 3. For our users table, ensure the admin exists
INSERT INTO users (
    id, 
    name, 
    email, 
    role, 
    created_at
) VALUES (
    'c8d85e2c-8b9a-4c2f-a3d7-1234567890ab',  -- Fixed UUID for admin
    'Satya Photography Admin',
    'Rajkarthikeya10@gmail.com',
    'owner',
    NOW()
) ON CONFLICT (email) DO UPDATE SET 
    name = EXCLUDED.name,
    role = EXCLUDED.role;

-- 4. Alternative: Allow any authenticated user to be admin if they're the specific email
-- This is a workaround that doesn't require manual user creation

-- Drop the restrictive user insertion policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;

-- Create a more flexible policy that allows the admin to be created automatically
CREATE POLICY "Admin can be created automatically" ON users
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL AND (
            email = 'Rajkarthikeya10@gmail.com' OR 
            auth.uid() = id
        )
    );

-- Instructions for Manual Setup (REQUIRED):
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click "Create User"
-- 3. Enter:
--    - Email: Rajkarthikeya10@gmail.com  
--    - Password: SatyaANil@0804
--    - Check "Auto Confirm User" (or confirm manually after creation)
-- 4. Note the generated User ID
-- 5. Update the users table to use this ID:
--    UPDATE users SET id = 'NEW_USER_ID_FROM_DASHBOARD' WHERE email = 'Rajkarthikeya10@gmail.com';

-- Alternative: Disable email confirmation entirely
-- Go to Authentication → Settings → Email Auth
-- Uncheck "Enable email confirmations"
