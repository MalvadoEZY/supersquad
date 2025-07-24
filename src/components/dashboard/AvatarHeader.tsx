'use client';

import { useAIAgent } from '@/providers/AIAgentProvider';
import Image from 'next/image';
import React from 'react';
import Logo from '../Logo';

export const AvatarHeader: React.FC = () => {
  const { agents, selectedAgent, setSelectedAgent } = useAIAgent();
 

  const userInitials = 'JD'; // This could come from user context

  return (
    <div className="hidden md:flex navbar bg-base-200 border-b border-base-300 px-4">
      {/* Left Side - Business Dropdown */}
       
      <div className='navbar-start'><Logo/></div>
      {/* Center - AI Agent Avatars */}
      <div className="navbar-center">
        <div className="flex items-center gap-6">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 ${
                selectedAgent?.id === agent.id
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-200 scale-110'
                  : 'hover:ring-2 hover:ring-base-content/20'
              }`}
              style={{
                backgroundColor: selectedAgent?.id === agent.id ? agent.primaryColor : 'var(--color-base-300)',
                color: selectedAgent?.id === agent.id ? agent.primaryColor : 'var(--color-base-content)'
              }}
              title={agent.name}
            >
              <Image src={agent.avatar || '/bot.webp'} alt={agent.name} width={24} height={24} className='rounded-full' />
            </button>
          ))}
        </div>
      </div>

      {/* Right Side - User Avatar with Dropdown */}
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-circle btn-lg bg-primary text-primary-content hover:bg-primary/80"
          >
            <span className="text-sm font-medium">{userInitials}</span>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li className="menu-title">
              <span className="text-xs text-base-content/70">Account</span>
            </li>
            <li>
              <button className="text-left">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
            </li>
            <li>
              <button className="text-left">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
            </li>
            <li>
              <button className="text-left">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Plan
              </button>
            </li>
            <li className="divider"></li>
            <li>
              <button className="text-left text-error">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 