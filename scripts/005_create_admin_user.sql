-- Create dedicated admin user with fixed credentials
-- Admin credentials: admin@store.com / admin123

-- First, create the admin user in auth.users (this would normally be done via Supabase Auth)
-- For this example, we'll create a profile entry that the admin login will check against
INSERT INTO profiles (id, email, full_name, is_admin, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@store.com',
  'Store Administrator',
  true,
  now(),
  now()
) ON CONFLICT (email) DO UPDATE SET
  is_admin = true,
  full_name = 'Store Administrator';

-- Create admin credentials table for dedicated admin login
CREATE TABLE IF NOT EXISTS admin_credentials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Insert admin credentials (password: admin123)
-- In production, this should be properly hashed
INSERT INTO admin_credentials (email, password_hash)
VALUES ('admin@store.com', 'admin123')
ON CONFLICT (email) DO UPDATE SET password_hash = 'admin123';
