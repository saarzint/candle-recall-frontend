'use client';

import ReportFilters from './ReportFilters';
import ReportCard from './ReportCard';

export default function ReportsContent() {
  // Mock data for reports
  const reports = [
    {
      id: 1,
      title: 'AAPL Analysis',
      date: 'Jul 14 2025',
      description: "Here's a detailed analysis of Apple's (AAPL) stock performanc...",
      tags: ['AAPL', 'Candles', 'Chart'],
    },
    {
      id: 2,
      title: 'AAPL Analysis',
      date: 'July 14, 2025',
      description: "Here's a comprehensive review of Apple's (AAPL) stock traject...",
      tags: ['AAPL', 'PCA'],
    },
    {
      id: 3,
      title: 'AAPL Analysis',
      date: 'July 14, 2025',
      description: "Here's a comprehensive review of Apple's (AAPL) stock traject...",
      tags: ['AAPL'],
    },
    {
      id: 4,
      title: 'AAPL Analysis',
      date: 'July 14, 2025',
      description: "Here's a comprehensive review of Apple's (AAPL) stock traject...",
      tags: ['AAPL', 'PCA'],
    },
    {
      id: 5,
      title: 'AAPL Analysis',
      date: 'July 14, 2025',
      description: "Here's a comprehensive review of Apple's (AAPL) stock traject...",
      tags: ['AAPL', 'PCA', 'SCA'],
    },
    {
      id: 6,
      title: 'AAPL Analysis',
      date: 'July 14, 2025',
      description: "Here's a comprehensive review of Apple's (AAPL) stock traject...",
      tags: ['AAPL', 'PCA', 'SCA', 'BTC'],
    },
    {
      id: 7,
      title: 'AAPL Analysis',
      date: 'July 14, 2025',
      description: "Here's a comprehensive review of Apple's (AAPL) stock traject...",
      tags: ['AAPL', 'PCA'],
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Filters */}
      <ReportFilters />

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-4">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            title={report.title}
            date={report.date}
            description={report.description}
            tags={report.tags}
          />
        ))}
      </div>
    </div>
  );
}
