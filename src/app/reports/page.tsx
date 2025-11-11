'use client';

import { DashboardLayout } from '@/components/layouts';
import { ReportsContent } from '@/components/reports';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import addIcon from '@/assets/icons/add.svg';

export default function ReportsPage() {
  const router = useRouter();

  const handleCreateReport = () => {
    router.push('/reports/new');
  };

  return (
    <DashboardLayout
      title="Reports"
      actionButton={
        <button
          onClick={handleCreateReport}
          className="flex items-center gap-2 px-4 py-2 bg-white border-border text-gray rounded-lg transition-colors font-medium text-sm"
        >
          <Image
            src={addIcon}
            alt="Add"
            width={16}
            height={16}
          />
          Create new report
        </button>
      }
    >
      <ReportsContent />
    </DashboardLayout>
  );
}
