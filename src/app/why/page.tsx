"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "🧠",
    title: "AI-Powered Health Chatbot",
    desc: "Get real-time answers for symptoms, medicines, and health queries using Gemini AI.",
  },
  {
    icon: "📑",
    title: "Medical Report Analyzer",
    desc: "Upload health reports and get instant, easy-to-read summaries.",
  },
  {
    icon: "🧮",
    title: "Health Score Calculator",
    desc: "Understand your health better with AI-driven health score insights.",
  },
  {
    icon: "🔐",
    title: "Smart Consent Management",
    desc: "OTP + Biometric based secure consent with multilingual support.",
  },
  {
    icon: "📧",
    title: "Doctor Notifications",
    desc: "Automatic email alerts to doctors upon patient consent.",
  },
  {
    icon: "📊",
    title: "Consent Analytics",
    desc: "View all your consent logs, access times, and method used.",
  },
  {
    icon: "🌐",
    title: "Multilingual Access",
    desc: "Available in English, Hindi, and more for inclusive healthcare.",
  },
  {
    icon: "🔗",
    title: "Web3 Integration (Optional)",
    desc: "Store consent records on blockchain for immutable proof.",
  },
];

export default function Page() {
  return (
    <main className="bg-black min-h-screen text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Why Choose HealSense?</h1>
      <p className="text-lg text-center mb-10 text-gray-300">
        HealSense empowers patients with AI, privacy, and clarity.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <Card key={i} className="bg-zinc-900 text-white shadow-lg border-zinc-700">
            <CardContent className="p-6 space-y-3">
              <div className="text-3xl">{feature.icon}</div>
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
