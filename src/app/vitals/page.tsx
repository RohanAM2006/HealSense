"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Type definition
interface VitalsEntry {
  timestamp: string;
  heartRate: number;
  bloodPressure: string;
  bloodSugar: number;
  oxygenLevel: number;
}

const sampleData: VitalsEntry[] = [
  { timestamp: "2025-06-25", heartRate: 72, bloodPressure: "120/80", bloodSugar: 95, oxygenLevel: 98 },
  { timestamp: "2025-06-26", heartRate: 76, bloodPressure: "122/82", bloodSugar: 99, oxygenLevel: 97 },
  { timestamp: "2025-06-27", heartRate: 70, bloodPressure: "118/78", bloodSugar: 92, oxygenLevel: 99 },
];

export default function VitalsHistoryPage() {
  const [data, setData] = useState<VitalsEntry[]>(sampleData);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchVitals = () => {
      fetch("http://localhost:8000/vitals")
        .then((res) => res.json())
        .then((resData) => {
          if (resData && Array.isArray(resData.vitals)) {
            setData(resData.vitals);
            setLastUpdated(new Date());
          } else {
            console.warn("Unexpected format");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching vitals:", err);
          setLoading(false);
        });
    };

    fetchVitals();
    const intervalId = setInterval(fetchVitals, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <main className="max-w-5xl mx-auto py-10 px-6 text-white">
        <h1 className="text-3xl font-bold mb-3 text-center text-purple-400">📊 Vitals History</h1>

        {lastUpdated && (
          <p className="text-sm text-gray-500 text-center mb-6">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}

        {loading ? (
          <p className="text-center text-gray-400">Loading vitals data...</p>
        ) : (
          <div className="space-y-10">
            <VitalsChart title="Heart Rate (bpm)" data={data} dataKey="heartRate" stroke="#3b82f6" />
            <VitalsChart title="Blood Sugar (mg/dL)" data={data} dataKey="bloodSugar" stroke="#facc15" />
            <VitalsChart title="Oxygen Level (%)" data={data} dataKey="oxygenLevel" stroke="#10b981" />
          </div>
        )}
      </main>
    </div>
  );
}

// ✅ Define the VitalsChart component BELOW VitalsHistoryPage
function VitalsChart({
  title,
  data,
  dataKey,
  stroke,
}: {
  title: string;
  data: VitalsEntry[];
  dataKey: string;
  stroke: string;
}) {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="timestamp" tick={{ fill: "white", fontSize: 12 }} />
          <YAxis tick={{ fill: "white", fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
