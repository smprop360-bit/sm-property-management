-- TOPROP Initial Schema
-- Run this in Supabase Dashboard > SQL Editor

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  slug          text UNIQUE NOT NULL,
  type          text NOT NULL CHECK (type IN ('office','store','warehouse','industry','land','business')),
  deal_type     text NOT NULL CHECK (deal_type IN ('rent','sale','both')),
  city          text NOT NULL,
  area          text,
  address       text,
  size_sqm      numeric NOT NULL,
  floor         text,
  price         numeric,
  price_visible boolean DEFAULT true,
  price_text    text,
  description   text,
  features      text[] DEFAULT '{}',
  images        text[] DEFAULT '{}',
  status        text DEFAULT 'active' CHECK (status IN ('active','inactive','rented','sold')),
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id            bigserial PRIMARY KEY,
  full_name     text NOT NULL,
  phone         text NOT NULL,
  email         text,
  lead_type     text NOT NULL CHECK (lead_type IN ('owner','seeker','property_interest')),
  property_id   uuid REFERENCES properties(id) ON DELETE SET NULL,
  city          text,
  property_type text,
  size_needed   text,
  budget        text,
  message       text,
  source        text,
  page_url      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  status        text DEFAULT 'חדש',
  notes         text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
