'use client';

import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import createIcon from '@/assets/icons/create.svg';

interface CreateReportButtonProps {
  onClick: () => void;
}

export default function CreateReportButton({ onClick }: CreateReportButtonProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 border border-border rounded-lg transition-colors font-medium text-sm ${
        isDarkMode
          ? 'bg-[#18181B] text-gray-200 hover:bg-[#27272A]'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Image
        src={createIcon}
        alt="Create"
        width={16}
        height={16}
        className={isDarkMode ? 'brightness-0 invert' : ''}
      />
      Create new report
    </button>
  );
}
