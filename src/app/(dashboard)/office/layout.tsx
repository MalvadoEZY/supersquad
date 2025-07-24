'use client';

import { AvatarHeader } from '@/components/dashboard/AvatarHeader';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';
    
import { MobileHeader } from '@/components/dashboard/MobileHeader';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { useAIAgent } from '@/providers/AIAgentProvider';
import React, { useState } from 'react';


export default function OfficeLayout({ children }: { children: React.ReactNode }) {


  const { selectedAgent } = useAIAgent();
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
   

  return (
    <div className="h-screen flex flex-col bg-base-100 relative">
      {/* Desktop Header - Give it a specific z-index */}
      <div className="relative z-40">
        <AvatarHeader />
      </div>
      
      {/* Mobile Header - Give it a specific z-index */}
      <div className="relative z-40">
        <MobileHeader />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
            {children}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />

      {/* Settings Drawer - HIGHER z-index than header */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-[60]"> {/* Higher than header z-40 */}
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSettingsDrawer(false)}
          />
          {/* Drawer Panel */}
          <div
            className="fixed right-0 top-0 h-full w-80 bg-base-200 shadow-lg flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-base-300">
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
                  color: selectedAgent?.primaryColor || 'var(--color-primary-content)'
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
      )}
    </div>
  );
};