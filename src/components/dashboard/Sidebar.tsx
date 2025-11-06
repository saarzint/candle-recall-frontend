'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/assets/icons/icon.svg';
import SidebarToggle from '@/assets/icons/sidebar-toggle.svg';
import PinIcon from '@/assets/icons/pin.svg';
import EllipsisIcon from '@/assets/icons/ellipsis-horizontal.svg';
import ChatIcon from '@/assets/icons/chat.svg';
import ExportIcon from '@/assets/icons/export.svg';
import SearchIcon from '@/assets/icons/search.svg';

interface Chat {
  id: string;
  name: string;
  isPinned?: boolean;
}

export default function Sidebar() {
  const [chats] = useState<Chat[]>([
    { id: '1', name: 'Finance Friends', isPinned: true },
    { id: '2', name: 'Trading Tactics' },
    { id: '3', name: 'Risk & Reward Roundtable After...' },
  ]);

  return (
    <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
        <Image src={Icon} alt="Candle Recall" width={32} height={32} />
        <h1 className="text-lg font-bold text-logo">Candle Recall</h1>
        <button className="ml-auto p-1 hover:bg-gray-100 rounded">
          <Image src={SidebarToggle} alt="Toggle Sidebar" width={16} height={16} />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {/* Search */}
        <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-100 rounded-md text-left">
          <Image src={SearchIcon} alt="Search" width={18} height={18} />
          <span className="text-sm text-gray-700">Search</span>
        </button>

        {/* New Chat */}
        <Link
          href="/dashboard"
          className="w-full flex items-center gap-3 px-3 py-3 bg-gray-100 hover:bg-gray-200 rounded-md text-left"
        >
          <Image src={ChatIcon} alt="New Chat" width={18} height={18} />
          <span className="text-sm text-gray-900 font-medium">New Chat</span>
        </Link>

        {/* Reports */}
        <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-100 rounded-md text-left">
          <Image src={ExportIcon} alt="Reports" width={18} height={18} />
          <span className="text-sm text-gray-700">Reports</span>
        </button>

        {/* Chats Section */}
        <div className="mt-6">
          <div className="px-1 py-2">
            <h2 className="text-xs font-semibold text-gray-500">
              Chats
            </h2>
          </div>

          {chats.map((chat) => (
            <div
              key={chat.id}
              className="relative group flex items-center gap-3 px-3 py-3 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              <span className="flex-1 text-sm text-gray-700 truncate">
                {chat.name}
              </span>
              {chat.isPinned ? (
                <button className="p-1">
                  <Image src={PinIcon} alt="Pinned" width={12} height={12} />
                </button>
              ) : (
                <button className="p-1 opacity-0 group-hover:opacity-100">
                  <Image src={EllipsisIcon} alt="More options" width={12} height={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
