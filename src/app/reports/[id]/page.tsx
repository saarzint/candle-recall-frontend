'use client';

import { DashboardLayout } from '@/components/layouts';
import { ReportDetailContent } from '@/components/reports';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Sample data - Replace with actual API call
const sampleReportData: Record<string, { title: string }> = {
  '1': { title: 'AAPL Analysis' },
  '2': { title: 'Finance Friends' },
  '3': { title: 'Trading Tactics' }
};

export default function ReportDetailPage() {
  const params = useParams();
  const reportId = params.id as string;
  const reportData = sampleReportData[reportId] || sampleReportData['1'];

  return (
    <DashboardLayout
      showTitle={false}
      breadcrumb={
        <div className="flex items-center gap-2 text-sm">
          <Link href="/reports" className="text-muted-foreground hover:text-foreground transition-colors">
            Reports
          </Link>
          <span className="text-muted-foreground">&gt;</span>
          <span className="text-foreground font-medium">{reportData.title}</span>
        </div>
      }
    >
      <ReportDetailContent reportId={reportId} />
    </DashboardLayout>
  );
}
