"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

  const res = await fetch("http://localhost:8000/auth/register", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/login");
    } else {
      setError(data.detail || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-blue-950 text-white">
      <h1 className="text-3xl font-bold mb-4">📝 Register on HealSense</h1>
      <form onSubmit={handleRegister} className="bg-blue-900 p-6 rounded-lg w-full max-w-sm space-y-4 shadow-md">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-zinc-100 text-black"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-zinc-100 text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-zinc-100 text-black"
          required
        />
        <button className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded">
          Register
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <p className="text-sm mt-2">
          Already have an account? <a href="/login" className="text-purple-300 hover:underline">Login</a>
        </p>
      </form>
    </main>
  );
}
