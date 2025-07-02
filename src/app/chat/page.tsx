"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ type: string; text: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { type: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput }),
      });

      const data = await res.json();
      setMessages([...newMessages, { type: "ai", text: data.answer }]);
    } catch (err) {
      setMessages([...newMessages, { type: "ai", text: "❌ Error getting response" }]);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">🧠 AI Health Chat</h1>
        <p className="text-center mb-6 text-zinc-400">Ask your doubts right away!</p>

        <div className="space-y-4 border rounded-lg p-4 bg-zinc-900 max-h-[60vh] overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded text-sm ${
                msg.type === "user" ? "bg-blue-700 text-right" : "bg-zinc-800 text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Ask about symptoms, meds, etc..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1 bg-zinc-800 text-white border-zinc-700"
          />
          <Button onClick={sendMessage} disabled={loading}>
            {loading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </div>
    </main>
  );
}
