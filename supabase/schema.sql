-- ============================================
-- StoneTrade — Supabase Database Schema
-- ============================================
-- Run this in Supabase SQL Editor (https://app.supabase.com → SQL Editor)
-- This creates all tables, RLS policies, and indexes for the marketplace.

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. SELLERS
-- ============================================
CREATE TABLE IF NOT EXISTS sellers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  verification_level TEXT CHECK (verification_level IN ('Basic', 'Gold', 'Quarry-Direct')) DEFAULT 'Basic',
  rating NUMERIC(2,1) DEFAULT 0.0,
  reviews_count INTEGER DEFAULT 0,
  contact_phone TEXT,
  contact_email TEXT,
  contact_whatsapp TEXT,
  gst_number TEXT,
  pan_number TEXT,
  bank_account_number TEXT,
  bank_ifsc TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. PRODUCTS
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  stone_type TEXT NOT NULL CHECK (stone_type IN ('Marble', 'Granite', 'Sandstone', 'Limestone', 'Quartzite', 'Onyx', 'Travertine', 'Slate')),
  origin TEXT NOT NULL,
  finish TEXT NOT NULL CHECK (finish IN ('Polished', 'Honed', 'Brushed', 'Leather', 'Natural', 'Flamed', 'Sandblasted', 'Bush-Hammered')),
  size_type TEXT CHECK (size_type IN ('Slab', 'Tile', 'Block', 'Custom')),
  size_dimensions TEXT,
  thickness TEXT,
  color TEXT,
  price NUMERIC(10,2) NOT NULL,
  price_unit TEXT CHECK (price_unit IN ('per sq.ft', 'per piece', 'per ton', 'per running ft', 'per cubic ft')) DEFAULT 'per sq.ft',
  min_order_qty INTEGER DEFAULT 1,
  stock INTEGER DEFAULT 0,
  description TEXT,
  use_cases TEXT[] DEFAULT '{}',
  has_inspection_report BOOLEAN DEFAULT false,
  inspection_report_url TEXT,
  is_active BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. PRODUCT IMAGES
-- ============================================
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. INQUIRIES / RFQs
-- ============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT,
  buyer_company TEXT,
  quantity INTEGER,
  unit TEXT,
  message TEXT NOT NULL,
  status TEXT CHECK (status IN ('new', 'viewed', 'replied', 'closed', 'converted')) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. SAMPLE ORDERS
-- ============================================
CREATE TABLE IF NOT EXISTS sample_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL NOT NULL,
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_pincode TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  amount NUMERIC(10,2) NOT NULL,
  payment_id TEXT,                    -- Razorpay payment ID
  razorpay_order_id TEXT,             -- Razorpay order ID
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')) DEFAULT 'pending',
  order_status TEXT CHECK (order_status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  tracking_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. MESSAGES (Buyer-Seller Chat)
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. FAVORITES / WISHLIST
-- ============================================
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ============================================
-- 8. PRODUCT COMPARISONS
-- ============================================
CREATE TABLE IF NOT EXISTS comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ============================================
-- 9. USER PROFILES (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('buyer', 'seller', 'admin')) DEFAULT 'buyer',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_stone_type ON products(stone_type);
CREATE INDEX IF NOT EXISTS idx_products_origin ON products(origin);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_seller ON inquiries(seller_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_buyer ON inquiries(buyer_id);
CREATE INDEX IF NOT EXISTS idx_sample_orders_buyer ON sample_orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_sample_orders_seller ON sample_orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE sample_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- SELLERS: anyone can read, only owners can write
CREATE POLICY "Sellers are viewable by everyone" ON sellers FOR SELECT USING (true);
CREATE POLICY "Sellers can update own profile" ON sellers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can create seller" ON sellers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- PRODUCTS: anyone can read active, only seller can write
CREATE POLICY "Active products are viewable" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Sellers manage own products" ON products FOR ALL USING (seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid()));

-- PRODUCT IMAGES: anyone can read, only product owner can write
CREATE POLICY "Product images are viewable" ON product_images FOR SELECT USING (true);
CREATE POLICY "Sellers manage own images" ON product_images FOR ALL USING (product_id IN (SELECT id FROM products WHERE seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())));

-- INQUIRIES: buyer sees own, seller sees received
CREATE POLICY "Buyers see own inquiries" ON inquiries FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "Sellers see received inquiries" ON inquiries FOR SELECT USING (seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid()));
CREATE POLICY "Authenticated users can send inquiries" ON inquiries FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- SAMPLE ORDERS: buyer sees own, seller sees received
CREATE POLICY "Buyers see own orders" ON sample_orders FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "Sellers see received orders" ON sample_orders FOR SELECT USING (seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid()));
CREATE POLICY "Authenticated users can place orders" ON sample_orders FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- MESSAGES: only sender/receiver can see
CREATE POLICY "Users see own messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- FAVORITES: only owner
CREATE POLICY "Users manage own favorites" ON favorites FOR ALL USING (auth.uid() = user_id);

-- COMPARISONS: only owner
CREATE POLICY "Users manage own comparisons" ON comparisons FOR ALL USING (auth.uid() = user_id);

-- PROFILES: public read, owner write
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users manage own profile" ON profiles FOR ALL USING (auth.uid() = id);

