'use client';

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function ConsentPage() {
  const t = useTranslations("Consent");
  const [loading, setLoading] = useState(false);

  const handleGrantConsent = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/grant-consent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "user123",
          doctor_id: "doctor456",
          method: "biometric",
          language: "English", // Optional: Update dynamically if needed
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || `✅ ${t("granted")}`);
      } else {
        toast.error(data.error || "❌ Something went wrong.");
      }
    } catch (error) {
      toast.error("🚨 Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1>
        <button
          onClick={handleGrantConsent}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded text-white font-semibold disabled:opacity-50"
        >
          {loading ? t("granting") || "Granting..." : t("button") || "Grant Consent"}
        </button>
      </div>
    </main>
  );
}
