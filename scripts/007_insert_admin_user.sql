-- Insert admin user into admin_credentials table
INSERT INTO admin_credentials (email, password) 
VALUES ('admin@store.com', 'admin123')
ON CONFLICT (email) DO UPDATE SET password = 'admin123';

-- Insert admin profile
INSERT INTO profiles (email, full_name, is_admin) 
VALUES ('admin@store.com', 'Admin User', true)
ON CONFLICT (email) DO UPDATE SET is_admin = true, full_name = 'Admin User';

-- Check what's in the tables
SELECT 'admin_credentials' as table_name, email, password FROM admin_credentials
UNION ALL
SELECT 'profiles' as table_name, email, CASE WHEN is_admin THEN 'true' ELSE 'false' END FROM profiles WHERE is_admin = true;
