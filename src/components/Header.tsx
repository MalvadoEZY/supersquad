'use client';

import { routes } from '@/data/routes';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Navigation structure
const navigation = {
  main: [
    { name: 'Employees', href: routes.EMPLOYEES },
    { name: 'Pricing', href: routes.PRICING },
  ],
  cta: [
    { name: 'Log in', href: routes.SIGNIN, accent: false },
    { name: 'Deploy your AI', href: routes.SIGNUP, accent: true },
  ],
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  

  const closeAllDropdowns = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base-100/95 backdrop-blur-xl border-b border-gray-200/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-12">
            <div className="relative">
              <span className="text-2xl font-bold font-inter">supersquad</span>
              <div className="absolute -top-1 left-4 w-2 h-2 bg-accent rounded-full"></div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 ml-10">
              {navigation.main.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className="text-base-content hover:text-base-content transition-colors font-inter font-medium text-xl"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href={navigation.cta[0].href} 
              className="btn btn-ghost  btn-lg gap-2 "
            >
              {navigation.cta[0].name}
            </Link>
            <Link 
              href={navigation.cta[1].href}
              className="btn btn-accent btn-lg gap-2 "
            >
              {navigation.cta[1].name}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-colors"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation - Full Screen Drawer */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <div className="relative">
                  <span className="text-2xl font-bold text-primary-content font-inter">supersquad</span>
                  <div className="absolute -top-1 left-4 w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-3 rounded text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              {/* Navigation Content */}
              <div className="flex-1 p-10 text-center space-y-10 bg-white ">
                {/* Main Navigation */}
                <div className="space-y-10">
                  {navigation.main.map((item) => (
                    <Link 
                      key={item.name}
                      href={item.href} 
                      onClick={closeAllDropdowns}
                      className="block text-3xl font-medium text-gray-700 hover:text-gray-900 transition-colors font-inter"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA Links */}
                 
              </div>

              {/* Bottom CTA */}
              <div className="p-6 flex flex-col gap-4 border-t border-gray-200 bg-white">
                <Link 
                  href={navigation.cta[0].href} 
                  onClick={closeAllDropdowns}
                  className="block w-full text-accent hover:text-white py-4 border-primary border rounded hover:bg-primary/90 transition-all duration-200 font-inter font-semibold text-lg shadow-lg text-center"
                >
                  {navigation.cta[0].name}
                </Link>
                <Link 
                  href={navigation.cta[1].href}
                  onClick={closeAllDropdowns}
                  className="block w-full bg-accent text-white py-4 rounded hover:bg-accent/90 transition-all duration-200 font-inter font-semibold text-lg shadow-lg text-center"
                >
                  {navigation.cta[1].name}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
