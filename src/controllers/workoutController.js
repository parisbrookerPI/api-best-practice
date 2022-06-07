//Controllers are for handling the http-related stuff:
// Extracting and validating requests
//

const workoutService = require("../services/workoutService");

const getAllWorkouts = async (req, res) => {
  const allWorkouts = await workoutService.getAllWorkouts();
  res.send(allWorkouts);
};

const getOneWorkout = async (req, res) => {
  //Extracting/destructuring req. from http request
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    return;
  }
  const workout = await workoutService.getOneWorkout(workoutId);
  res.send({ status: "OK", data: workout });
};

const createNewWorkout = async (req, res) => {
  const body = req.body;
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Keys missing",
      },
    });
    return;
  }
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  const createdWorkout = await workoutService.createNewWorkout(newWorkout);
  res.status(201).send({ status: "OK", data: createdWorkout });
};

const updateOneWorkout = async (req, res) => {
  const workoutId = req.params.workoutId;
  const body = req.body;
  console.log(workoutId);
  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }
  try {
    console.log(workoutId);
    const updatedWorkout = await workoutService.updateOneWorkout(
      workoutId,
      body
    );
    res.send({ status: "OK", data: updatedWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneWorkout = async (req, res) => {
  const {
    params: { workoutId },
  } = req;
  await workoutService.deleteOneWorkout(workoutId);
  res.status(204).send({ status: "OK" });
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
