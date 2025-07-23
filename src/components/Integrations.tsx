'use client';

import { gsap } from 'gsap';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { useEffect, useRef } from 'react';

const integrations = [
  { name: "LinkedIn", logo: <Linkedin className='w-10 h-10' />  , color: "#0077B5" },
  { name: "Instagram", logo: <Instagram className='w-10 h-10' />, color: "#E4405F" },
  { name: "Facebook", logo: <Facebook className='w-10 h-10' />, color: "#1877F2" }
];

export default function Integrations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const children = logosRef.current?.children;
          if (children) {
            gsap.fromTo(children,
              { 
                scale: 0.3, 
                opacity: 0, 
                y: 50,
                rotation: -15
              },
              { 
                scale: 1, 
                opacity: 1, 
                y: 0,
                rotation: 0,
                duration: 0.8, 
                stagger: 0.2,
                ease: "elastic.out(1, 0.5)" 
              }
            );
          }
        }
      });
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-t from-black to-primary/10 text-white relative overflow-hidden">
      {/* Smooth travelling background elements */}
      <div className="absolute inset-0">
        {/* Horizontal travelling lines */}
        <div className="absolute top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-slide-right"></div>
        <div className="absolute top-55 right-0 w-full h-px bg-gradient-to-l from-transparent via-gray-700 to-transparent animate-slide-left"></div>
        <div className="absolute bottom-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-slide-right-slow"></div>
        
        {/* Vertical travelling lines */}
        <div className="absolute top-0 left-20 w-px h-full bg-gradient-to-b from-transparent via-gray-600 to-transparent animate-slide-down"></div>
        <div className="absolute top-0 right-32 w-px h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent animate-slide-up"></div>
        
        {/* Floating orbs moving horizontally */}
        <div className="absolute top-1/4 left-0 w-16 h-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-2xl animate-float-right"></div>
        <div className="absolute bottom-1/3 right-0 w-20 h-20 bg-gradient-to-r from-pink-600/20 to-red-600/20 rounded-full blur-2xl animate-float-left"></div>
        <div className="absolute top-1/2 left-0 w-12 h-12 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-full blur-xl animate-float-right-slow"></div>
        
        {/* Travelling geometric shapes */}
        <div className="absolute top-1/3 left-0 w-8 h-8 border border-gray-600 rounded-full animate-slide-right-slow"></div>
        <div className="absolute bottom-1/4 right-0 w-6 h-6 bg-gray-700 rounded-lg rotate-45 animate-slide-left"></div>
        <div className="absolute top-2/3 left-0 w-10 h-10 border-2 border-gray-500 rounded-full animate-slide-right"></div>
        
        {/* Subtle travelling particles */}
        <div className="absolute top-1/6 left-0 w-1 h-1 bg-gray-400 rounded-full animate-slide-right-slow"></div>
        <div className="absolute bottom-1/6 right-0 w-1.5 h-1.5 bg-gray-500 rounded-full animate-slide-left"></div>
        <div className="absolute top-3/4 left-0 w-0.5 h-0.5 bg-gray-600 rounded-full animate-slide-right"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Works with Your <span className='text-accent'>Favourite</span> Tools
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Seamlessly integrate with your existing workflow and tools
          </p>
        </div>

        <div ref={logosRef} className="flex justify-center items-center space-x-8 md:space-x-16">
          {integrations.map((integration, index) => (
            <div 
              key={index} 
              className="group relative"
              style={{ '--hover-color': integration.color } as React.CSSProperties}
            >
              <div className="flex flex-col items-center justify-center p-8 bg-gray-900 border border-gray-800 rounded-2xl hover:border-gray-600 transition-all duration-500 cursor-pointer group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-gray-900/50 min-w-[120px]">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-all duration-500 group-hover:filter group-hover:brightness-110">
                  {integration.logo}
                </div>
                <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                  {integration.name}
                </span>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: integration.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 text-lg ">
            Stay tunned for more integrations coming soon
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}