'use client';

import { useAIAgent } from '@/providers/AIAgentProvider';
import React from 'react';

export const Sidebar: React.FC = () => {
  const { selectedAgent } = useAIAgent();

  if (!selectedAgent) return null;

  return (
    <div className="w-64 bg-base-200 border-r border-base-300 h-full overflow-y-auto">
      <div className="p-4">
        {/* AI Agent Profile */}
        <div className="text-center mb-6 pb-6 border-b border-base-300">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-3"
            style={{
              backgroundColor: selectedAgent.primaryColor,
              color: selectedAgent.accentColor
            }}
          >
            {selectedAgent.avatar}
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
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-base-content/70 mb-3 uppercase tracking-wide">
            Agent Settings
          </h3>
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

        {/* User Settings */}
        <div>
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