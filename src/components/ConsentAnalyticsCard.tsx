'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

interface ConsentStats {
  total_consents: number;
  granted: number;
  revoked: number;
  last_30_days: number;
  per_doctor: Record<string, number>;
}

export default function ConsentAnalyticsCard() {
  const [stats, setStats] = useState<ConsentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.get('http://localhost:8000/analytics/consent-summary', {
          params: { user_id: 'user123' }, // ✅ Use a valid user ID
        });
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching consent stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const doctorChartData = stats
    ? Object.entries(stats.per_doctor).map(([doctor, count]) => ({
        doctor,
        count,
      }))
    : [];

  return (
    <Card className="bg-zinc-900 text-white p-6 rounded-xl shadow-xl">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">📊 Consent Analytics</h2>
        {loading ? (
          <p>Loading...</p>
        ) : stats ? (
          <div className="space-y-3">
            <p>✅ Total Consents: {stats.total_consents}</p>
            <p>🟢 Granted: {stats.granted}</p>
            <p>🔴 Revoked: {stats.revoked}</p>
            <p>🗓️ Past 30 Days: {stats.last_30_days}</p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Consents per Doctor</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={doctorChartData}>
                  <XAxis dataKey="doctor" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </CardContent>
    </Card>
  );
}
