require("dotenv").config(); //getting the db connection information
const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
app.use(express.json());
app.use("/auth", require("./routes/authRoutes"));
app.use("/dogs", require("./routes/dogRoutes"));

app.use(function (req, res, next) {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

module.exports = app;
