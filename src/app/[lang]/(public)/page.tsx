import SMLandingPage from '@/components/home/SMLandingPage';
import { pageMeta } from '@/i18n/server';

export const generateMetadata = pageMeta('/', 'ניהול נכסים בגישה אישית', 'ניהול נכסים, השכרה, תחזוקה ו-PROPERTY360 — עם תקשורת ברורה ותהליך עבודה מסודר.');

export default function HomePage() {
  return <SMLandingPage />;
}
