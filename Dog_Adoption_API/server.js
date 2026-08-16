const app = require("./app");
const { connectDB } = require("./db");

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })

  .catch((err) => {
    console.error("Failed to connect to database: ", err.message);
    process.exit(1);
  });
