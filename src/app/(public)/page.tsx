import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import Property360Section from '@/components/home/Property360Section';
import WhyTopropSection from '@/components/home/WhyTopropSection';
import OwnerPortalPreview from '@/components/home/OwnerPortalPreview';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import OverseasSection from '@/components/home/OverseasSection';
import CommercialAirbnbSection from '@/components/home/CommercialAirbnbSection';
import FinalCtaSection from '@/components/home/FinalCtaSection';

export const metadata = {
  title: 'TOPROP | ניהול נכסים, השכרה והשקעות',
  description:
    'TOPROP מנהלת, משכירה ומשביחה נכסים פרטיים ומסחריים. בדקו את הנכס שלכם עם Property 360.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <Property360Section />
      <WhyTopropSection />
      <OwnerPortalPreview />
      <HowItWorksSection />
      <OverseasSection />
      <CommercialAirbnbSection />
      <FinalCtaSection />
    </>
  );
}
