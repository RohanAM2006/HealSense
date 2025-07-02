// components/Topbar.tsx
export default function Topbar({ name, score }: { name: string; score: number }) {
  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-[#1f1f1f] to-[#2d2d2d] p-4 rounded-xl shadow">
      <div>
        <h2 className="text-2xl font-semibold">Good Morning, {name}! 👋</h2>
        <p className="text-sm text-gray-400">Ready to take charge of your health today?</p>
      </div>

      {/* Replace this with RainbowKit connect button if Web3 login is needed */}
      <div className="text-right">
        <div className="text-sm text-gray-400">Health Score</div>
        <div className="text-2xl font-bold">{score}</div>
      </div>
    </div>
  );
}
