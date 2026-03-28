-- 0. Clean Slate (Uncomment if you want to reset everything)
DROP TABLE IF EXISTS product_fitments CASCADE;
DROP TABLE IF EXISTS vehicle_fitments CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS subscribers CASCADE;

-- 1. Categories
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Products
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    short_description TEXT DEFAULT '',
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    regular_price DECIMAL(10,2) DEFAULT 0,
    sale_price DECIMAL(10,2),
    sku TEXT DEFAULT '',
    stock_status TEXT DEFAULT 'instock',
    stock_quantity INTEGER,
    category_id UUID REFERENCES categories(id),
    weight TEXT DEFAULT '',
    dimensions JSONB DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    source_id TEXT DEFAULT '',
    source_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Product images
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT DEFAULT '',
    position INTEGER DEFAULT 0
);

-- 4. Vehicle fitments
CREATE TABLE IF NOT EXISTS vehicle_fitments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year_start INTEGER NOT NULL,
    year_end INTEGER NOT NULL,
    UNIQUE(make, model, year_start, year_end)
);

-- 5. Product-fitment junction
CREATE TABLE IF NOT EXISTS product_fitments (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    fitment_id UUID REFERENCES vehicle_fitments(id) ON DELETE CASCADE,
    position TEXT DEFAULT 'other',
    PRIMARY KEY (product_id, fitment_id)
);

-- 6. Coupons
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL DEFAULT 'percentage', -- 'percentage' or 'fixed'
    value DECIMAL(10,2) NOT NULL,
    used_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Orders
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY, 
    status TEXT NOT NULL DEFAULT 'pending',
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    zip TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'US',
    items JSONB NOT NULL DEFAULT '[]', 
    cart_total DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    shipping_method TEXT,
    shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
    grand_total DECIMAL(10,2) NOT NULL DEFAULT 0,
    payment_method TEXT,
    payment_status TEXT NOT NULL DEFAULT 'pending', 
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Enable row level security (RLS) basics
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 10. Define RLS Policies
-- Products: Read-only for everyone
DROP POLICY IF EXISTS "Allow public read-access to products" ON products;
CREATE POLICY "Allow public read-access to products" ON products FOR SELECT USING (true);
-- Products: Admin only write
DROP POLICY IF EXISTS "Allow admin to manage products" ON products;
CREATE POLICY "Allow admin to manage products" ON products FOR ALL USING (auth.role() = 'service_role');

-- Categories: Read-only for everyone
DROP POLICY IF EXISTS "Allow public read-access to categories" ON categories;
CREATE POLICY "Allow public read-access to categories" ON categories FOR SELECT USING (true);
-- Categories: Admin only write
DROP POLICY IF EXISTS "Allow admin to manage categories" ON categories;
CREATE POLICY "Allow admin to manage categories" ON categories FOR ALL USING (auth.role() = 'service_role');

-- Product Images: Read-only for everyone
DROP POLICY IF EXISTS "Allow public read-access to images" ON product_images;
CREATE POLICY "Allow public read-access to images" ON product_images FOR SELECT USING (true);
-- Product Images: Admin only write
DROP POLICY IF EXISTS "Allow admin to manage images" ON product_images;
CREATE POLICY "Allow admin to manage images" ON product_images FOR ALL USING (auth.role() = 'service_role');

-- Orders: Service role only (Admin)
DROP POLICY IF EXISTS "Allow service role full access to orders" ON orders;
CREATE POLICY "Allow service role full access to orders" ON orders FOR ALL USING (auth.role() = 'service_role');
-- Orders: Anonymous insert (checkout)
DROP POLICY IF EXISTS "Allow anonymous to create orders" ON orders;
CREATE POLICY "Allow anonymous to create orders" ON orders FOR INSERT WITH CHECK (true);

-- Coupons: Read-only for everyone (validation)
DROP POLICY IF EXISTS "Allow public read-access to coupons" ON coupons;
CREATE POLICY "Allow public read-access to coupons" ON coupons FOR SELECT USING (true);
-- Coupons: Admin only manage
DROP POLICY IF EXISTS "Allow admin to manage coupons" ON coupons;
CREATE POLICY "Allow admin to manage coupons" ON coupons FOR ALL USING (auth.role() = 'service_role');

-- Subscribers: Anonymous insert (newsletter)
DROP POLICY IF EXISTS "Allow anonymous to subscribe" ON subscribers;
CREATE POLICY "Allow anonymous to subscribe" ON subscribers FOR INSERT WITH CHECK (true);
-- Subscribers: Admin only read
DROP POLICY IF EXISTS "Allow admin to read subscribers" ON subscribers;
CREATE POLICY "Allow admin to read subscribers" ON subscribers FOR SELECT USING (auth.role() = 'service_role');
