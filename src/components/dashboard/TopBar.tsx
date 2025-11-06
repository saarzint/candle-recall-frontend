'use client';

import Image from 'next/image';
import SettingsIcon from '@/assets/icons/settings.svg';
import DayIcon from '@/assets/icons/day.svg';
import NightIcon from '@/assets/icons/night.svg';
import EllipsisIcon from '@/assets/icons/ellipsis-horizontal.svg';
import { useTheme } from '@/contexts/ThemeContext';

interface TopBarProps {
  title?: string;
}

export default function TopBar({ title = 'New Chat' }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <header className="h-16 bg-secondary flex items-center justify-between px-6">
      {/* Title */}
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>

      {/* Right Side Controls */}
      <div className="flex items-center gap-3">
        {/* More Options */}
        <button className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors">
          <Image
            src={EllipsisIcon}
            alt="More options"
            width={20}
            height={20}
            className={isDarkMode ? 'brightness-0 invert' : ''}
          />
        </button>

        {/* Theme Toggle Container */}
        <div className={`flex items-center rounded-full p-1 shadow-md border ${
          isDarkMode
            ? 'bg-[#18181B] border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={() => setTheme('light')}
            className={`p-2.5 rounded-full transition-all ${
              !isDarkMode
                ? 'bg-black'
                : ''
            }`}
          >
            <Image
              src={DayIcon}
              alt="Light mode"
              width={18}
              height={18}
              className={!isDarkMode ? 'brightness-0 invert' : 'opacity-50'}
            />
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`p-2.5 rounded-full transition-all ${
              isDarkMode
                ? 'bg-white'
                : ''
            }`}
          >
            <Image
              src={NightIcon}
              alt="Dark mode"
              width={18}
              height={18}
              className={!isDarkMode ? 'opacity-50' : ''}
            />
          </button>
        </div>

        {/* Settings */}
        <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
          <Image
            src={SettingsIcon}
            alt="Settings"
            width={20}
            height={20}
            className={isDarkMode ? 'brightness-0 invert' : ''}
          />
        </button>

        {/* User Profile */}
        <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-colors">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nick"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
