"use client";

import { useState } from "react";

export default function ConsultationPage() {
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [specialists, setSpecialists] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleSuggestion() {
    let s: string[] = [];
    const cond = conditions.toLowerCase();
    const allerg = allergies.toLowerCase();

    if (cond.includes("diabetes")) s.push("🩺 Endocrinologist");
    if (cond.includes("bp") || cond.includes("hypertension")) s.push("🫀 Cardiologist");
    if (cond.includes("asthma") || allerg.includes("dust")) s.push("🌬 Pulmonologist");
    if (typeof age === "number" && age > 60) s.push("👴 Geriatrician");
    if (s.length === 0) s.push("🧑‍⚕️ General Physician");

    setSpecialists(s);
    setShowSuggestions(true);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">🩺 Doctor Consultation</h1>

      <section className="bg-zinc-900 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">👤 Your Profile</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : "")}
            className="p-2 rounded bg-zinc-800 text-white placeholder-zinc-400"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-2 rounded bg-zinc-800 text-white"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            type="text"
            placeholder="Allergies (e.g. Penicillin)"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="p-2 rounded bg-zinc-800 text-white placeholder-zinc-400"
          />
          <input
            type="text"
            placeholder="Past Conditions (e.g. Diabetes)"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            className="p-2 rounded bg-zinc-800 text-white placeholder-zinc-400"
          />
        </div>
        <button
          onClick={handleSuggestion}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
        >
          Get Doctor Suggestions
        </button>

        {showSuggestions && (
          <div className="mt-4 p-4 bg-zinc-800 rounded">
            <h4 className="font-semibold text-lg mb-2 text-purple-300">Suggested Specialists:</h4>
            <ul className="list-disc list-inside text-zinc-300">
              {specialists.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
            <button className="mt-3 bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-white">
              Schedule Online Consultation
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
