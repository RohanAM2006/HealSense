'use client';

import ConsentAnalyticsCard from '@/components/ConsentAnalyticsCard';

export default function ConsentAnalyticsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">📊 Consent Analytics</h1>
      <ConsentAnalyticsCard />
    </main>
  );
}
