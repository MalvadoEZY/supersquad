'use client';

import { useAIAgent } from '@/providers/AIAgentProvider';
import React, { useState } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const { selectedAgent } = useAIAgent();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm ${selectedAgent?.name}. How can I help you today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response from ${selectedAgent?.name}. I'm here to help you with your questions and tasks.`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col  overflow-y-none md:h-full  ">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-scroll  max-md:top-16 max-md:max-h-[calc(100vh-4.5rem-9rem)] relative p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-300 text-base-content'
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-base-300 max-md:fixed bottom-18  left-0 right-0 bg-base-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Message ${selectedAgent?.name}...`}
            className="flex-1 px-4 py-2 rounded-lg bg-base-300 text-base-content border border-base-300 focus:border-primary focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 rounded-lg bg-primary text-primary-content hover:bg-primary/80 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}; 