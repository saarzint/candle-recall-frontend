'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from '@/assets/icons/icon.svg';
import SidebarToggle from '@/assets/icons/sidebar-toggle.svg';
import PinIcon from '@/assets/icons/pin.svg';
import EllipsisIcon from '@/assets/icons/ellipsis-horizontal.svg';
import ChatIcon from '@/assets/icons/chat.svg';
import ExportIcon from '@/assets/icons/export.svg';
import SearchIcon from '@/assets/icons/search.svg';
import { useTheme } from '@/contexts/ThemeContext';

interface Chat {
  id: string;
  name: string;
  isPinned?: boolean;
}

interface Report {
  id: string;
  name: string;
}

export default function Sidebar() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReportsExpanded, setIsReportsExpanded] = useState(true);
  const [reports] = useState<Report[]>([
    { id: '1', name: 'AAPL Analysis' },
    { id: '2', name: 'Finance Friends' },
    { id: '3', name: 'Trading Tactics' },
  ]);
  const [chats] = useState<Chat[]>([
    { id: '1', name: 'Finance Friends', isPinned: true },
    { id: '2', name: 'Trading Tactics' },
    { id: '3', name: 'Risk & Reward Roundtable After...' },
  ]);

  return (
    <aside className={`${isCollapsed ? 'w-[60px]' : 'w-[260px]'} bg-background border-r border-border flex flex-col h-screen transition-all duration-300`}>
      {/* Logo and Brand */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center flex-col gap-2' : 'gap-3'} px-4 py-4`}>
        {!isCollapsed && <Image src={Icon} alt="Candle Recall" width={32} height={32} />}
        {!isCollapsed && <h1 className="text-lg font-bold text-logo">Candle Recall</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`${isCollapsed ? '' : 'ml-auto'} p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded`}
        >
          <Image
            src={SidebarToggle}
            alt="Toggle Sidebar"
            width={16}
            height={16}
            className={isDarkMode ? 'brightness-0 invert' : ''}
          />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {/* Search */}
        <button className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-3 hover:bg-sidebar-foreground rounded-md text-left`}>
          <Image
            src={SearchIcon}
            alt="Search"
            width={18}
            height={18}
            className={isDarkMode ? 'brightness-0 invert' : ''}
          />
          {!isCollapsed && <span className="text-sm text-foreground">Search</span>}
        </button>

        {/* New Chat */}
        <Link
          href="/dashboard"
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-3 ${
            pathname === '/dashboard' ? 'bg-sidebar-foreground' : 'hover:bg-sidebar-foreground'
          } rounded-md text-left`}
        >
          <Image
            src={ChatIcon}
            alt="New Chat"
            width={18}
            height={18}
            className={isDarkMode ? 'brightness-0 invert' : ''}
          />
          {!isCollapsed && <span className={`text-sm ${pathname === '/dashboard' ? 'text-foreground font-medium' : 'text-foreground'}`}>New Chat</span>}
        </Link>

        {/* Reports */}
        <div>
          <div
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${
              pathname.startsWith('/reports') ? 'bg-sidebar-foreground' : 'hover:bg-sidebar-foreground'
            } rounded-md`}
          >
            <Link
              href="/reports"
              className="flex items-center gap-3 px-3 py-3 flex-1"
            >
              <Image
                src={ExportIcon}
                alt="Reports"
                width={18}
                height={18}
                className={isDarkMode ? 'brightness-0 invert' : ''}
              />
              {!isCollapsed && (
                <span className={`text-sm ${pathname.startsWith('/reports') ? 'text-foreground font-medium' : 'text-foreground'}`}>
                  Reports
                </span>
              )}
            </Link>
            {!isCollapsed && (
              <button
                onClick={() => setIsReportsExpanded(!isReportsExpanded)}
                className="px-3 py-3"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${isReportsExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* Reports List */}
          {!isCollapsed && isReportsExpanded && (
            <div className="mt-1 ml-9 space-y-1 border-l border-border pl-3">
              {reports.map((report) => (
                <Link
                  key={report.id}
                  href={`/reports/${report.id}`}
                  className={`block px-3 py-2 text-sm ${
                    pathname === `/reports/${report.id}`
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  } rounded-md hover:bg-sidebar-foreground`}
                >
                  {report.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Chats Section */}
        {!isCollapsed && (
          <div className="mt-6">
            <div className="px-1 py-2">
              <h2 className="text-xs font-semibold text-muted-foreground">
                Chats
              </h2>
            </div>

            {chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={`relative group flex items-center gap-3 px-3 py-3 ${
                  pathname === `/chat/${chat.id}` ? 'bg-sidebar-foreground' : 'hover:bg-sidebar-foreground'
                } rounded-md cursor-pointer`}
              >
                <span className="flex-1 text-sm text-foreground truncate">
                  {chat.name}
                </span>
                {chat.isPinned ? (
                  <button className="p-1">
                    <Image
                      src={PinIcon}
                      alt="Pinned"
                      width={12}
                      height={12}
                      className={isDarkMode ? 'brightness-0 invert' : ''}
                    />
                  </button>
                ) : (
                  <button className="p-1 opacity-0 group-hover:opacity-100">
                    <Image
                      src={EllipsisIcon}
                      alt="More options"
                      width={12}
                      height={12}
                      className={isDarkMode ? 'brightness-0 invert' : ''}
                    />
                  </button>
                )}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
}
