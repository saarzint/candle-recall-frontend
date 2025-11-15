'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import ellipsisIcon from '@/assets/icons/ellipsis-horizontal.svg';
import viewIcon from '@/assets/icons/view.svg';
import pencilIcon from '@/assets/icons/pencil.svg';
import deleteIcon from '@/assets/icons/delete.svg';

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
        isDarkMode ? 'bg-[#18181B] hover:bg-[#3F3F46]' : 'bg-white hover:bg-gray-50'
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
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  isDarkMode
                    ? 'text-gray-300 border-gray-500 bg-[#27272A]'
                    : 'text-gray-700 border-border'
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
                  <Image
                    src={viewIcon}
                    alt="View"
                    width={20}
                    height={20}
                    className={isDarkMode ? 'brightness-0 invert' : ''}
                  />
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
                  <Image
                    src={pencilIcon}
                    alt="Edit"
                    width={20}
                    height={20}
                    className={isDarkMode ? 'brightness-0 invert' : ''}
                  />
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
                  <Image
                    src={deleteIcon}
                    alt="Delete"
                    width={20}
                    height={20}
                    className={isDarkMode ? 'brightness-0 invert' : ''}
                  />
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
