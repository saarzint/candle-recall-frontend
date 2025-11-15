'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import documentIcon from '@/assets/icons/document.svg';
import calendarIcon from '@/assets/icons/calendar.svg';
import sortIcon from '@/assets/icons/sort.svg';
import alphabetIcon from '@/assets/icons/alphabet.svg';
import timeIcon from '@/assets/icons/time.svg';
import timerResetIcon from '@/assets/icons/timer-reset.svg';

type SortOption = 'Alphabet' | 'Created time' | 'Last modify';

interface Stock {
  symbol: string;
  selected: boolean;
}

export default function ReportFilters() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [stockFilter, setStockFilter] = useState('All stocks');
  const [timeFilter, setTimeFilter] = useState('All time');
  const [sortFilter, setSortFilter] = useState<SortOption>('Alphabet');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [showAllStocks, setShowAllStocks] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'SCA', selected: true },
    { symbol: 'AAPL', selected: false },
    { symbol: 'PCA', selected: false },
    { symbol: 'TSLA', selected: false },
    { symbol: 'GOOGL', selected: false },
    { symbol: 'MSFT', selected: false },
  ]);
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const stockMenuRef = useRef<HTMLDivElement>(null);
  const timeMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (stockMenuRef.current && !stockMenuRef.current.contains(event.target as Node)) {
        setIsStockOpen(false);
      }
      if (timeMenuRef.current && !timeMenuRef.current.contains(event.target as Node)) {
        setIsTimeOpen(false);
      }
    };

    if (isSortOpen || isStockOpen || isTimeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen, isStockOpen, isTimeOpen]);

  const sortOptions: SortOption[] = ['Alphabet', 'Created time', 'Last modify'];

  const handleSortSelect = (option: SortOption) => {
    setSortFilter(option);
    setIsSortOpen(false);
  };

  const handleStockToggle = (symbol: string) => {
    setStocks(stocks.map(stock =>
      stock.symbol === symbol ? { ...stock, selected: !stock.selected } : stock
    ));
  };

  const handleCreateNewStock = () => {
    // TODO: Implement create new stock functionality
    console.log('Create new stock');
    setIsStockOpen(false);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setTimeFilter(formatDate(date));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleTimePreset = (preset: string) => {
    setTimeFilter(preset);
    const today = new Date();

    switch (preset) {
      case 'This week':
        setSelectedDate(today);
        break;
      case 'This month':
        setSelectedDate(today);
        break;
      case 'All time':
        setSelectedDate(null);
        break;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const displayedStocks = showAllStocks ? stocks : stocks.slice(0, 3);
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const calendarDays = getDaysInMonth(currentMonth);

  return (
    <div className="flex items-center justify-end gap-3 mb-6">
      {/* Stock Filter */}
      <div className="relative" ref={stockMenuRef}>
        <button
          onClick={() => setIsStockOpen(!isStockOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-base-foreground hover:bg-sidebar-foreground"
        >
          <Image
            src={documentIcon}
            alt="Document filter"
            width={16}
            height={16}
            className={isDarkMode ? 'brightness-0 invert' : ''}
          />
          {stockFilter}
        </button>

        {/* Stock Dropdown */}
        {isStockOpen && (
          <div
            className={`absolute left-0 mt-2 w-72 rounded-xl shadow-lg z-10 overflow-hidden ${
              isDarkMode ? 'bg-[#18181B]' : 'bg-white'
            }`}
          >
            {/* Dropdown Header */}
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-medium text-foreground">Last Stocks</h3>
            </div>

            {/* Stock List */}
            <div className="py-2 max-h-64 overflow-y-auto">
              {displayedStocks.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => handleStockToggle(stock.symbol)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-[#27272A]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{stock.symbol}</span>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    stock.selected
                      ? 'bg-primary border-primary'
                      : 'border-gray-400'
                  }`}>
                    {stock.selected && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </button>
              ))}

              {/* Show More Button */}
              {!showAllStocks && stocks.length > 3 && (
                <button
                  onClick={() => setShowAllStocks(true)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm transition-colors ${
                    isDarkMode
                      ? 'text-gray-400 hover:bg-[#27272A]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>Show more</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Create New Stock Button */}
            <div className="border-t border-border">
              <button
                onClick={handleCreateNewStock}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-[#27272A]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="8" x2="12" y2="16" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Create new stock</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Time Filter */}
      <div className="relative" ref={timeMenuRef}>
        <button
          onClick={() => setIsTimeOpen(!isTimeOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-base-foreground hover:bg-sidebar-foreground"
        >
          <Image
            src={calendarIcon}
            alt="Calendar filter"
            width={16}
            height={16}
            className={isDarkMode ? 'brightness-0 invert' : ''}
          />
          {timeFilter}
        </button>

        {/* Time/Calendar Dropdown */}
        {isTimeOpen && (
          <div
            className={`absolute left-0 mt-2 w-80 rounded-xl shadow-lg z-10 overflow-hidden ${
              isDarkMode ? 'bg-[#18181B]' : 'bg-white'
            }`}
          >
            {/* Preset Options */}
            <div className="p-4 border-b border-border">
              <select
                value={timeFilter}
                onChange={(e) => handleTimePreset(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  isDarkMode ? 'bg-[#27272A] text-white' : 'bg-white text-gray-900'
                }`}
              >
                <option value="This week">This week</option>
                <option value="This month">This month</option>
                <option value="Last month">Last month</option>
                <option value="All time">All time</option>
              </select>
            </div>

            {/* Calendar */}
            <div className="p-4">
              {/* Month/Year Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 rounded hover:bg-sidebar-foreground transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className="text-sm font-medium text-foreground">{monthYear}</span>
                <button
                  onClick={handleNextMonth}
                  className="p-1 rounded hover:bg-sidebar-foreground transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} />;
                  }

                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const isSelected = isSameDay(selectedDate, date);

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(date)}
                      className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-primary text-white'
                          : isDarkMode
                          ? 'text-gray-300 hover:bg-[#27272A]'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sort Filter */}
      <div className="relative" ref={sortMenuRef}>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-base-foreground hover:bg-sidebar-foreground"
        >
          <Image
            src={sortIcon}
            alt="Sort filter"
            width={16}
            height={16}
            className={isDarkMode ? 'brightness-0 invert' : ''}
          />
          Sort
        </button>

        {/* Sort Dropdown */}
        {isSortOpen && (
          <div
            className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg z-10 overflow-hidden ${
              isDarkMode ? 'bg-[#18181B]' : 'bg-white'
            }`}
          >
            {/* Dropdown Header */}
            <div className="px-4 py-3">
              <h3 className="text-sm font-medium text-foreground">Sort by</h3>
            </div>

            {/* Sort Options */}
            <div className="py-2">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSortSelect(option)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors ${
                    sortFilter === option
                      ? isDarkMode
                        ? 'bg-[#27272A] text-white'
                        : 'bg-gray-100 text-gray-900'
                      : isDarkMode
                      ? 'text-gray-300 hover:bg-[#27272A]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {option === 'Alphabet' && (
                      <Image
                        src={alphabetIcon}
                        alt="Alphabet"
                        width={20}
                        height={20}
                        className={isDarkMode ? 'brightness-0 invert' : ''}
                      />
                    )}
                    {option === 'Created time' && (
                      <Image
                        src={timeIcon}
                        alt="Time"
                        width={20}
                        height={20}
                        className={isDarkMode ? 'brightness-0 invert' : ''}
                      />
                    )}
                    {option === 'Last modify' && (
                      <Image
                        src={timerResetIcon}
                        alt="Last modify"
                        width={20}
                        height={20}
                        className={isDarkMode ? 'brightness-0 invert' : ''}
                      />
                    )}
                    <span>{option}</span>
                  </div>
                  {sortFilter === option && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
