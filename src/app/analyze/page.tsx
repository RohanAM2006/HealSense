"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export default function AnalyzePage() {
  const t = useTranslations("Analyze");
  const [file, setFile] = useState<File | null>(null);
  const [extracted, setExtracted] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return alert(t("noFile"));

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setExtracted(data.original_text);
      setSummary(data.summary);
    } catch (err) {
      console.error("❌ Error analyzing:", err);
      alert(t("error"));
    }
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">{t("title")}</h1>

      <div className="space-y-2">
        <Label htmlFor="file">{t("uploadLabel")}</Label>
        <Input
          type="file"
          accept=".pdf,image/*"
          id="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <Button onClick={handleAnalyze} disabled={loading}>
        {loading ? t("loading") : t("analyze")}
      </Button>

      {extracted && (
        <div className="space-y-2">
          <h2 className="font-semibold">{t("extracted")}</h2>
          <Textarea value={extracted} readOnly className="min-h-[150px]" />
        </div>
      )}

      {summary && (
        <div className="space-y-2">
          <h2 className="font-semibold">{t("summary")}</h2>
          <Textarea value={summary} readOnly className="min-h-[150px]" />
        </div>
      )}
    </main>
  );
}
