'use client';

import { Sidebar, TopBar, ChatContent, PromptInput } from '@/components/dashboard';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function DashboardPage() {

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-body-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar title="New Chat" />

        {/* Chat Content Area with Scrolling */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-secondary">
          <div className="flex-1 flex flex-col items-center px-4 py-4">
            <ChatContent userName="Nick" />
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
