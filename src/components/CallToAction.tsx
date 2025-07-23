'use client';

import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(contentRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
        }
      });
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-purple-900/30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={contentRef} className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Start Automating in Minutes
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the future of business automation. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn btn-accent btn-lg border-0 ">
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn btn-outline btn-lg gap-2 group text-white border-white/30 hover:bg-white/10">
              See Pricing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Free forever plan • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}