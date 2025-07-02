"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

export default function HealthTrendChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/reports")
      .then(res => res.json())
      .then(json => {
        const reports = json.reports.reverse().map((r: any) => ({
          date: new Date(r.timestamp).toLocaleDateString(),
          score: r.health_score,
        }));
        setData(reports);
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">📈 Health Score Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
