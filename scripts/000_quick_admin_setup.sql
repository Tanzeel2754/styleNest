-- Quick admin setup - creates just the admin credentials table and user
-- Run this first to get admin login working

-- Create admin_credentials table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table (needed for admin verification)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert admin user
INSERT INTO admin_credentials (email, password) 
VALUES ('admin@store.com', 'admin123')
ON CONFLICT (email) DO UPDATE SET password = 'admin123';

-- Insert admin profile
INSERT INTO profiles (email, full_name, is_admin) 
VALUES ('admin@store.com', 'Admin User', TRUE)
ON CONFLICT (email) DO UPDATE SET is_admin = TRUE, full_name = 'Admin User';
