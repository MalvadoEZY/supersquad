import HomeFAQ from '@/components/home-faq';
import CallToAction from '../../components/CallToAction';
import Hero from '../../components/Hero';
import Integrations from '../../components/Integrations';
import WhyUse from '../../components/how-it-works/WhyUse';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUse />
      <Integrations />
      <HomeFAQ/>
      <CallToAction />
    </>
  );
}
