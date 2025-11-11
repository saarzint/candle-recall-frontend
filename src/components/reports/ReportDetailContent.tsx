'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import pencilIcon from '@/assets/icons/pencil.svg';
import ellipsisIcon from '@/assets/icons/ellipsis-horizontal.svg';

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface ReportDetailContentProps {
  reportId: string;
}

// Sample data - Replace with actual API call
const sampleReportData: Record<string, {
  title: string;
  createdDate: string;
  modifiedDate: string;
  tags: string[];
  content: string;
}> = {
  '1': {
    title: 'AAPL Analysis',
    createdDate: 'Jul 14 2025',
    modifiedDate: 'Jul 15 2025',
    tags: ['AAPL', 'Candles', 'Chart', 'BTC', 'Bull'],
    content: `Here's a detailed analysis of Apple's (AAPL) stock performance over the past year, including tables and key insights:

# 1-Year Price Overview (Based on Yahoo/Macrotrends)

| Period | Price |
|--------|-------|
| 52-week high | $260.10 |
| 52-week low | $169.21 |
| 52-week average | $222.70 |

- All-time high close: $258.40 (Dec 26, 2024)
- 52-week high/low span: ~+23.4 % / −19.7 % from current price

# Monthly Trend Highlights (Dec 2024 – Jul 2025)

- **Dec 2024:** Reached all-time high (~$258), closing the year strong
- **Q1 2025:** Fell ~20% YTD by April amidst AI lag and tariff concerns
- **April–June 2025:** Slight recovery on tariff exemptions (~+5%), but still lagging S&P 500
- **June–July 2025:** Additional dip (~16% YTD) on weak iPhone 16 sales and slow AI integration

# Summary & Outlook

- **Short-term:** Under pressure from weak iPhone sales and slow AI integration`
  },
  '2': {
    title: 'Finance Friends',
    createdDate: 'Jul 10 2025',
    modifiedDate: 'Jul 12 2025',
    tags: ['Finance', 'Analysis'],
    content: '# Finance Friends Report\n\nThis is a sample report content for Finance Friends.'
  },
  '3': {
    title: 'Trading Tactics',
    createdDate: 'Jul 8 2025',
    modifiedDate: 'Jul 11 2025',
    tags: ['Trading', 'Strategy'],
    content: '# Trading Tactics Report\n\nThis is a sample report content for Trading Tactics.'
  }
};

export default function ReportDetailContent({ reportId }: ReportDetailContentProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Get report data
  const reportData = sampleReportData[reportId] || sampleReportData['1'];

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(reportData.content);
  const [title, setTitle] = useState(reportData.title);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving report:', { title, content });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(reportData.content);
    setTitle(reportData.title);
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto w-full mb-6">
        {/* Title and Actions */}
        <div className="flex items-start justify-between mb-4">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`text-3xl font-bold bg-transparent border-b-2 border-border focus:outline-none focus:border-primary ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            />
          ) : (
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          )}

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-sidebar-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-lg hover:bg-sidebar-foreground transition-colors"
                >
                  <Image
                    src={pencilIcon}
                    alt="Edit"
                    width={20}
                    height={20}
                    className={isDarkMode ? 'brightness-0 invert' : ''}
                  />
                </button>
                <button className="p-2 rounded-lg hover:bg-sidebar-foreground transition-colors">
                  <Image
                    src={ellipsisIcon}
                    alt="More options"
                    width={20}
                    height={20}
                    className={isDarkMode ? 'brightness-0 invert' : ''}
                  />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Created time</span>
            <span className="text-foreground font-medium">{reportData.createdDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Last modify</span>
            <span className="text-foreground font-medium">{reportData.modifiedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Stock tags</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {reportData.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium border border-border ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto w-full">
          <div
            className={`rounded-xl p-6 ${
              isDarkMode ? 'bg-[#18181B]' : 'bg-white'
            }`}
            data-color-mode={isDarkMode ? 'dark' : 'light'}
          >
          {isEditing ? (
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              height={600}
              preview="live"
              hideToolbar={false}
            />
          ) : (
            <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
