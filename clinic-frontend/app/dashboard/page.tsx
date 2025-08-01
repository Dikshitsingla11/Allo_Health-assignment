'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to queue page as default dashboard view
    router.push('/dashboard/queue');
  }, [router]);

  return null;
}