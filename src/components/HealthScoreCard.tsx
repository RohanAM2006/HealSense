function HealthScoreCard({ score }: { score: number }) {
  let statusText = "✅ Great!";
  let statusColor = "text-emerald-400";

  if (score < 40) {
    statusText = "⚠️ Needs Attention";
    statusColor = "text-yellow-400";
  } else if (score < 80) {
    statusText = "🟡 Moderate Health";
    statusColor = "text-orange-400";
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-lg shadow text-center">
      <h2 className="text-xl font-bold mb-2">Health Score</h2>
      <p className="text-4xl font-extrabold">{score}</p>
      <p className={`${statusColor} mt-2`}>{statusText}</p>
    </div>
  );
}
