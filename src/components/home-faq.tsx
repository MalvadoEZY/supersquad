"use client"



interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What is SuperSquad?',
    answer: 'SuperSquad is a revolutionary platform that connects talented professionals with businesses seeking specialised expertise. We streamline the process of finding and collaborating with skilled individuals for your projects.'
  },
  {
    id: '2',
    question: 'How does SuperSquad work?',
    answer: 'Simply post your project requirements, and our AI-powered matching system will connect you with qualified professionals. You can review profiles, discuss project details, and collaborate seamlessly through our integrated platform.'
  },
  {
    id: '3',
    question: 'What types of professionals can I find?',
    answer: 'Our platform hosts a diverse range of professionals including developers, designers, marketers, writers, consultants, and specialists across various industries. Whatever your project needs, we\'ve got you covered.'
  },
  {
    id: '4',
    question: 'How do you ensure quality?',
    answer: 'All professionals on SuperSquad undergo a rigorous verification process. We review portfolios, conduct skill assessments, and collect client feedback to maintain high standards across our platform.'
  },
  {
    id: '5',
    question: 'What are the pricing options?',
    answer: 'We offer flexible pricing plans to suit different needs. From pay-per-project options to monthly subscriptions, you can choose the plan that works best for your business requirements.'
  },
  {
    id: '6',
    question: 'Is my project data secure?',
    answer: 'Absolutely. We implement enterprise-grade security measures to protect your data and communications. All information is encrypted and stored securely in compliance with industry standards.'
  }
];

export default function HomeFAQ() {

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
            
              <div className="flex gap-2 items-center">
                <span className="text-primary h-4 w-6 bg-accent rounded-full"></span>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-accent   to-primary-content bg-clip-text text-transparent leading-tight">
                    Still have questions ? 
                </h2>
                
              </div>
              <p className="text-xl text-base-content/70 leading-relaxed">
                We&apos;ve compiled the most common questions from our community. Whether you&apos;re a business looking for talent or a professional seeking opportunities, find the answers you need here.
              </p>
            </div>
            
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {faqData.map((item) => (
              <div key={item.id} className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input
                  type="radio"
                  name="faq-accordion"
                  
                />
                <div className="collapse-title font-semibold">
                  {item.question}
                </div>
                <div className="collapse-content text-sm">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
