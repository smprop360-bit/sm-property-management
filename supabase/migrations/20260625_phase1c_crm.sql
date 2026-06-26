-- Phase 1C: Admin CRM migrations
-- Run this in the Supabase SQL Editor (dashboard → SQL Editor → New query)

-- LEADS table additions
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'חדש';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- PROPERTIES table additions
ALTER TABLE properties ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS deal_type text NOT NULL DEFAULT 'rent';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS area text;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS floor text;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS price integer;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS price_visible boolean NOT NULL DEFAULT true;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS price_text text;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS features text[] NOT NULL DEFAULT '{}';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS images text[] NOT NULL DEFAULT '{}';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Supabase Storage bucket (run in SQL Editor or create in Storage UI):
-- INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true)
-- ON CONFLICT (id) DO NOTHING;
--
-- Storage policy — allow anyone to upload (no auth in Phase 1C):
-- CREATE POLICY "Allow public uploads" ON storage.objects
--   FOR INSERT TO anon WITH CHECK (bucket_id = 'property-images');
-- CREATE POLICY "Allow public reads" ON storage.objects
--   FOR SELECT TO anon USING (bucket_id = 'property-images');