-- ============================================
-- AUTO-CREATE profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- AUTO-UPDATE updated_at timestamps
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER sellers_updated_at BEFORE UPDATE ON sellers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER sample_orders_updated_at BEFORE UPDATE ON sample_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- 10. RFQs (Request for Quotes) — Bulk Orders
-- ============================================
CREATE TABLE IF NOT EXISTS rfqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT NOT NULL,
  buyer_company TEXT,
  stone_type TEXT NOT NULL,
  finish TEXT,
  color_preference TEXT,
  thickness TEXT,
  size_dimensions TEXT,
  quantity INTEGER NOT NULL,
  quantity_unit TEXT CHECK (quantity_unit IN ('sq.ft', 'pieces', 'tons', 'containers')) DEFAULT 'sq.ft',
  use_case TEXT,                       -- e.g. 'Flooring', 'Countertop', 'Exterior Cladding'
  delivery_location TEXT NOT NULL,
  delivery_state TEXT NOT NULL,
  delivery_pincode TEXT,
  budget_min NUMERIC(12,2),
  budget_max NUMERIC(12,2),
  notes TEXT,
  urgency TEXT CHECK (urgency IN ('flexible', 'within_week', 'within_month', 'urgent')) DEFAULT 'within_month',
  status TEXT CHECK (status IN ('open', 'quoted', 'in_negotiation', 'closed', 'expired')) DEFAULT 'open',
  quotes_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 11. RFQ QUOTES (Seller Responses)
-- ============================================
CREATE TABLE IF NOT EXISTS rfq_quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rfq_id UUID REFERENCES rfqs(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE NOT NULL,
  price_per_unit NUMERIC(10,2) NOT NULL,
  price_unit TEXT NOT NULL,
  min_order_qty INTEGER NOT NULL,
  delivery_days INTEGER NOT NULL,
  delivery_included BOOLEAN DEFAULT false,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,     -- optional: link to listed product
  message TEXT,
  sample_available BOOLEAN DEFAULT true,
  sample_price NUMERIC(8,2) DEFAULT 99.00,
  valid_until TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  status TEXT CHECK (status IN ('submitted', 'viewed', 'accepted', 'rejected', 'expired')) DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 12. SELLER SUBSCRIPTIONS (Hybrid Pricing)
-- ============================================
CREATE TABLE IF NOT EXISTS seller_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE NOT NULL UNIQUE,
  plan TEXT CHECK (plan IN ('free', 'pro', 'enterprise')) DEFAULT 'free',
  max_listings INTEGER DEFAULT 10,
  commission_rate NUMERIC(4,2) DEFAULT 5.00,    -- percentage
  rfq_access BOOLEAN DEFAULT false,
  priority_listing BOOLEAN DEFAULT false,
  analytics_access BOOLEAN DEFAULT false,
  dedicated_manager BOOLEAN DEFAULT false,
  razorpay_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  status TEXT CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RFQ indexes
CREATE INDEX IF NOT EXISTS idx_rfqs_buyer ON rfqs(buyer_id);
CREATE INDEX IF NOT EXISTS idx_rfqs_status ON rfqs(status) WHERE status = 'open';
CREATE INDEX IF NOT EXISTS idx_rfqs_stone_type ON rfqs(stone_type);
CREATE INDEX IF NOT EXISTS idx_rfq_quotes_rfq ON rfq_quotes(rfq_id);
CREATE INDEX IF NOT EXISTS idx_rfq_quotes_seller ON rfq_quotes(seller_id);
CREATE INDEX IF NOT EXISTS idx_seller_subs_seller ON seller_subscriptions(seller_id);

-- RFQ RLS
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfq_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_subscriptions ENABLE ROW LEVEL SECURITY;

-- RFQs: open RFQs visible to verified sellers, buyers see own
CREATE POLICY "Open RFQs visible to all" ON rfqs FOR SELECT USING (status = 'open' OR auth.uid() = buyer_id);
CREATE POLICY "Authenticated buyers can create RFQs" ON rfqs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Buyers manage own RFQs" ON rfqs FOR UPDATE USING (auth.uid() = buyer_id);

-- RFQ Quotes: seller sees own, buyer sees quotes on own RFQ
CREATE POLICY "Sellers see own quotes" ON rfq_quotes FOR SELECT USING (seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid()));
CREATE POLICY "Buyers see quotes on own RFQ" ON rfq_quotes FOR SELECT USING (rfq_id IN (SELECT id FROM rfqs WHERE buyer_id = auth.uid()));
CREATE POLICY "Sellers can submit quotes" ON rfq_quotes FOR INSERT WITH CHECK (seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid()));

-- Subscriptions: seller sees own
CREATE POLICY "Sellers see own subscription" ON seller_subscriptions FOR SELECT USING (seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid()));

-- Auto-update triggers
CREATE OR REPLACE TRIGGER rfqs_updated_at BEFORE UPDATE ON rfqs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER rfq_quotes_updated_at BEFORE UPDATE ON rfq_quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER seller_subs_updated_at BEFORE UPDATE ON seller_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-increment quotes_count on RFQ when a quote is submitted
CREATE OR REPLACE FUNCTION increment_rfq_quotes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE rfqs SET quotes_count = quotes_count + 1 WHERE id = NEW.rfq_id;
  IF (SELECT quotes_count FROM rfqs WHERE id = NEW.rfq_id) >= 1 AND
     (SELECT status FROM rfqs WHERE id = NEW.rfq_id) = 'open' THEN
    UPDATE rfqs SET status = 'quoted' WHERE id = NEW.rfq_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_rfq_quote_created
  AFTER INSERT ON rfq_quotes
  FOR EACH ROW EXECUTE FUNCTION increment_rfq_quotes_count();
