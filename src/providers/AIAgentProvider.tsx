'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface AIAgent {
  id: string;
  name: string;
  avatar: string;
  description: string;
  color: string;
  primaryColor: string;
}

interface AIAgentContextType {
  selectedAgent: AIAgent | null;
  setSelectedAgent: (agent: AIAgent) => void;
  agents: AIAgent[];
}

const AIAgentContext = createContext<AIAgentContextType | undefined>(undefined);

const defaultAgents: AIAgent[] = [
  {
    id: 'social',
    name: 'Claudia',
    avatar: '/bot.webp',
    description: 'Social Media Assistant',
    color: 'blue',
    primaryColor: 'oklch(45% 0.18 270)',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    avatar: '/bot.webp',
    description: 'Marketing Assistant',
    color: 'green',
    primaryColor: 'oklch(65% 0.18 140)',
  },
 
];

export const AIAgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(defaultAgents[0]);

  return (
    <AIAgentContext.Provider value={{
      selectedAgent,
      setSelectedAgent,
      agents: defaultAgents
    }}>
      {children}
    </AIAgentContext.Provider>
  );
};

export const useAIAgent = () => {
  const context = useContext(AIAgentContext);
  if (context === undefined) {
    throw new Error('useAIAgent must be used within an AIAgentProvider');
  }
  return context;
}; 