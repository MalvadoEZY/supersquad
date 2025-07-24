'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Star, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 3 AI agents',
      'Basic automation',
      'Community support',
      '1GB storage',
      'Standard templates'
    ],
    popular: false
  },
  {
    name: 'Solo',
    price: '$18',
    period: 'per month',
    description: 'For individual creators & freelancers',
    features: [
      'Up to 10 AI agents',
      'Advanced workflows',
      'Priority support',
      '10GB storage',
      'Custom templates',
      'Analytics dashboard',
      'API access'
    ],
    popular: true
  },
  {
    name: 'Professional',
    price: '$34',
    period: 'per month',
    description: 'For growing teams & businesses',
    features: [
      'Unlimited AI agents',
      'Custom AI training',
      'Dedicated support',
      'Unlimited storage',
      'White-label solution',
      'Advanced analytics',
      'Custom integrations',
      'Team collaboration'
    ],
    popular: false
  }
];

export default function PricingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: "-=0.4" }
    )
    .fromTo(plansRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: "-=0.3" }
    );

    // Animate plans on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: index * 0.2 }
          );
        }
      });
    });

    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => observer.observe(card));

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 via-primary/5 to-accent/5 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-accent/5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <p>Simple, transparent</p>
            <p><span className="text-accent block">pricing</span></p>
          </h1>
          
          <p ref={subtitleRef} className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your business. Scale up or down anytime. 
            No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 relative z-10">
        <div ref={plansRef} className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`plan-card relative group ${
                  plan.popular 
                    ? 'scale-105 border-2 border-accent shadow-2xl shadow-accent/20' 
                    : 'border border-white/20 hover:border-white/40'
                } bg-white/10 backdrop-blur-xl rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent text-accent-content px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-white/70 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-white/80">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full btn btn-lg gap-2 group transition-all duration-300 ${
                  plan.popular 
                    ? 'btn-accent' 
                    : 'btn-outline text-white border-white/30 hover:bg-white/10 hover:border-white/50'
                }`}>
                  {plan.name === 'Free' ? 'Get Started Free' : `Start ${plan.name} Trial`}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "Can I change my plan anytime?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes, all paid plans come with a 14-day free trial. No credit card required to start."
                },
                {
                  question: "What happens if I exceed my plan limits?",
                  answer: "We'll notify you before you hit your limits. You can upgrade your plan or we can work out custom pricing."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-white/80">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-accent/1 via-accent/5 to-accent/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of businesses already using Supersquad.ai
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn btn-accent btn-lg border-0">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn btn-outline btn-lg gap-2 group text-white border-white/30 hover:bg-white/10">
                <Zap className="w-5 h-5" />
                Schedule Demo
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
