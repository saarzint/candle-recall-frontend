'use client';

import addIcon from '@/assets/icons/add.svg';
import { ActiveChatContent } from '@/components/chat';
import { DashboardLayout } from '@/components/layouts';
import Image from 'next/image';
import { use } from 'react';

// Mock data - in production, this would come from an API or database
const mockChats = {
  '1': {
    id: '1',
    title: 'Analyze AAPL',
    messages: [
      {
        id: '1',
        role: 'user' as const,
        content: 'Analyze AAPL price trends for past year.',
      },
      {
        id: '2',
        role: 'assistant' as const,
        content:
          'Apple Inc. (AAPL) has shown significant growth over the past year. The stock has experienced an upward trend with some volatility due to market conditions and product announcements. Key factors include strong iPhone sales, services revenue growth, and market sentiment around new product releases.',
      },
    ],
  },
  '2': {
    id: '2',
    title: 'Trading Tactics',
    messages: [
      {
        id: '1',
        role: 'user' as const,
        content: 'What are some effective day trading strategies?',
      },
      {
        id: '2',
        role: 'assistant' as const,
        content:
          'Effective day trading strategies include: 1) Scalping - making numerous small profits on minor price changes, 2) Momentum trading - riding the wave of strong price movements, 3) Breakout trading - entering positions when price breaks through support or resistance levels, and 4) Gap trading - capitalizing on price gaps in the market.',
      },
    ],
  },
  '3': {
    id: '3',
    title: 'Risk & Reward Roundtable After...',
    messages: [],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: PageProps) {
  const { id } = use(params);

  const chat = mockChats[id as keyof typeof mockChats] || {
    id,
    title: 'New Chat',
    messages: [],
  };

  const handleCreateReport = () => {
    // TODO: Implement create report functionality
    console.log('Create new report');
  };

  return (
    <DashboardLayout
      title={chat.title}
      actionButton={
        <button
          onClick={handleCreateReport}
          className="flex items-center gap-2 px-4 py-2 bg-white border-border text-gray rounded-lg transition-colors font-medium text-sm"
        >
          <Image
            src={addIcon}
            alt="Add"
            width={16}
            height={16}
          />
          Create new report
        </button>
      }
    >
      <ActiveChatContent chatId={chat.id} initialMessages={chat.messages} />
    </DashboardLayout>
  );
}
