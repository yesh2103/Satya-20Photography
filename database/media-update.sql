-- Update media table to better support video URLs and high quality images

-- Ensure URL column can handle longer video URLs
ALTER TABLE media ALTER COLUMN url TYPE TEXT;

-- Add column for video thumbnail if needed
ALTER TABLE media ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Update existing demo data with video URLs
DELETE FROM media WHERE id IN ('4', '7', '8');

INSERT INTO media (id, title, type, service_type, url, uploaded_by, created_at) VALUES 
('4', 'Engagement Celebration', 'video', 'engagement', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', (SELECT id FROM users WHERE role = 'owner' LIMIT 1), '2024-01-12T16:45:00Z'),
('7', 'Retirement Celebration', 'video', 'retirement', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', (SELECT id FROM users WHERE role = 'owner' LIMIT 1), '2024-01-09T17:00:00Z'),
('8', 'Wedding Highlights', 'video', 'wedding', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', (SELECT id FROM users WHERE role = 'owner' LIMIT 1), '2024-01-08T13:45:00Z');

-- Update photo URLs for higher quality
UPDATE media SET url = REPLACE(url, 'w=800', 'w=1200') WHERE type = 'photo';
