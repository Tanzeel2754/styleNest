-- Fix admin credentials table to use 'password' instead of 'password_hash'
DROP TABLE IF EXISTS admin_credentials;

CREATE TABLE admin_credentials (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert admin credentials
INSERT INTO admin_credentials (email, password) VALUES ('admin@store.com', 'admin123');

-- Ensure admin profile exists
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@store.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Ensure admin profile in profiles table
INSERT INTO profiles (id, email, full_name, is_admin, created_at, updated_at)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@store.com'),
  'admin@store.com',
  'Store Administrator',
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  is_admin = true,
  full_name = 'Store Administrator';
