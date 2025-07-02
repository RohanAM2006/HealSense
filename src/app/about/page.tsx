// app/about/page.tsx
"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  const features = [
    {
      title: "Real-time Health Score",
      description: "Instantly get an AI-powered score based on your uploaded reports and vitals.",
      icon: "📊",
    },
    {
      title: "Smart Doctor Suggestions",
      description: "HealSense analyzes your data and suggests the most relevant specialists.",
      icon: "🩺",
    },
    {
      title: "AI Health Chatbot",
      description: "Talk to our trained AI model to ask health-related queries instantly.",
      icon: "🤖",
    },
    {
      title: "Secure Medical Uploads",
      description: "Easily upload your medical reports and access them anywhere, securely.",
      icon: "📤",
    },
    {
      title: "Web3 Data Control (Coming soon)",
      description: "Take complete control of your health data using decentralized Web3 storage.",
      icon: "🔐",
    },
    {
      title: "Personalized Insights",
      description: "Receive AI-generated health tips tailored to your age, gender, and history.",
      icon: "💡",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold text-purple-400 mb-2">📘 About HealSense</h1>
      <p className="text-zinc-400 mb-8">Built with ❤️ by <span className="text-purple-300 font-semibold">Rohan A M and Rohith A M</span></p>

      {/* Introduction */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-900 p-6 rounded-xl shadow-lg mb-10"
      >
        <h2 className="text-2xl font-bold text-purple-300 mb-4">🌟 Why I Built HealSense</h2>
        <p className="text-zinc-300 leading-relaxed">
          As someone passionate about technology and wellbeing, I built HealSense to make healthcare more accessible,
          personalized, and secure. Many people struggle with understanding their reports or tracking their health.
          HealSense simplifies that by combining AI, smart suggestions, and secure storage.
        </p>
      </motion.section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-zinc-900 rounded-xl shadow-md p-5 border border-zinc-800 hover:shadow-xl transition"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-purple-200">{feature.title}</h3>
            <p className="text-zinc-400 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Quotes */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-900 p-6 rounded-xl shadow-lg mb-10"
      >
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">💬 Inspirational Quotes</h2>
        <blockquote className="text-zinc-300 italic border-l-4 border-purple-500 pl-4">
          “It is health that is real wealth and not pieces of gold and silver”
        </blockquote>
        <blockquote className="text-zinc-300 italic mt-4 border-l-4 border-purple-500 pl-4">
          “Take care of your body. It's the only place you have to live.”
        </blockquote>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-zinc-500 text-sm pt-6 border-t border-zinc-800">
        Built with ❤️ by <span className="text-purple-400 font-semibold">Rohan A M and Rohith A M </span> • 2025
      </footer>
    </main>
  );
}
