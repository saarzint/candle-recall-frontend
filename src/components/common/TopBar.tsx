'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SettingsIcon from '@/assets/icons/settings.svg';
import DayIcon from '@/assets/icons/day.svg';
import NightIcon from '@/assets/icons/night.svg';
import EllipsisIcon from '@/assets/icons/ellipsis-horizontal.svg';
import { useTheme } from '@/contexts/ThemeContext';
import { AccountModal, BillingModal } from '@/components/modals';

interface TopBarProps {
  title?: string;
  actionButton?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export default function TopBar({ title = 'New Chat', actionButton, breadcrumb }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
    setIsMenuOpen(false);
  };

  return (
    <header className="h-16 bg-secondary flex items-center justify-between px-6">
      {/* Title or Breadcrumb */}
      {breadcrumb || <h1 className="text-lg font-semibold text-foreground">{title}</h1>}

      {/* Action Button and Right Side Controls */}
      <div className="flex items-center gap-4">
        {/* Optional Action Button */}
        {actionButton && <div>{actionButton}</div>}

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

        {/* User Profile with Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-colors"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nick"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border overflow-hidden z-50 ${
              isDarkMode
                ? 'bg-[#18181B] border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              {/* Email */}
              <div className={`px-4 py-3 border-b ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <p className="text-sm text-muted-foreground">address@example.com</p>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAccountModalOpen(true);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    isDarkMode
                      ? 'text-gray-200 hover:bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Account
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsBillingModalOpen(true);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    isDarkMode
                      ? 'text-gray-200 hover:bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Billing
                </button>
                <Link
                  href="/support"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    isDarkMode
                      ? 'text-gray-200 hover:bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Support
                </Link>
              </div>

              {/* Logout */}
              <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                    isDarkMode
                      ? 'text-red-400 hover:bg-gray-800'
                      : 'text-red-600 hover:bg-gray-100'
                  }`}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Account Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />

      {/* Billing Modal */}
      <BillingModal
        isOpen={isBillingModalOpen}
        onClose={() => setIsBillingModalOpen(false)}
      />
    </header>
  );
}
