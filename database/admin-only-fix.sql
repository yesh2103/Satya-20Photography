-- Admin-Only System Database Fix
-- This fixes the RLS policy error and sets up proper admin-only access

-- First, let's create the admin user directly in auth.users to bypass signup issues
-- Delete any existing problematic user
DELETE FROM auth.users WHERE email = 'rajkarthikeya10@gmail.com';
DELETE FROM users WHERE email = 'rajkarthikeya10@gmail.com';

-- Create admin user directly in auth system with proper password hash
-- You'll need to set the password through Supabase dashboard after this
INSERT INTO auth.users (
    id,
    email,
    email_confirmed_at,
    created_at,
    updated_at,
    role,
    aud,
    instance_id
) VALUES (
    'c8d85e2c-8b9a-4c2f-a3d7-1234567890ab',
    'rajkarthikeya10@gmail.com',
    NOW(),
    NOW(),
    NOW(),
    'authenticated',
    'authenticated',
    '00000000-0000-0000-0000-000000000000'
);

-- Now create the admin user in our users table
INSERT INTO users (id, name, email, role) VALUES 
('c8d85e2c-8b9a-4c2f-a3d7-1234567890ab', 'Satya Photography Admin', 'rajkarthikeya10@gmail.com', 'owner');

-- Fix the RLS policies to be more permissive for user creation
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;

-- Create a more permissive policy that allows authenticated users to create profiles
CREATE POLICY "Authenticated users can create profiles" ON users
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Also allow users to view any user data (needed for owner checks)
DROP POLICY IF EXISTS "Users can view their own data" ON users;
CREATE POLICY "Users can view user data" ON users
    FOR SELECT USING (true);

-- Make sure all other policies are correct for public access
-- Contact forms - completely public
DROP POLICY IF EXISTS "Public can insert contact forms" ON contact_form_submissions;
CREATE POLICY "Public can insert contact forms" ON contact_form_submissions
    FOR INSERT WITH CHECK (true);

-- Packages - public read access
DROP POLICY IF EXISTS "Public can view packages" ON packages;
CREATE POLICY "Public can view packages" ON packages
    FOR SELECT USING (true);

-- Media - public read access
DROP POLICY IF EXISTS "Media is viewable by everyone" ON media;
CREATE POLICY "Media is viewable by everyone" ON media
    FOR SELECT USING (true);
