import { Card } from "@/components/ui/card";

export default function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <Card
      className={`p-6 rounded-xl bg-zinc-900/60 backdrop-blur-md shadow-xl border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-cyan-400 ${color}`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-xl font-bold text-white">{value}</h3>
      <p className="text-sm text-white/70">{label}</p>
    </Card>
  );
}
