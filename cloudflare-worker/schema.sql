-- Elleyhill Power Zambia - Cloudflare D1 Database Schema
-- Production SQL Schema for Cloudflare D1 (SQLite)

-- 1. Users Table (Stores user profile & OTP email verification in one single table)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL DEFAULT 'Online Client',
    phone TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'customer',
    account_type TEXT NOT NULL DEFAULT 'residential',
    email_verified INTEGER NOT NULL DEFAULT 0, -- 0 (false) | 1 (true)
    otp_code TEXT,
    otp_expires_at TEXT,
    primary_district TEXT DEFAULT 'Lusaka',
    primary_province TEXT DEFAULT 'Lusaka Province',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Orders & Dispatches Table
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    user_email TEXT NOT NULL,
    customer_name TEXT DEFAULT 'Valued Client',
    date TEXT NOT NULL,
    total REAL NOT NULL,
    subtotal REAL DEFAULT 0,
    delivery_fee REAL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Processing', -- 'Processing' | 'Dispatched' | 'Delivered & Commissioned' | 'Cancelled'
    payment_method TEXT NOT NULL DEFAULT 'Mobile Money',
    deposit_id TEXT,
    order_number TEXT,
    tracking_number TEXT,
    delivery_address TEXT NOT NULL,
    district TEXT NOT NULL DEFAULT 'Lusaka',
    province TEXT NOT NULL DEFAULT 'Lusaka Province',
    contact_phone TEXT NOT NULL DEFAULT '',
    assigned_engineer TEXT DEFAULT 'Elleyhill Technical Team',
    estimated_delivery TEXT NOT NULL DEFAULT '1-2 Business Days',
    items_json TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Digital Warranty Vault Table
CREATE TABLE IF NOT EXISTS warranties (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    user_email TEXT NOT NULL,
    customer_name TEXT DEFAULT 'Valued Client',
    product_name TEXT NOT NULL,
    serial_number TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL, -- 'Inverter' | 'Battery' | 'Solar Panel' | 'Kit' | 'Accessories'
    installation_date TEXT NOT NULL,
    warranty_period_years INTEGER NOT NULL DEFAULT 5,
    expiry_date TEXT NOT NULL,
    certificate_number TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active', -- 'Active' | 'Pending Registration' | 'Expired'
    system_capacity TEXT,
    installer_name TEXT DEFAULT 'Elleyhill Certified Tech Team',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Saved Installation Sites & Addresses Table
CREATE TABLE IF NOT EXISTS saved_addresses (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    user_email TEXT NOT NULL,
    label TEXT NOT NULL,
    full_address TEXT NOT NULL,
    district TEXT NOT NULL DEFAULT 'Lusaka',
    province TEXT NOT NULL DEFAULT 'Lusaka Province',
    contact_phone TEXT NOT NULL DEFAULT '',
    is_default INTEGER NOT NULL DEFAULT 0, -- 0 (false) | 1 (true)
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Mobile Money & Card Payments Log Table
CREATE TABLE IF NOT EXISTS payments (
    deposit_id TEXT PRIMARY KEY,
    order_ref TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'ZMW',
    provider TEXT NOT NULL, -- 'mtn' | 'airtel' | 'zamtel' | 'card'
    phone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING', -- 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED'
    correspondent TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_warranties_user_email ON warranties(user_email);
CREATE INDEX IF NOT EXISTS idx_warranties_serial ON warranties(serial_number);
CREATE INDEX IF NOT EXISTS idx_saved_addresses_user_email ON saved_addresses(user_email);
CREATE INDEX IF NOT EXISTS idx_payments_order_ref ON payments(order_ref);
