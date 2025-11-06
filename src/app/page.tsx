import { CTA } from '@/components/landing/CTA';
import { FAQ } from '@/components/landing/FAQ';
import { Features } from '@/components/landing/Features';
import { Footer } from '@/components/landing/Footer';
import { Hero } from '@/components/landing/Hero';
import { Navbar } from '@/components/landing/Navbar';
import { Pricing } from '@/components/landing/Pricing';

export async function generateMetadata() {
  return {
    title: 'GDG Hackathon Hub - Streamline Your Hackathon Submissions',
    description: 'A centralized platform for hackathon project submissions, judge evaluations, and project archiving. Built for GDG clubs to manage hackathons efficiently.',
  };
}

const IndexPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};

export default IndexPage;
