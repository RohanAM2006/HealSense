"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Bot,
  Upload,
  ShieldCheck,
  FolderOpen,
  FileText,
  HeartPulse,
  UserPlus,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  const [score, setScore] = useState(0);
  const [name, setName] = useState("User");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    if (storedName) setName(storedName);

    fetch("http://localhost:8000/health-score")
      .then((res) => res.json())
      .then((data) => {
        setScore(data.score || 0);
      })
      .catch((err) => console.error("❌ Failed to fetch score:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/login");
  };

  const sidebarItems = [
    { icon: <Home />, label: "About", path: "/dashboard" },
    { icon: <Bot />, label: "AI Health Chat", path: "/chat" },
    { icon: <HeartPulse />, label: "Goals", path: "/goals" },
    { icon: <HeartPulse />, label: "Web3 Agent", path: "/agent" },
    { icon: <Upload />, label: "Upload Records", path: "/upload" },
    { icon: <FolderOpen />, label: "Medical History", path: "/history" },
    { icon: <HeartPulse />, label: "Developer", path: "/about" },
    { icon: <FileText />, label: "Web3 Records", path: "/web3" },
    { icon: <ShieldCheck />, label: "Consent Management", path: "/consent" },
    { icon: <UserPlus />, label: "Consultation", path: "/consultation" },
    { icon: <HeartPulse />, label: "Vitals", path: "/vitals" },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 p-6 space-y-6 shadow-lg h-screen sticky top-0">
        <h1 className="text-2xl font-bold mb-6 text-purple-400">🧬 HealSense</h1>
        <nav className="space-y-4">
          {sidebarItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => router.push(item.path)}
              className="flex items-center gap-3 text-left w-full hover:bg-zinc-800 px-4 py-2 rounded-md transition"
            >
              <span className="text-purple-300">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-left w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white mt-4"
          >
            <LogOut className="text-white" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Greeting */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-1">
            Welcome back, {name}! 👋
          </h2>
          <p className="text-zinc-400">Stay on top of your health with AI-powered care.</p>
        </section>

        {/* Stat Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Reports" value={15} icon="📄" />
          <StatCard label="AI Chats" value={43} icon="💬" />
          <StatCard label="Goals" value={8} icon="🎯" />
          <StatCard label="Consent Analtics" value={25} icon="🧬" />
         <li
  className="cursor-pointer hover:text-purple-300 transition"
  onClick={() => router.push("/consent-analytics")}
>
  🧬 View  Analytics
</li>

        </section>

        {/* Health Score */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Health Score</h3>
            <div className="text-6xl font-bold text-green-400">{score}</div>
            <p className="text-zinc-400 mt-2">Analyzed from your reports.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Upcoming Features</h3>
            <ul className="list-disc list-inside text-zinc-300 space-y-1">
              <li>AI Symptom Checker</li>
              <li>Personalized Treatment Plans</li>
              <li>Web3 Health Data Wallet</li>
              <li>Doctor & Pharmacy Integrations</li>
            </ul>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-zinc-900 p-6 rounded-xl shadow-lg mb-10">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4">🚀 What’s in HealSense?</h3>
          <ul className="list-disc list-inside space-y-2 text-zinc-300">
            <li>📊 Real-time Health Score Calculation</li>
            <li>🤖 AI Chatbot for instant health advice</li>
            <li>📤 Upload and Analyze Medical Reports</li>
            <li>🩺 Smart Doctor Suggestions</li>
            <li>💊 Medication & Treatment Tracking</li>
            <li>🧬 Web3 Health Data Security</li>
          </ul>
        </section>

        {/* Benefits */}
        <section className="bg-zinc-900 p-6 rounded-xl shadow-lg mb-10">
          <h3 className="text-2xl font-semibold text-green-400 mb-4">🎯 Why Use HealSense?</h3>
          <ul className="list-disc list-inside space-y-2 text-zinc-300">
            <li>✅ Save time by avoiding unnecessary clinic visits</li>
            <li>✅ Get early warnings on abnormal vitals</li>
            <li>✅ Personalized suggestions tailored to your conditions</li>
            <li>✅ Complete control of your health data</li>
          </ul>
        </section>

        {/* Quotes */}
        <section className="bg-zinc-900 p-6 rounded-xl shadow-lg mb-10">
          <h3 className="text-2xl font-semibold text-yellow-400 mb-4">💬 Health Quotes</h3>
          <blockquote className="text-zinc-300 italic">“He who has health has hope; and he who has hope has everything.”</blockquote>
          <blockquote className="text-zinc-300 italic mt-2">“Take care of your body. It's the only place you have to live.”</blockquote>
        </section>

        {/* Footer */}
        <footer className="text-center text-zinc-500 text-sm pt-6 border-t border-zinc-800">
          Built with ❤️ by <span className="text-purple-400 font-semibold">Rohan A M  and Rohith A M</span> • 2025
        </footer>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="bg-zinc-900 p-4 rounded-lg shadow-md text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-sm text-zinc-400">{label}</p>
    </div>
  );
}
