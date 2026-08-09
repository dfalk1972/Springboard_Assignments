const { MongoClient } = require("mongodb");
let client;
let db;

async function connectDB() {
  if (db) return db;
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db(process.env.DB_NAME);
  return db;
}

function getDB() {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() before getDB().");
  }
  return db;
}

module.exports = { connectDB, getDB };
