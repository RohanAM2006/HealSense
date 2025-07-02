"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  MessageCircle,
  FileText,
  Upload,
  Clipboard,
  Activity,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: <Home size={18} />, path: "/" },
  { label: "AI Health Chat", icon: <MessageCircle size={18} />, path: "/chat" },
  { label: "Web3 Agent", icon: <ShieldCheck size={18} />, path: "/web3" },
  { label: "Upload Records", icon: <Upload size={18} />, path: "/upload" },
  { label: "Medical History", icon: <Clipboard size={18} />, path: "/history" },
  { label: "Consent Management", icon: <Activity size={18} />, path: "/consent" },
  { label: "❤️ Vitals", icon: <Activity size={18} />, path: "/vitals" },
  { label: "Personalised care", icon: <Activity size={18} />, path: "/consultation" },
  {label: "Why i built it", icon: <Activity size={18} />, path: "/about" },
  {label: "Goals", icon: <Activity size={18} />, path: "/goals" },


];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-60 bg-black border-r border-zinc-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">🩺 HealSense</h1>

      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              pathname === item.path
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
