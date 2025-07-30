-- Satya Photography Database Schema
-- Designed for Supabase but adaptable to other platforms

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'owner')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media table
CREATE TABLE media (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT,
    type TEXT NOT NULL CHECK (type IN ('photo', 'video')),
    service_type TEXT NOT NULL CHECK (service_type IN ('wedding', 'prewedding', 'newborn', 'birthdays', 'retirement', 'events', 'engagement')),
    url TEXT NOT NULL,
    uploaded_by UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions table
CREATE TABLE contact_form_submissions (
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
CREATE TABLE packages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price_range TEXT NOT NULL,
    service_type TEXT NOT NULL CHECK (service_type IN ('wedding', 'prewedding', 'newborn', 'birthdays', 'retirement', 'events', 'engagement')),
    created_by UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies for Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

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

-- Contact form submissions policies
CREATE POLICY "Authenticated users can insert contact forms" ON contact_form_submissions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only owners can view contact submissions" ON contact_form_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'owner'
        )
    );

-- Packages policies
CREATE POLICY "Authenticated users can view packages" ON packages
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only owners can manage packages" ON packages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'owner'
        )
    );

-- Indexes for better performance
CREATE INDEX idx_media_service_type ON media(service_type);
CREATE INDEX idx_media_created_at ON media(created_at DESC);
CREATE INDEX idx_contact_submissions_submitted_at ON contact_form_submissions(submitted_at DESC);
CREATE INDEX idx_packages_service_type ON packages(service_type);

-- Sample data (for development)
INSERT INTO users (name, email, role) VALUES 
('Satya Photography', 'Rajkarthikeya10@gmail.com', 'owner'),
('John Doe', 'john@example.com', 'user');

INSERT INTO packages (title, description, price_range, service_type, created_by) VALUES 
('Premium Wedding Package', 'Full day coverage with 2 photographers, edited photos, and highlight video', '₹75,000 – ₹1,50,000', 'wedding', (SELECT id FROM users WHERE role = 'owner' LIMIT 1)),
('Pre-Wedding Shoot', 'Romantic outdoor session with 50+ edited photos', '₹15,000 – ₹30,000', 'prewedding', (SELECT id FROM users WHERE role = 'owner' LIMIT 1)),
('Newborn Photography', 'Gentle session capturing precious early moments', '₹8,000 – ₹20,000', 'newborn', (SELECT id FROM users WHERE role = 'owner' LIMIT 1));
