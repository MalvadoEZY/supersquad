'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Bell, CheckCircle, Crown, DollarSign, Rocket, Share2, TrendingUp, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Commission Tiers
const commissionTiers = [
  {
    tier: 'Starter',
    sales: '1-10 sales',
    commission: '50%',
    bonus: 'None'
  },
  {
    tier: 'Silver',
    sales: '11-50 sales',
    commission: '50%',
    bonus: '+5% bonus'
  },
  {
    tier: 'Gold',
    sales: '51-100 sales',
    commission: '50%',
    bonus: '+10% bonus'
  },
  {
    tier: 'Platinum',
    sales: '100+ sales',
    commission: '50%',
    bonus: '+15% bonus'
  }
];

export default function BecomeAnAffiliate() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: "-=0.4" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-accent/30">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Earn Money</span>
          </div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <p>Become an</p>
            <p><span className="text-accent block">Affiliate</span></p>
          </h1>
          
          <p ref={subtitleRef} className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Earn 50% commission on every sale. Get instant notifications, real-time analytics, 
            and join thousands of successful affiliates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn btn-accent btn-lg gap-2 group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Start Earning Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn btn-outline btn-lg gap-2 text-white border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300">
              <Zap className="w-5 h-5" />
              Learn More
            </button>
          </div>

          {/* Commission Highlight */}
          <div className="bg-gradient-to-r from-accent/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-8 border border-accent/30 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <DollarSign className="w-8 h-8 text-accent" />
              <span className="text-3xl font-bold">50% Commission</span>
            </div>
            <p className="text-white/80">On every sale you refer. No caps, no limits.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Supersquad Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-accent">Supersquad?</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Join thousands of successful affiliates who are earning passive income by promoting 
                Supersquad.ai. Our program is designed to reward you generously while providing 
                all the tools you need to succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Generous 50% Commission</h3>
                <p className="text-white/80">Earn 50% on every sale you refer. No caps, no limits, no hidden fees.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Bell className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Instant Notifications</h3>
                <p className="text-white/80">Get notified immediately when someone purchases through your unique tracking link.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Real-time Analytics</h3>
                <p className="text-white/80">Track clicks, conversions, and earnings in your comprehensive dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="text-accent">Works</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Getting started is simple. Follow these three easy steps and start earning 
              your first commission within days.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Sign Up & Get Approved',
                description: 'Create your affiliate account in minutes. Our team reviews applications quickly, and you\'ll receive your unique tracking links and marketing materials.',
                icon: Rocket
              },
              {
                step: '02',
                title: 'Share & Promote',
                description: 'Use your tracking links on social media, blogs, YouTube, or any platform you prefer. We provide marketing materials and tips to help you succeed.',
                icon: Share2
              },
              {
                step: '03',
                title: 'Earn & Track',
                description: 'Get 50% commission on every sale and track your performance in real-time. Payments are processed monthly with no minimum payout.',
                icon: Crown
              }
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-10 h-10 text-accent" />
                  </div>
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-sm font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-white/80 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commission Tiers Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  Performance <span className="text-accent">Tiers</span>
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  The more you sell, the more you earn. Our tiered system rewards high performers 
                  with additional bonuses on top of your 50% commission.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent" />
                    <span className="text-white/90">No monthly quotas or requirements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent" />
                    <span className="text-white/90">Bonuses stack with your base commission</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent" />
                    <span className="text-white/90">Tier status resets monthly</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {commissionTiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center transition-all duration-300 hover:scale-105 ${
                      index === 3 ? 'border-accent/50 shadow-lg shadow-accent/20' : ''
                    }`}
                  >
                    <h3 className="text-lg font-bold mb-2">{tier.tier}</h3>
                    <p className="text-white/70 text-sm mb-3">{tier.sales}</p>
                    <div className="text-xl font-bold text-accent mb-2">{tier.commission}</div>
                    <p className="text-xs text-white/60">{tier.bonus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-accent/1 via-accent/5 to-accent/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of successful affiliates earning passive income with Supersquad.ai. 
              Start your affiliate journey today and turn your network into income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn btn-accent btn-lg border-0">
                Become an Affiliate
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn btn-outline btn-lg gap-2 group text-white border-white/30 hover:bg-white/10">
                <Share2 className="w-5 h-5" />
                Learn More
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Free to join • Instant approval • 50% commission • Real-time tracking
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
