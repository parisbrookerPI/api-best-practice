const Workout = require("../models/workout");
const { v4: uuid } = require("uuid");

const getAllWorkouts = async () => {
  try {
    return Workout.find({});
  } catch (error) {
    error.stack;
  }
};

const getOneWorkout = async (workoutId) => {
  try {
    return Workout.find({ id: workoutId });
  } catch (error) {
    error.stack;
  }
};

const createNewWorkout = async (newWorkout) => {
  try {
    newWorkout.id = uuid();
    newWorkout.createdAt = new Date();
    const workout = Workout.create(newWorkout);
    return workout;
  } catch (error) {
    console.log(error.stack);
  }
};

const updateOneWorkout = async (workoutId, body) => {
  try {
    const qry = { id: workoutId };
    const updt = body;
    updt.updatedAt = new Date();
    const result = await Workout.findOneAndUpdate(qry, updt);
    if (result == null) {
      return "No Record Found";
    } else {
      return result;
    }
  } catch (error) {
    console.log(error.stack);
  }
};

const deleteOneWorkout = (workoutId) => {
  return Workout.deleteOne({ id: workoutId });
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
