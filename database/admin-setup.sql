-- Admin User Setup for Satya Photography
-- This script sets up the admin user with confirmed email status

-- First, let's make sure the user exists in our users table
INSERT INTO users (id, name, email, role) 
VALUES (
    '550e8400-e29b-41d4-a716-446655440000', -- Fixed UUID for admin
    'Satya Photography Admin', 
    'Rajkarthikeya10@gmail.com', 
    'owner'
) 
ON CONFLICT (email) DO UPDATE SET 
    name = EXCLUDED.name,
    role = EXCLUDED.role;

-- Note: The password will need to be set through Supabase dashboard or auth API
-- Email confirmation also needs to be done through Supabase dashboard

-- Instructions for manual setup:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. If user doesn't exist, create new user:
--    - Email: Rajkarthikeya10@gmail.com
--    - Password: SatyaANil@0804
--    - Confirm user immediately (toggle email confirmed to true)
-- 3. If user exists but email is not confirmed:
--    - Find the user in the list
--    - Click the three dots (...) next to the user
--    - Select "Confirm User"
-- 4. Make sure the user ID matches our users table entry

-- Alternative: You can also disable email confirmation globally
-- Go to Authentication → Settings → Email Auth
-- Uncheck "Enable email confirmations"
