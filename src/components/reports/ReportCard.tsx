'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import ellipsisIcon from '@/assets/icons/ellipsis-horizontal.svg';

interface ReportCardProps {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export default function ReportCard({ title, date, description, tags }: ReportCardProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleView = () => {
    console.log('View report:', title);
    setIsMenuOpen(false);
  };

  const handleEdit = () => {
    console.log('Edit report:', title);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    console.log('Delete report:', title);
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`rounded-xl p-6 transition-colors ${
        isDarkMode ? 'bg-[#18181B] hover:bg-[#27272A]' : 'bg-white hover:bg-gray-50'
      }`}
    >
      {/* Header with Tags and More Button */}
      <div className="flex items-start justify-between mb-2">
        {/* Left side: Title and Date */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>

        {/* Right side: Tags and More Options */}
        <div className="flex items-center gap-2 ml-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium border-1 border-border ${
                  isDarkMode
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* More Options Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Image
                src={ellipsisIcon}
                alt="More options"
                width={20}
                height={20}
                className={isDarkMode ? 'brightness-200' : ''}
              />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg z-10 overflow-hidden ${
                  isDarkMode ? 'bg-[#18181B]' : 'bg-white'
                }`}
              >
                <button
                  onClick={handleView}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-[#27272A]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12.5"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  View
                </button>

                <button
                  onClick={handleEdit}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-[#27272A]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-[#27272A]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6H5H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
    </div>
  );
}
