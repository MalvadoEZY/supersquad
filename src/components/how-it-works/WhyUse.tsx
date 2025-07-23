'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import How1 from './how1';
import How2 from './how2';
import How3 from './how3';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function WhyUse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tl = useRef<GSAPTimeline>(null);
  const [timelineReady, setTimelineReady] = useState(false);

  useEffect(() => {
    // Create timeline immediately without waiting for refs
    tl.current = gsap.timeline();
    console.log('Timeline created:', tl.current);
    setTimelineReady(true); // Trigger re-render

    // Add title animation when refs are available
    if (titleRef.current) {
      tl.current.fromTo(titleRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    // Add scroll trigger when section ref is available
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reverse"
      });
    }

    // Cleanup function
    return () => {
      setTimelineReady(false);
      if (tl.current) {
        tl.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-4">
            <p className='text-accent capitalize'>Let&apos;s see</p> how it works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"></div>
        </div>

        {/* AI User Card */}
        <div className='flex flex-col gap-px'>
          {tl.current && timelineReady && <How1 tl={tl.current} />}
          <div className='h-20 w-px bg-primary mx-auto'/>
          {tl.current && timelineReady && <How2 tl={tl.current} />}
          <div className='h-20 w-px bg-primary mx-auto'/>
          {tl.current && timelineReady && <How3 tl={tl.current} />}
        </div>
      </div>
    </section>
  );
}
