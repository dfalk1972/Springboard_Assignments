const express = require("express");
const { mean, median, mode, parseNums } = require("./helpers");

const app = express();

app.get("/test", function (req, res) {
  return res.json({ message: "It  works!" });
});

app.get("/mean", function (req, res) {
  try {
    const numbers = parseNums(req.query.nums);
    const result = mean(numbers);
    return res.json({ operation: "mean", value: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.get("/median", function (req, res) {
  try {
    const numbers = parseNums(req.query.nums);
    const result = median(numbers);
    return res.json({ operation: "median", value: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.get("/mode", function (req, res) {
  try {
    const numbers = parseNums(req.query.nums);
    const result = mode(numbers);
    return res.json({ operation: "mode", value: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.get("/all", function (req, res) {
  try {
    const numbers = parseNums(req.query.nums);
    return res.json({
      operation: "all",
      mean: mean(numbers),
      median: median(numbers),
      mode: mode(numbers),
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});
