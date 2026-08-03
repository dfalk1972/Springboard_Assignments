
const express = require("express");
const itemRoutes = require("./routes/items");

const app = express();

app.use(express.json());   
app.use("/items",itemRoutes);

app.use((error, req, res, next) => {   // 4. error handler last
  res.status(error.status || 500).json({ error: error.message });
});

module.exports = app;