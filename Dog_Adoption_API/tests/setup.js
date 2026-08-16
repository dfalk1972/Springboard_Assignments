process.env.NODE_ENV = "test";
require("dotenv").config({ path: ".env.test" });

const { connectDB, getDB } = require("../db");

before(async function () {
  this.timeout(10000);
  await connectDB();
  await getDB();
  await getDB().collection("users").deleteMany({});
  await getDB().collection("dogs").deleteMany({});
});
