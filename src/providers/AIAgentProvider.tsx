'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface AIAgent {
  id: string;
  name: string;
  avatar: string;
  description: string;
  color: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface AIAgentContextType {
  selectedAgent: AIAgent | null;
  setSelectedAgent: (agent: AIAgent) => void;
  agents: AIAgent[];
}

const AIAgentContext = createContext<AIAgentContextType | undefined>(undefined);

const defaultAgents: AIAgent[] = [
  {
    id: 'claude',
    name: 'Claude',
    avatar: '/bot.webp',
    description: 'Anthropic\'s AI assistant',
    color: 'blue',
    primaryColor: 'oklch(45% 0.18 270)',
    secondaryColor: 'oklch(80% 0.18 100)',
    accentColor: 'oklch(80% 0.25 90)'
  },
  {
    id: 'gpt4',
    name: 'GPT-4',
    avatar: '/bot.webp',
    description: 'OpenAI\'s advanced AI',
    color: 'green',
    primaryColor: 'oklch(65% 0.18 140)',
    secondaryColor: 'oklch(80% 0.15 120)',
    accentColor: 'oklch(70% 0.2 110)'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    avatar: '/bot.webp',
    description: 'Google\'s AI model',
    color: 'purple',
    primaryColor: 'oklch(55% 0.2 300)',
    secondaryColor: 'oklch(75% 0.15 280)',
    accentColor: 'oklch(80% 0.25 290)'
  },
  {
    id: 'llama',
    name: 'Llama',
    avatar: '/bot.webp',
    description: 'Meta\'s open source AI',
    color: 'orange',
    primaryColor: 'oklch(60% 0.25 25)',
    secondaryColor: 'oklch(75% 0.2 30)',
    accentColor: 'oklch(80% 0.25 35)'
  },
  {
    id: 'mistral',
    name: 'Mistral',
    avatar: '/bot.webp',
    description: 'Mistral AI\'s model',
    color: 'cyan',
    primaryColor: 'oklch(70% 0.15 240)',
    secondaryColor: 'oklch(80% 0.1 220)',
    accentColor: 'oklch(85% 0.15 230)'
  },
  {
    id: 'palm',
    name: 'PaLM',
    avatar: '/bot.webp',
    description: 'Google\'s PaLM model',
    color: 'teal',
    primaryColor: 'oklch(60% 0.18 180)',
    secondaryColor: 'oklch(75% 0.15 170)',
    accentColor: 'oklch(80% 0.2 175)'
  },
  {
    id: 'cohere',
    name: 'Cohere',
    avatar: '/bot.webp',
    description: 'Cohere\'s AI platform',
    color: 'indigo',
    primaryColor: 'oklch(50% 0.2 260)',
    secondaryColor: 'oklch(70% 0.15 250)',
    accentColor: 'oklch(75% 0.2 255)'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    avatar: '/bot.webp',
    description: 'Anthropic\'s AI systems',
    color: 'emerald',
    primaryColor: 'oklch(55% 0.18 160)',
    secondaryColor: 'oklch(75% 0.15 150)',
    accentColor: 'oklch(80% 0.2 155)'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    avatar: '/bot.webp',
    description: 'OpenAI\'s AI models',
    color: 'rose',
    primaryColor: 'oklch(55% 0.25 15)',
    secondaryColor: 'oklch(70% 0.2 20)',
    accentColor: 'oklch(75% 0.25 25)'
  },
  {
    id: 'deepmind',
    name: 'DeepMind',
    avatar: '/bot.webp',
    description: 'DeepMind\'s AI research',
    color: 'violet',
    primaryColor: 'oklch(50% 0.2 320)',
    secondaryColor: 'oklch(70% 0.15 310)',
    accentColor: 'oklch(75% 0.2 315)'
  }
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