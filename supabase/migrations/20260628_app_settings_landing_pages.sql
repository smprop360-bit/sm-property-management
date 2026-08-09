-- App settings: key-value store for admin config (API keys, AI model, etc.)
CREATE TABLE IF NOT EXISTS app_settings (
  key        text PRIMARY KEY,
  value      text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read settings"
  ON app_settings FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert settings"
  ON app_settings FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON app_settings FOR UPDATE TO authenticated USING (true);

-- Landing pages: AI-generated landing pages stored as JSON
CREATE TABLE IF NOT EXISTS landing_pages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug       text UNIQUE NOT NULL,
  title      text NOT NULL,
  data       jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read landing pages"
  ON landing_pages FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage landing pages"
  ON landing_pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
