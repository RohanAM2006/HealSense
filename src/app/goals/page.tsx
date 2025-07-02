// app/goals/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Define the goal type
type Goal = {
  id: string;
  goal: string;
  type: string;
  target: number;
  current: number;
  status: string;
  deadline?: string;
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    goal: "",
    type: "",
    target: 0,
    current: 0,
    deadline: "",
  });

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/goals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setGoals(Array.isArray(data) ? data : data.goals || []);
      } catch (err) {
        console.error("❌ Failed to load goals", err);
      }
    };

    fetchGoals();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8000/goals/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const calculateDaysLeft = (deadline?: string) => {
    if (!deadline) return null;
    const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? `${diff} day(s) left` : `Overdue`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newGoal),
    });
    const data = await res.json();
    setGoals((prev) => [...prev, data]);
    setShowForm(false);
    setNewGoal({ goal: "", type: "", target: 0, current: 0, deadline: "" });
  };

  return (
    <div className="p-8 min-h-screen bg-blue-950 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-400">🎯 My Health Goals</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
        >
          ➕ {showForm ? "Cancel" : "Add Goal"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-blue-900 p-4 rounded-lg mb-6 grid gap-3"
        >
          <input
            type="text"
            placeholder="Goal"
            value={newGoal.goal}
            onChange={(e) => setNewGoal({ ...newGoal, goal: e.target.value })}
            className="w-full p-2 rounded bg-zinc-100 text-black"
            required
          />
          <input
            type="text"
            placeholder="Type (e.g. Exercise)"
            value={newGoal.type}
            onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
            className="w-full p-2 rounded bg-zinc-100 text-black"
            required
          />
          <input
            type="number"
            placeholder="Target"
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
            className="w-full p-2 rounded bg-zinc-100 text-black"
            required
          />
          <input
            type="number"
            placeholder="Current"
            value={newGoal.current}
            onChange={(e) => setNewGoal({ ...newGoal, current: Number(e.target.value) })}
            className="w-full p-2 rounded bg-zinc-100 text-black"
          />
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            className="w-full p-2 rounded bg-zinc-100 text-black"
          />
          <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white">
            Save Goal
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {goals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-800 p-6 rounded-lg shadow-lg text-center"
          >
            <p className="text-zinc-200">No goals found. Add some to get started.</p>
          </motion.div>
        ) : (
          goals.map((goal, index) => (
            <motion.div
              key={goal.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-blue-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold text-white mb-1">{goal.goal}</h3>
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="text-red-400 hover:text-red-500 text-sm"
                >
                  ✖ Delete
                </button>
              </div>
              <p className="text-zinc-300">
                Type: <span className="font-medium">{goal.type}</span> • Status:{" "}
                <span
                  className={
                    goal.status === "achieved"
                      ? "text-green-400"
                      : goal.status === "in-progress"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                >
                  {goal.status}
                </span>
              </p>
              <p className="text-sm text-zinc-200 mt-1">
                Progress: {goal.current} / {goal.target}
              </p>
              <div className="w-full bg-blue-600 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
              {goal.deadline && (
                <p className="text-sm text-zinc-300 mt-2">
                  Deadline: {goal.deadline.slice(0, 10)} • {calculateDaysLeft(goal.deadline)}
                </p>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}