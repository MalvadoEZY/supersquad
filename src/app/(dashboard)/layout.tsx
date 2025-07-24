import { AIAgentProvider } from '@/providers/AIAgentProvider';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-100">
    <AIAgentProvider>
        {children}
    </AIAgentProvider>
    </div>
  );
} 