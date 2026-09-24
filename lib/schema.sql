-- Cloudflare D1 Database Schema for Elleyhill Power Zambia Online Store

-- 1. Users / Customers Table (Includes direct OTP email verification columns)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  firebase_uid TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL DEFAULT 'Online Client',
  phone TEXT NOT NULL DEFAULT '',
  role TEXT DEFAULT 'customer',
  account_type TEXT DEFAULT 'residential',
  email_verified INTEGER DEFAULT 0, -- 0 (false) | 1 (true)
  otp_code TEXT,
  otp_expires_at TEXT,
  primary_province TEXT DEFAULT 'Lusaka Province',
  primary_district TEXT DEFAULT 'Lusaka',
  primary_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_email TEXT NOT NULL,
  customer_name TEXT NOT NULL DEFAULT 'Valued Client',
  customer_email TEXT,
  phone TEXT NOT NULL DEFAULT '',
  contact_phone TEXT,
  total REAL NOT NULL,
  subtotal REAL DEFAULT 0,
  delivery_fee REAL DEFAULT 0,
  status TEXT DEFAULT 'Processing',
  delivery_address TEXT NOT NULL,
  district TEXT NOT NULL DEFAULT 'Lusaka',
  province TEXT NOT NULL DEFAULT 'Lusaka Province',
  payment_method TEXT NOT NULL,
  deposit_id TEXT,
  order_number TEXT,
  tracking_number TEXT,
  estimated_delivery TEXT DEFAULT '1-2 Business Days',
  assigned_engineer TEXT DEFAULT 'Elleyhill Technical Team',
  items_json TEXT DEFAULT '[]',
  date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. Digital Equipment Warranty Vault Table
CREATE TABLE IF NOT EXISTS warranties (
  id TEXT PRIMARY KEY,
  certificate_number TEXT UNIQUE NOT NULL,
  user_id TEXT,
  user_email TEXT NOT NULL,
  customer_name TEXT NOT NULL DEFAULT 'Valued Client',
  customer_email TEXT,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  serial_number TEXT UNIQUE NOT NULL,
  installation_date TEXT NOT NULL,
  warranty_period_years INTEGER NOT NULL DEFAULT 5,
  expiry_date TEXT NOT NULL,
  status TEXT DEFAULT 'Active',
  system_capacity TEXT,
  installer_name TEXT DEFAULT 'Elleyhill Certified Tech Team',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. Saved Sites & Addresses Table
CREATE TABLE IF NOT EXISTS saved_addresses (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_email TEXT NOT NULL,
  label TEXT NOT NULL,
  full_address TEXT NOT NULL,
  district TEXT NOT NULL DEFAULT 'Lusaka',
  province TEXT NOT NULL DEFAULT 'Lusaka Province',
  contact_phone TEXT NOT NULL DEFAULT '',
  is_default INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 5. Payments & Mobile Money Transactions Table
CREATE TABLE IF NOT EXISTS payments (
  deposit_id TEXT PRIMARY KEY,
  order_ref TEXT NOT NULL,
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'ZMW',
  provider TEXT NOT NULL, -- 'mtn' | 'airtel' | 'zamtel' | 'card'
  phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  correspondent TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for optimal lookup
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_warranties_user_email ON warranties(user_email);
CREATE INDEX IF NOT EXISTS idx_warranties_serial ON warranties(serial_number);
CREATE INDEX IF NOT EXISTS idx_saved_addresses_user_email ON saved_addresses(user_email);
CREATE INDEX IF NOT EXISTS idx_payments_order_ref ON payments(order_ref);
