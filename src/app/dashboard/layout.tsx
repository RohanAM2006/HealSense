"use client"; // 👈 MUST be at the top, first line

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Full-screen background */}
      <Image
        src="/images/Landing.png"
        alt="HealSense Landing"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-10 md:px-24 text-white z-10 space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold">
          <Typewriter
            words={["🩺 HEALSENSE"]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={150}
            deleteSpeed={100}
            delaySpeed={2000}
          />
        </h1>

        <p className="text-xl md:text-2xl font-medium italic">
          <Typewriter
            words={["Decode Your Health.", "Securely.", "Intelligently."]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1200}
          />
        </p>

        <h2 className="text-lg md:text-xl font-semibold text-emerald-300 mt-2">
          <Typewriter
            words={["Built by Rohan A M and Rohith A M"]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>

        {/* Contact Info */}
        <div className="mt-4 space-y-1">
          <p className="text-md font-semibold">Email: rohan02aug@gmail.com</p>
          <p className="text-md font-semibold">Mob: +91 8148704800</p>
        </div>

        {/* CTA Buttons */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          🚀 Get Started
        </button>
        <button
          onClick={() => router.push("/why")}
          className="mt-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          💡 Why Choose HealSense?
        </button>
      </div>
    </main>
  );
}
