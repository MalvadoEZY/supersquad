'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollArrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(scrollArrowRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // Bouncing arrow animation
    gsap.to(scrollArrowRef.current, {
      y: 10,
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    // Scroll-based fade out for the arrow - disappears after ~2 scrolls
    gsap.to(scrollArrowRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: scrollArrowRef.current,

        start: "top top",
        end: "bottom top",
        scrub: .2
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={heroRef} className="hero min-h-screen bg-gradient-to-b from-base-100 via-primary/5 to-accent/5 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-accent/5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="hero-content text-left relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto w-full">
        <div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <p>It&apos;s time to </p>
            <p>deploy your <span className="text-accent block">Squad</span></p>
          </h1>
          
          <p ref={subtitleRef} className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl leading-relaxed">
            Supersquad.ai gives you a team of smart AI agents to automate social media, 
            sales, content, and customer support. Designed for modern small businesses.
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 items-start">
            <button className="btn btn-accent btn-lg gap-2 group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn btn-outline btn-lg gap-2 text-white border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300">
              <Play className="w-5 h-5" />
              See How It Works
            </button>
          </div>
        </div>
        {/* Right: Image positioned closer to bottom */}
        <div className="flex justify-center items-end w-full h-full pb-8">
          <Image src="/bot.webp" alt="Hero" width={320} height={1024} className="object-contain" />
        </div>
      </div>

      {/* Bouncing scroll arrow */}
      <div ref={scrollArrowRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer group">
          <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
            Scroll to explore
          </span>
          <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
} 