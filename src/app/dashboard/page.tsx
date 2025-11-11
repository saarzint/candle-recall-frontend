'use client';

import { DashboardLayout } from '@/components/layouts';
import { ChatContent } from '@/components/dashboard';

export default function DashboardPage() {
  return (
    <DashboardLayout title="New Chat">
      <div className="flex-1 flex flex-col items-center">
        <ChatContent userName="Nick" />
      </div>
    </DashboardLayout>
  );
}
