"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data);
      setStatus("✅ File uploaded and analyzed!");
    } catch (error) {
      setStatus("❌ Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-xl w-full p-6 bg-zinc-900 rounded-lg text-white shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Upload Health Report</h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 text-white"
        />

        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Upload & Analyze
        </button>

        {status && <p className="mt-4 text-sm">{status}</p>}

        {response && (
          <div className="mt-6 bg-zinc-800 p-4 rounded-lg">
            <p><strong>Summary:</strong> {response.summary}</p>
            <p className="mt-2"><strong>Health Score:</strong> {response.health_score}</p>
          </div>
        )}
      </div>
    </div>
  );
}
