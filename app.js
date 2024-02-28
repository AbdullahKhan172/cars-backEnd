const express = require("express");
const app = express();
const carRouter = require("./routes/carRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");

app.use(express.json());
var cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  console.log("Hello from the middle ware broooo!!!!");
  next();
});

app.use("/api/v1/cars", carRouter);
app.use("/api/v1/users", userRouter);
app.use(globalErrorHandler);
module.exports = app;
