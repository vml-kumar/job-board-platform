import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/home/Hero';
import FeaturesSection from '@/components/home/Features';
import CallToAction from '@/components/home/CallToAction';
import HowItWorks from '@/components/home/HowItWorks';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
