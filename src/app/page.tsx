import Header from '@/components/Header';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Integrations from '../components/Integrations';
import WhyUse from '../components/how-it-works/WhyUse';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhyUse />
      <Integrations />
      <CallToAction />
      <Footer />
    </main>
  );
}
