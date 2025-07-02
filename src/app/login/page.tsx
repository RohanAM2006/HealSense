"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

const res = await fetch("http://localhost:8000/auth/login", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("username", data.user.name); // ✅ Save username
      router.push("/dashboardnew");
    } else {
      setError(data.detail || "Login failed");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-blue-950 text-white">
      <h1 className="text-3xl font-bold mb-4">🔐 Login to HealSense</h1>

      <form
        onSubmit={handleLogin}
        className="bg-blue-900 p-6 rounded-lg w-full max-w-sm space-y-4 shadow-md"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-zinc-100 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-zinc-100 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
        >
          Login
        </button>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <p className="text-sm mt-2 text-center">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-purple-300 hover:underline">
            Register
          </a>
        </p>
      </form>
    </main>
  );
}
