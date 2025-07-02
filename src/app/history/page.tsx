// src/app/history/page.tsx
"use client";

import { useEffect, useState } from "react";

// Type definition
type Report = {
  filename: string;
  summary: string;
  timestamp: string;
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/reports")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.reports)) {
          setReports(data.reports);
        } else {
          console.error("❌ Unexpected response format:", data);
          setReports([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching reports:", err);
        setReports([]);
        setLoading(false);
      });
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 py-12 px-6">
    <main className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Past Medical Reports</h1>

      {loading && <p className="text-center text-gray-500">Loading reports...</p>}
      {!loading && reports.length === 0 && (
        <p className="text-center text-gray-500">No reports found.</p>
      )}

      <ul className="space-y-6">
        {reports.map((report, index) => (
          <li
            key={index}
            className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold truncate">{report.filename}</h2>
              <span className="text-sm text-gray-500">{report.timestamp}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{report.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  </div>
);
};