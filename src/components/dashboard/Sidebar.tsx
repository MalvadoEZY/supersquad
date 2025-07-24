'use client';

import { dashboardRoutes } from '@/data/routes';
import { useAIAgent } from '@/providers/AIAgentProvider';
import { AlertCircle, Building2, CheckCircle, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface Business {
  id: string;
  name: string;
  logo: string;
  status: 'active' | 'inactive' | 'pending';
  type: string;
  lastActive: string;
}

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    logo: '/api/placeholder/40/40',
    status: 'active',
    type: 'Technology',
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Green Energy Co',
    logo: '/api/placeholder/40/40',
    status: 'active',
    type: 'Energy',
    lastActive: '1 day ago'
  },
  {
    id: '3',
    name: 'Creative Studios',
    logo: '/api/placeholder/40/40',
    status: 'inactive',
    type: 'Design',
    lastActive: '3 days ago'
  },
  {
    id: '4',
    name: 'Global Logistics',
    logo: '/api/placeholder/40/40',
    status: 'pending',
    type: 'Logistics',
    lastActive: '1 week ago'
  }
];

export const Sidebar: React.FC = () => {
  const { selectedAgent } = useAIAgent();
  const [selectedBusiness, setSelectedBusiness] = useState<Business>(mockBusinesses[0]);
  const [showBusinessSelector, setShowBusinessSelector] = useState(false);

  if (!selectedAgent) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-info" />;
      default:
        return null;
    }
  };



  return (
    <div className="w-64 bg-base-200  h-full overflow-y-auto">
      {/* Business Selector */}
      <div>
        <div className="relative ">
          <button
            onClick={() => setShowBusinessSelector(!showBusinessSelector)}
            className="w-full p-3 py-6 bg-background hover:border-primary/50 transition-all duration-200 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-sm text-base-content">{selectedBusiness.name}</div>
              <div className="text-xs text-base-content/60">{selectedBusiness.type}</div>
            </div>
            <div className="flex items-center gap-2">
              {showBusinessSelector ? <ChevronUp/> : <ChevronDown/>}
            </div>
          </button>

          {/* Business Dropdown */}
          {showBusinessSelector && (
            <div className="absolute top-full left-0 right-0 bg-base-100 border border-base-300  z-50 max-h-80 overflow-y-auto">
              <div className="p-3 border-b border-base-300">
                <h3 className="text-sm font-semibold text-base-content">Your Businesses</h3>
              </div>
              
              <div className="p-2 space-y-1">
                {mockBusinesses.map((business) => (
                  <button
                    key={business.id}
                    onClick={() => {
                      setSelectedBusiness(business);
                      setShowBusinessSelector(false);
                    }}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-base-200 ${
                      selectedBusiness.id === business.id ? 'bg-primary/10 border border-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-base-content">{business.name}</div>
                        <div className="text-xs text-base-content/60">{business.type}</div>
                      </div>
                      {getStatusIcon(business.status)}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-2 border-t border-base-300">
                <button className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-base-200 text-primary flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Add New Business</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className=" ">
        {/* AI Agent Profile */}
        <div className={`text-center p-10`}
          style={{
            backgroundColor: selectedAgent.primaryColor,
            color: selectedAgent.primaryColor
          }}
        >
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-3"
            style={{
              backgroundColor: selectedAgent.primaryColor,
              color: selectedAgent.primaryColor
            }}
          >
            <Image src={selectedAgent.avatar} alt={selectedAgent.name} width={40} height={40} className='rounded-full' />
          </div>
          <h2 className="text-xl font-bold text-base-content mb-1">
            {selectedAgent.name}
          </h2>
          <p className="text-sm text-base-content/70 mb-4">
            {selectedAgent.description}
          </p>
          <div className="text-xs text-base-content/50">
            AI Assistant
          </div>
        </div>

        {/* AI Agent Settings */}
        <div className=" p-6">
          <div className="space-y-2">
            <Link href={dashboardRoutes.GENERATE_POST} className="btn btn-primary w-full">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-sm">Generate Post</span>
              </div>
            </Link>
          </div>
        </div>

        {/* User Settings */}
        <div className='  p-6'>
          <h3 className="text-sm font-semibold text-base-content/70 mb-3 uppercase tracking-wide">
            User Settings
          </h3>
          <div className="space-y-2">
            <button className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-base-300 text-base-content">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-secondary/20 flex items-center justify-center">
                  <span className="text-xs">⚙️</span>
                </div>
                <span className="text-sm">Settings</span>
              </div>
            </button>
            
            <button className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-base-300 text-base-content">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-secondary/20 flex items-center justify-center">
                  <span className="text-xs">💎</span>
                </div>
                <span className="text-sm">Plan</span>
              </div>
            </button>
            
            <button className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-base-300 text-base-content">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-secondary/20 flex items-center justify-center">
                  <span className="text-xs">📊</span>
                </div>
                <span className="text-sm">Usage</span>
              </div>
            </button>
            
            <button className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-base-300 text-base-content">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-secondary/20 flex items-center justify-center">
                  <span className="text-xs">🔑</span>
                </div>
                <span className="text-sm">API Keys</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 