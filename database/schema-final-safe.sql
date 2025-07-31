-- Satya Photography Database Schema - Final Safe Version
-- This handles all existing policies and data safely

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (safe version)
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'owner')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media table
CREATE TABLE IF NOT EXISTS media (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT,
    type TEXT NOT NULL CHECK (type IN ('photo', 'video')),
    service_type TEXT NOT NULL CHECK (service_type IN ('wedding', 'prewedding', 'newborn', 'birthdays', 'retirement', 'events', 'engagement')),
    url TEXT NOT NULL,
    uploaded_by UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_form_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('wedding', 'prewedding', 'newborn', 'birthdays', 'retirement', 'events', 'engagement')),
    event_date DATE NOT NULL,
    message TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Packages table (visible only after login)
CREATE TABLE IF NOT EXISTS packages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price_range TEXT NOT NULL,
    service_type TEXT NOT NULL CHECK (service_type IN ('wedding', 'prewedding', 'newborn', 'birthdays', 'retirement', 'events', 'engagement')),
    created_by UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) policies for Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- SAFELY drop all existing policies first
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;

DROP POLICY IF EXISTS "Media is viewable by everyone" ON media;
DROP POLICY IF EXISTS "Only owners can insert media" ON media;
DROP POLICY IF EXISTS "Only owners can update their media" ON media;
DROP POLICY IF EXISTS "Only owners can delete their media" ON media;

DROP POLICY IF EXISTS "Authenticated users can insert contact forms" ON contact_form_submissions;
DROP POLICY IF EXISTS "Public can insert contact forms" ON contact_form_submissions;
DROP POLICY IF EXISTS "Only owners can view contact submissions" ON contact_form_submissions;

DROP POLICY IF EXISTS "Authenticated users can view packages" ON packages;
DROP POLICY IF EXISTS "Public can view packages" ON packages;
DROP POLICY IF EXISTS "Only owners can manage packages" ON packages;
DROP POLICY IF EXISTS "Only owners can update packages" ON packages;
DROP POLICY IF EXISTS "Only owners can delete packages" ON packages;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Media policies (public read, owner can manage)
CREATE POLICY "Media is viewable by everyone" ON media
    FOR SELECT USING (true);

CREATE POLICY "Only owners can insert media" ON media
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'owner'
        )
    );

CREATE POLICY "Only owners can update their media" ON media
    FOR UPDATE USING (
        uploaded_by = auth.uid() AND
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'owner'
        )
    );

CREATE POLICY "Only owners can delete their media" ON media
    FOR DELETE USING (
        uploaded_by = auth.uid() AND
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'owner'
        )
    );

-- Contact form submissions policies - PUBLIC ACCESS
CREATE POLICY "Public can insert contact forms" ON contact_form_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only owners can view contact submissions" ON contact_form_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'owner'
        )
    );

-- Packages policies - PUBLIC ACCESS  
CREATE POLICY "Public can view packages" ON packages
    FOR SELECT USING (true);

CREATE POLICY "Only owners can insert packages" ON packages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'owner'
        )
    );

CREATE POLICY "Only owners can update packages" ON packages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'owner'
        )
    );

CREATE POLICY "Only owners can delete packages" ON packages
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'owner'
        )
    );

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_media_service_type ON media(service_type);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_form_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_packages_service_type ON packages(service_type);

-- Insert sample data only if it doesn't exist
INSERT INTO users (name, email, role) 
SELECT 'Satya Photography', 'rajkarthikeya10@gmail.com', 'owner'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'rajkarthikeya10@gmail.com'
);

-- Insert sample packages only if they don't exist
INSERT INTO packages (title, description, price_range, service_type, created_by) 
SELECT 'Premium Wedding Package', 'Full day coverage with 2 photographers, edited photos, and highlight video', '₹75,000 – ₹1,50,000', 'wedding', (SELECT id FROM users WHERE role = 'owner' LIMIT 1)
WHERE NOT EXISTS (
    SELECT 1 FROM packages WHERE title = 'Premium Wedding Package'
);

INSERT INTO packages (title, description, price_range, service_type, created_by) 
SELECT 'Pre-Wedding Shoot', 'Romantic outdoor session with 50+ edited photos', '₹15,000 – ₹30,000', 'prewedding', (SELECT id FROM users WHERE role = 'owner' LIMIT 1)
WHERE NOT EXISTS (
    SELECT 1 FROM packages WHERE title = 'Pre-Wedding Shoot'
);

INSERT INTO packages (title, description, price_range, service_type, created_by) 
SELECT 'Newborn Photography', 'Gentle session capturing precious early moments', '₹8,000 – ₹20,000', 'newborn', (SELECT id FROM users WHERE role = 'owner' LIMIT 1)
WHERE NOT EXISTS (
    SELECT 1 FROM packages WHERE title = 'Newborn Photography'
);
