# Fix Email Confirmation Issue

## Method 1: Disable Email Confirmation (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `qvltkifxjmxbqdzcapvl`
3. Go to **Authentication** → **Settings**
4. Under **User Signups**, turn OFF "Enable email confirmations"
5. Save the changes

## Method 2: Manually Confirm Email in Database

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Find the user: `rajkarthikeya10@gmail.com`
3. Click on the user
4. Change `email_confirmed_at` to current timestamp
5. Save

## Method 3: Create New Admin Account

Run this SQL in Supabase SQL Editor:

```sql
-- Delete existing unconfirmed user
DELETE FROM auth.users WHERE email = 'rajkarthikeya10@gmail.com';
DELETE FROM users WHERE email = 'rajkarthikeya10@gmail.com';

-- Insert confirmed admin user directly
INSERT INTO auth.users (
  id,
  email,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  aud
) VALUES (
  gen_random_uuid(),
  'rajkarthikeya10@gmail.com',
  NOW(),
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
);

-- Insert into your users table
INSERT INTO users (id, name, email, role) 
SELECT id, 'Satya Photography', 'rajkarthikeya10@gmail.com', 'owner'
FROM auth.users WHERE email = 'rajkarthikeya10@gmail.com';
```

After any of these methods, you should be able to login with:
- Email: rajkarthikeya10@gmail.com  
- Password: SatyaANil@0804
