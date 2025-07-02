"use client";

import { useState } from "react";

export default function ProfileForm() {
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [specialists, setSpecialists] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const generateDoctorSuggestions = () => {
    let suggestions: string[] = [];

    const lowerAllergies = allergies.toLowerCase();
    const lowerConditions = conditions.toLowerCase();

    if (lowerConditions.includes("diabetes")) suggestions.push("🩺 Endocrinologist (Diabetes Specialist)");
    if (lowerConditions.includes("bp") || lowerConditions.includes("hypertension")) suggestions.push("🩺 Cardiologist (Heart & BP)");
    if (lowerConditions.includes("asthma") || lowerAllergies.includes("dust")) suggestions.push("🩺 Pulmonologist (Lungs)");
    if (typeof age === "number" && age > 60) suggestions.push("🩺 Geriatrician (Senior Care)");
    if (suggestions.length === 0) suggestions.push("🩺 General Physician");

    setSpecialists(suggestions);
    setShowSuggestions(true);
  };

  return (
    <section className="p-6 bg-white shadow-lg rounded-2xl mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">👤 Your Profile</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-sm">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : "")}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-sm">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-sm">Allergies</label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="e.g. Penicillin"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-sm">Past Conditions</label>
          <input
            type="text"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            placeholder="e.g. Diabetes"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="button"
            onClick={generateDoctorSuggestions}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Get Personalized Doctor Suggestion
          </button>
        </div>
      </div>

      {showSuggestions && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">🩺 Suggested Specialists:</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {specialists.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Schedule Online Consultation
          </button>
        </div>
      )}
    </section>
  );
}
