'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import documentIcon from '@/assets/icons/document.svg';
import calendarIcon from '@/assets/icons/calendar.svg';
import sortIcon from '@/assets/icons/sort.svg';

export default function ReportFilters() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [stockFilter, setStockFilter] = useState('All stocks');
  const [timeFilter, setTimeFilter] = useState('All time');
  const [sortFilter, setSortFilter] = useState('Sort');

  return (
    <div className="flex items-center justify-end gap-3 mb-6">
      {/* Stock Filter */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-base-foreground"
      >
        <Image
          src={documentIcon}
          alt="Document filter"
          width={16}
          height={16}
          className={isDarkMode ? 'brightness-200' : ''}
        />
        {stockFilter}
      </button>

      {/* Time Filter */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-base-foreground"
      >
        <Image
          src={calendarIcon}
          alt="Calendar filter"
          width={16}
          height={16}
          className={isDarkMode ? 'brightness-200' : ''}
        />
        {timeFilter}
      </button>

      {/* Sort Filter */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-base-foreground"
      >
        <Image
          src={sortIcon}
          alt="Sort filter"
          width={16}
          height={16}
          className={isDarkMode ? 'brightness-200' : ''}
        />
        {sortFilter}
      </button>
    </div>
  );
}
