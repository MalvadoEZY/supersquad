'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, MapPin, MessageSquare, Phone, Send, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help with your account or technical issues',
    contact: 'support@supersquad.ai',
    action: 'Send Email'
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with our team in real-time',
    contact: 'Available 24/7',
    action: 'Start Chat'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our experts',
    contact: '+1 (555) 123-4567',
    action: 'Call Now'
  }
];

const officeLocations = [
  {
    city: 'San Francisco',
    address: '123 Innovation Drive, Suite 100',
    country: 'United States',
    icon: MapPin
  },
  {
    city: 'London',
    address: '456 Tech Street, Floor 3',
    country: 'United Kingdom',
    icon: MapPin
  }
];

export default function ContactPage() {
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

    // Animate contact methods on scroll
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

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => observer.observe(card));

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
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-accent/30">
            <MessageSquare className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Get in Touch</span>
          </div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <p>We&apos;d love to</p>
            <p><span className="text-accent block">hear from you</span></p>
          </h1>
          
          <p ref={subtitleRef} className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Have questions about Supersquad.ai? Need help with your account? 
            Our team is here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get Support <span className="text-accent">Anywhere</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Choose the way that works best for you. Our support team is available 
                24/7 to help with any questions or issues.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div key={index} className="contact-card bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-accent/50 transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{method.title}</h3>
                    <p className="text-white/80 mb-4">{method.description}</p>
                    <div className="text-accent font-semibold mb-6">{method.contact}</div>
                    <button className="btn btn-outline btn-sm text-white border-white/30 hover:bg-white/10 hover:border-white/50">
                      {method.action}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  Send us a <span className="text-accent">Message</span>
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Fill out the form and we&apos;ll get back to you within 24 hours. 
                  We&apos;re here to help with any questions about Supersquad.ai.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Quick Response</h3>
                      <p className="text-white/70 text-sm">We typically respond within 2 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Expert Support</h3>
                      <p className="text-white/70 text-sm">Our team knows Supersquad.ai inside out</p>
                    </div>
                  </div>
                </div>
              </div>

              <div   className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-accent focus:outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-accent focus:outline-none transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-accent focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors">
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-accent focus:outline-none transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  <button className="btn btn-accent btn-lg w-full gap-2 group">
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Visit Our <span className="text-accent">Offices</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                We have offices around the world. Drop by for a coffee and a chat 
                about how Supersquad.ai can transform your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {officeLocations.map((office, index) => {
                const IconComponent = office.icon;
                return (
                  <div key={index} className="contact-card bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-accent/50 transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{office.city}</h3>
                    <p className="text-white/80 mb-2">{office.address}</p>
                    <p className="text-white/60">{office.country}</p>
                    <button className="btn btn-outline btn-sm mt-6 text-white border-white/30 hover:bg-white/10 hover:border-white/50">
                      Get Directions
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "How quickly do you respond to support requests?",
                  answer: "We typically respond to all support requests within 2 hours during business hours, and within 24 hours for requests submitted outside of business hours."
                },
                {
                  question: "Do you offer phone support?",
                  answer: "Yes, we offer phone support for all paid plans. You can also schedule a call with our team through the contact form above."
                },
                {
                  question: "Can I get help with custom integrations?",
                  answer: "Absolutely! Our technical team can help you with custom integrations and implementations. Just let us know your requirements."
                },
                {
                  question: "What if I need urgent support?",
                  answer: "For urgent issues, please use our live chat feature or call our support line. We prioritize urgent requests and will get back to you immediately."
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of businesses already using Supersquad.ai to automate their workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn btn-accent btn-lg border-0">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn btn-outline btn-lg gap-2 group text-white border-white/30 hover:bg-white/10">
                <MessageSquare className="w-5 h-5" />
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
