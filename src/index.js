//Import modules
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

//Import routers
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");

//Initialise app
const app = express();
const PORT = process.env.PORT || 3000;

//Global db connection
const mongoUri = "mongodb://localhost:27017/workouts";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to Mongo");
});

//Misc middleware
app.use(logger("dev"));
app.use(express.json()); //for parsing req.body
app.use(express.urlencoded({ extended: false })); //for parsing url params

//Initialise routers
app.use("/api/v1/workouts", v1WorkoutRouter);

//Start server
app.listen(PORT, () => {
  console.log(`app is listentin on ${PORT}`);
});

module.exports = app;
