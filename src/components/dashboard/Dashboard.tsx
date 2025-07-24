'use client';

import { useAIAgent } from '@/providers/AIAgentProvider';
import React, { useState } from 'react';
import { AvatarHeader } from './AvatarHeader';
import { BottomNavigation } from './BottomNavigation';
import { ChatInterface } from './ChatInterface';
import { MobileHeader } from './MobileHeader';
import { Sidebar } from './Sidebar';

export const Dashboard: React.FC = () => {
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
          {/* Desktop Chat Header */}
          <div
            className="hidden md:block p-4 border-b border-base-300 relative"
            style={{
              backgroundColor: selectedAgent?.secondaryColor || 'var(--color-base-200)'
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{
                  backgroundColor: selectedAgent?.primaryColor || 'var(--color-primary)',
                  color: selectedAgent?.accentColor || 'var(--color-primary-content)'
                }}
              >
                {selectedAgent?.avatar}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-base-content">
                  {selectedAgent?.name}
                </h1>
                <p className="text-sm text-base-content/70">
                  {selectedAgent?.description}
                </p>
              </div>
            </div>
            {/* Absolutely position the cog */}
            <button
              onClick={() => setShowSettingsDrawer(true)}
              className="btn btn-ghost btn-sm btn-circle absolute top-4 right-4"
              aria-label="Agent Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          
          {/* Chat Interface */}
          <div className="flex-1 md:pb-0 pb-16">
            <ChatInterface />
          </div>
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
      )}
    </div>
  );
};