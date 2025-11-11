'use client';

import { ReactNode } from 'react';
import { Sidebar, TopBar } from '@/components/common';
import { ThemeProvider } from '@/contexts/ThemeContext';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  actionButton?: ReactNode;
}

export default function DashboardLayout({ children, title, actionButton }: DashboardLayoutProps) {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-body-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <TopBar title={title} actionButton={actionButton} />

          {/* Main Content Area with Scrolling */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-secondary">
            <div className="flex-1 flex flex-col px-4 py-4">
              {children}
            </div>

            {/* Footer Disclaimer */}
            <div className="text-center py-6 px-4 bg-secondary">
              <p className="text-xs text-gray-500">
                Not affiliated with TD Ameritrade, Charles Schwab, or OpenAI.
                Not investment advice. For entertainment purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
