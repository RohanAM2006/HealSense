const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal"); // ⬅️ MongoDB model

// GET all goals
router.get("/", async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
});

// POST a new goal
router.post("/", async (req, res) => {
  const newGoal = new Goal(req.body);
  await newGoal.save();
  res.json(newGoal);
});

// PATCH update goal progress/status
router.patch("/:id", async (req, res) => {
  const updated = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;
