'use client';

import { useAIAgent } from '@/providers/AIAgentProvider';
import Image from 'next/image';
import React, { useState } from 'react';

export const MobileHeader: React.FC = () => {
  const { selectedAgent } = useAIAgent();
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  return (
    <>
      <div className="md:hidden fixed navbar bg-base-200 border-b border-base-300 px-4">
        <div className="navbar-center">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{
                backgroundColor: selectedAgent?.primaryColor || 'var(--color-primary)',
                color: selectedAgent?.accentColor || 'var(--color-primary-content)'
              }}
            >
              <Image src={selectedAgent?.avatar || '/bot.webp'} alt={selectedAgent?.name || ''} width={24} height={24} className='rounded-full' />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-base-content">
                {selectedAgent?.name}
              </h1>
              <p className="text-xs text-base-content/70">
                {selectedAgent?.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Settings Button */}
        <div className="navbar-end">
          <button
            onClick={() => setShowSettingsDrawer(true)}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Settings Drawer */}
      <div className={`drawer drawer-end ${showSettingsDrawer ? 'drawer-open' : ''}`}>
        <input id="settings-drawer" type="checkbox" className="drawer-toggle" checked={showSettingsDrawer} onChange={() => {}} />
        <div className="drawer-side z-[60]">
          <label htmlFor="settings-drawer" className="drawer-overlay" onClick={() => setShowSettingsDrawer(false)}></label>
          <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Agent Settings</h2>
              <button 
                onClick={() => setShowSettingsDrawer(false)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Agent Profile */}
            <div className="text-center mb-6 pb-6 border-b border-base-300">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"
                style={{
                  backgroundColor: selectedAgent?.primaryColor || 'var(--color-primary)',
                  color: selectedAgent?.accentColor || 'var(--color-primary-content)'
                }}
              >
                {selectedAgent?.avatar}
              </div>
              <h3 className="text-lg font-bold text-base-content mb-1">
                {selectedAgent?.name}
              </h3>
              <p className="text-sm text-base-content/70">
                {selectedAgent?.description}
              </p>
            </div>

            {/* Agent Settings */}
            <div className="space-y-2">
              <button className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-base-300 text-base-content">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                    <span className="text-xs">⚙️</span>
                  </div>
                  <span className="text-sm">Personality</span>
                </div>
              </button>
              
              <button className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-base-300 text-base-content">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                    <span className="text-xs">🎯</span>
                  </div>
                  <span className="text-sm">Capabilities</span>
                </div>
              </button>
              
              <button className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-base-300 text-base-content">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                    <span className="text-xs">📝</span>
                  </div>
                  <span className="text-sm">Response Style</span>
                </div>
              </button>
              
              <button className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-base-300 text-base-content">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                    <span className="text-xs">🔒</span>
                  </div>
                  <span className="text-sm">Privacy</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 