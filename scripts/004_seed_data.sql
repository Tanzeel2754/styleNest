-- Insert sample categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('T-Shirts', 't-shirts', 'Comfortable and stylish t-shirts for everyday wear', '/placeholder.svg?height=300&width=300'),
('Hoodies', 'hoodies', 'Cozy hoodies and sweatshirts for casual comfort', '/placeholder.svg?height=300&width=300'),
('Jeans', 'jeans', 'Premium denim jeans in various fits and styles', '/placeholder.svg?height=300&width=300'),
('Accessories', 'accessories', 'Complete your look with our stylish accessories', '/placeholder.svg?height=300&width=300')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, image_url, gallery_urls, sizes, colors, stock_quantity, is_featured) 
SELECT 
  'Classic Cotton T-Shirt',
  'classic-cotton-tshirt',
  'A timeless essential crafted from premium 100% cotton. Soft, breathable, and perfect for layering or wearing on its own.',
  29.99,
  39.99,
  c.id,
  '/placeholder.svg?height=600&width=600',
  ARRAY['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
  ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['White', 'Black', 'Gray', 'Navy'],
  100,
  true
FROM categories c WHERE c.slug = 't-shirts'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, category_id, image_url, gallery_urls, sizes, colors, stock_quantity, is_featured)
SELECT 
  'Premium Hoodie',
  'premium-hoodie',
  'Ultra-soft fleece hoodie with a relaxed fit. Features a kangaroo pocket and adjustable drawstring hood.',
  79.99,
  c.id,
  '/placeholder.svg?height=600&width=600',
  ARRAY['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Gray', 'Black', 'Navy', 'Burgundy'],
  75,
  true
FROM categories c WHERE c.slug = 'hoodies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, compare_at_price, category_id, image_url, gallery_urls, sizes, colors, stock_quantity)
SELECT 
  'Slim Fit Jeans',
  'slim-fit-jeans',
  'Modern slim-fit jeans with stretch denim for comfort and style. Perfect for both casual and smart-casual occasions.',
  89.99,
  120.00,
  c.id,
  '/placeholder.svg?height=600&width=600',
  ARRAY['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
  ARRAY['28', '30', '32', '34', '36', '38'],
  ARRAY['Dark Wash', 'Light Wash', 'Black'],
  50,
  false
FROM categories c WHERE c.slug = 'jeans'
ON CONFLICT (slug) DO NOTHING;

-- Create admin user (you'll need to sign up with this email first)
-- This will be updated when a user with this email signs up
INSERT INTO profiles (id, first_name, last_name, email, is_admin)
SELECT 
  id,
  'Admin',
  'User',
  email,
  true
FROM auth.users 
WHERE email = 'admin@example.com'
ON CONFLICT (id) DO UPDATE SET is_admin = true;
