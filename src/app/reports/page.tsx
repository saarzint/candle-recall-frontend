'use client';

import { DashboardLayout } from '@/components/layouts';
import { ReportsContent, CreateReportButton } from '@/components/reports';
import { useRouter } from 'next/navigation';

export default function ReportsPage() {
  const router = useRouter();

  const handleCreateReport = () => {
    router.push('/reports/new');
  };

  return (
    <DashboardLayout
      title="Reports"
      actionButton={<CreateReportButton onClick={handleCreateReport} />}
    >
      <ReportsContent />
    </DashboardLayout>
  );
}
