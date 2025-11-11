'use client';

import { DashboardLayout } from '@/components/layouts';
import { NewReportContent } from '@/components/reports';
import Link from 'next/link';

export default function NewReportPage() {
  return (
    <DashboardLayout
      showTitle={false}
      breadcrumb={
        <div className="flex items-center gap-2 text-sm">
          <Link href="/reports" className="text-muted-foreground hover:text-foreground transition-colors">
            Reports
          </Link>
          <span className="text-muted-foreground">&gt;</span>
          <span className="text-foreground font-medium">New Report</span>
        </div>
      }
    >
      <NewReportContent />
    </DashboardLayout>
  );
}
