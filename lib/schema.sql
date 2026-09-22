-- Cloudflare D1 Database Schema for Elleyhill Power Zambia Online Store

-- 1. Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  firebase_uid TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  role TEXT DEFAULT 'customer',
  account_type TEXT DEFAULT 'residential',
  company_name TEXT,
  tpin TEXT,
  primary_province TEXT,
  primary_district TEXT,
  primary_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_id TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  phone TEXT NOT NULL,
  total REAL NOT NULL,
  subtotal REAL NOT NULL,
  delivery_fee REAL DEFAULT 0,
  status TEXT DEFAULT 'Processing',
  delivery_address TEXT NOT NULL,
  district TEXT NOT NULL,
  province TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  tracking_number TEXT,
  estimated_delivery TEXT,
  assigned_engineer TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- 3. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- 4. Equipment Warranty Vault Table
CREATE TABLE IF NOT EXISTS warranties (
  id TEXT PRIMARY KEY,
  certificate_number TEXT UNIQUE NOT NULL,
  customer_id TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  serial_number TEXT UNIQUE NOT NULL,
  installation_date TEXT NOT NULL,
  warranty_period_years INTEGER NOT NULL,
  expiry_date TEXT NOT NULL,
  status TEXT DEFAULT 'Active',
  system_capacity TEXT,
  installer_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- 5. Inventory Items Table
CREATE TABLE IF NOT EXISTS inventory (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  stock_count INTEGER NOT NULL DEFAULT 0,
  reserved_count INTEGER NOT NULL DEFAULT 0,
  min_threshold INTEGER NOT NULL DEFAULT 10,
  unit_price_zmw REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'In Stock',
  warehouse_bay TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. pawaPay Mobile Money Transactions Table
CREATE TABLE IF NOT EXISTS pawa_transactions (
  deposit_id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  currency TEXT DEFAULT 'ZMW',
  amount REAL NOT NULL,
  payment_status TEXT NOT NULL,
  pawa_reference TEXT,
  operator_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for optimal lookup
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_warranties_customer_email ON warranties(customer_email);
CREATE INDEX IF NOT EXISTS idx_warranties_serial ON warranties(serial_number);
CREATE INDEX IF NOT EXISTS idx_pawa_order_id ON pawa_transactions(order_id);
