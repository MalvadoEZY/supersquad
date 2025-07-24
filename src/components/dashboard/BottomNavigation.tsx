'use client';

import { useAIAgent } from '@/providers/AIAgentProvider';
import { Building2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import Divider from '../ui/divider';

export const BottomNavigation: React.FC = () => {
  const { agents, selectedAgent, setSelectedAgent } = useAIAgent();
  const [selectedBusiness, setSelectedBusiness] = useState('Acme Corp');
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const businesses = [
    'Acme Corp',
    'TechStart Inc',
    'Global Solutions',
    'Innovation Labs',
    'Digital Dynamics'
  ];

  const userInitials = 'JD';

  return (
    <div className="md:hidden h-18 fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 z-50 shadow-lg">
      <div className="flex items-center justify-between px-2 py-3 h-full">
        {/* Business Dropdown - Left */}
        <div className="dropdown dropdown-top">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-link gap-1 px-2"
            onClick={() => setShowBusinessDropdown(!showBusinessDropdown)}
          >
             <Building2 size={24}/>
            <span className="text-xs hidden sm:inline">Business</span>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-56 mb-2 border border-base-300">
            <li className="menu-title">
              <span className="text-xs font-semibold text-base-content/70">Select Business</span>
            </li>
            {businesses.map((business) => (
              <li key={business}>
                <button
                  onClick={() => {
                    setSelectedBusiness(business);
                    setShowBusinessDropdown(false);
                  }}
                  className={`text-left py-2 ${selectedBusiness === business ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{business}</span>
                  </div>
                </button>
              </li>
            ))}
            <Divider/>
            <li>
              <button className="text-left text-sm py-2 hover:bg-base-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Business
              </button>
            </li>
          </ul>
        </div>

        {/* Agent Selection - Centre (Prominent) */}
        <div className="dropdown dropdown-top  ">
          <div 
            tabIndex={0} 
            className="btn btn-primary btn-sm rounded-full shadow-primary/50 h-16 w-16 gap-2 px-4 py-2 shadow-lg"
            onClick={() => setShowAgentDropdown(!showAgentDropdown)}
          >
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold shadow-sm"
              style={{
                backgroundColor: selectedAgent?.primaryColor || 'var(--color-primary)',
                color: selectedAgent?.primaryColor || 'var(--color-primary-content)'
              }}
            >
              <Image src={selectedAgent?.avatar || ''} alt={selectedAgent?.name || ''} width={34} height={34} />
            </div>
           
          </div>


          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-64 mb-2 border border-base-300">
            <li className="menu-title">
              <span className="text-xs font-semibold text-base-content/70">Select AI Agent</span>
            </li>
            {agents.map((agent) => (
              <li key={agent.id}>
                <button
                  onClick={() => {
                    setSelectedAgent(agent);
                    setShowAgentDropdown(false);
                  }}
                  className={`text-left py-3 ${selectedAgent?.id === agent.id ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shadow-sm"
                      style={{
                        backgroundColor: agent.primaryColor,
                        color: agent.primaryColor
                      }}
                    >
                      <Image src={agent.avatar || '/bot.webp'} alt={agent.name} width={24} height={24} className='rounded-full' />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{agent.name}</div>
                      <div className="text-xs text-base-content/60">{agent.description || 'AI Assistant'}</div>
                    </div>
                    {selectedAgent?.id === agent.id && (
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* User Settings - Right */}
        <div className="dropdown dropdown-top dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-link gap-1 px-2"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center text-xs font-semibold shadow-sm">
              {userInitials}
            </div>
            <span className="text-xs hidden sm:inline">User</span>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-56 mb-2 border border-base-300">
            <li className="menu-title">
              <span className="text-xs font-semibold text-base-content/70">Account</span>
            </li>
            <li>
              <button className="text-left py-2 hover:bg-base-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">Profile</span>
              </button>
            </li>
            <li>
              <button className="text-left py-2 hover:bg-base-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">Settings</span>
              </button>
            </li>
            <li>
              <button className="text-left py-2 hover:bg-base-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span className="text-sm">Plan</span>
              </button>
            </li>
            <Divider/>
            <li>
              <button className="text-left py-2 hover:bg-error/10 text-error">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 