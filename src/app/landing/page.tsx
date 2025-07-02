"use client";

import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-700 to-blue-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to HealSense</h1>
      <p className="text-lg text-center max-w-xl mb-8">
        Decode your health securely and intelligently using AI-powered tools
      </p>
      <p className="text-lg text-center max-w-xl mb-8">
        Built by Rohan A M and Rohith A M
      </p>

      {/* ✅ Proper Button with onClick for navigation */}
      <button
        onClick={() => router.push("/dashboardnew")}
        className="bg-white text-blue-900 font-semibold px-6 py-3 rounded hover:bg-gray-200 transition"
      >
        Get Started
      </button>
    </div>
  );
}


