const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  id: { type: String, default: null },
  name: { type: String },
  mode: { type: String },
  equipment: [String],
  exercises: [String],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: null },
  trainerTips: [String],
});

workoutSchema.virtual("exerciseCount").get(function () {
  return this.exercises.length;
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
