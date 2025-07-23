import { Facebook, Instagram, Linkedin, Mail, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { footer, routes } from '../data/routes';

export default function Footer() {
   

  const getSectionIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'product':
        return <Zap className="w-4 h-4 text-accent" />;
      case 'company':
        return <Users className="w-4 h-4 text-accent" />;
      case 'legal':
        return <Users className="w-4 h-4 text-accent" />;
      case 'social':
        return <Users className="w-4 h-4 text-accent" />;
      default:
        return <Users className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <footer className="bg-background">
      <div className="container  mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent-content" />
              </div>
              <h3 className="text-2xl font-bold text-base-content">
                Supersquad.ai
              </h3>
            </div>
            <p className="text-base-content/70 mb-6 max-w-lg leading-relaxed">
              Your AI-powered business task force. Automate, scale, and grow with intelligent agents 
              that work 24/7 to boost your business performance.
            </p>
            <div className="flex gap-3">
              <Link 
                href={routes.FACEBOOK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost hover:bg-accent/20 hover:text-accent transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link 
                href={routes.LINKEDIN} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost hover:bg-accent/20 hover:text-accent transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link 
                href={routes.INSTAGRAM} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost hover:bg-accent/20 hover:text-accent transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href="mailto:contact@supersquad.ai"
                className="btn btn-circle btn-ghost hover:bg-accent/20 hover:text-accent transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {footer.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-6 text-base-content flex items-center gap-2">
                {getSectionIcon(section.label)}
                {section.label}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-base-content/70 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.name.charAt(0).toUpperCase() + link.name.slice(1).replace(/-/g, ' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-base-content/10 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-base-content/60 text-sm">
              © 2024 Supersquad.ai. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link 
              href={routes.PRIVACY_POLICY} 
              className="text-base-content/60 hover:text-accent text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link 
              href={routes.TERMS_CONDITIONS} 
              className="text-base-content/60 hover:text-accent text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link 
              href={routes.COOKIE_POLICY} 
              className="text-base-content/60 hover:text-accent text-sm transition-colors duration-300"
            >
              Cookie Policy
            </Link>
            <Link 
              href={routes.PRIVACY_POLICY} 
              className="text-base-content/60 hover:text-accent text-sm transition-colors duration-300"
            >
              GDPR
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 