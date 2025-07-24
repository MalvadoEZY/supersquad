'use client';

import { useAIAgent } from '@/providers/AIAgentProvider';
import React, { useState } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const questionTemplates = [
  "How can I improve my productivity?",
  "What's the best way to manage my team?",
  "Can you help me with project planning?",
  "How do I handle difficult conversations?",
  "What are some effective leadership strategies?"
];

export const ChatInterface: React.FC = () => {
  const { selectedAgent } = useAIAgent();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm ${selectedAgent?.name}. I'm here to help you with productivity, leadership, and team management. What would you like to discuss today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (content?: string) => {
    const messageContent = content || inputValue;
    if (!messageContent.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for asking about "${messageContent}". I'd be happy to help you with that. Let me provide some insights and actionable advice.`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-base-100 to-base-200">
      {/* Question Templates */}
      <div className="p-6 border-b border-base-300 bg-base-100/50 backdrop-blur-sm">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-base-content mb-2">Quick Questions</h3>
          <p className="text-sm text-base-content/70">Tap to ask a question</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {questionTemplates.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(question)}
              className="px-4 py-2 bg-base-200 hover:bg-base-300 text-base-content rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start gap-3 max-w-2xl">
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
              <div
                className={`px-6 py-4 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-content ml-auto'
                    : 'bg-base-100 text-base-content border border-base-300'
                }`}
              >
                <div className="text-sm leading-relaxed">{message.content}</div>
                <div className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-base-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-semibold text-base-content">U</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-base-300 bg-base-100/80 backdrop-blur-sm">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Message ${selectedAgent?.name}...`}
              className="w-full px-4 py-3 rounded-2xl bg-base-200 text-base-content border border-base-300 focus:border-primary focus:outline-none resize-none min-h-[48px] max-h-32"
              rows={1}
            />
          </div>
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            className="px-6 py-3 rounded-2xl bg-primary text-primary-content hover:bg-primary/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}; 