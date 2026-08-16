const { getDB } = require("../db");

class User {
  static async create(data) {
    const createdAt = new Date();
    const newUser = {
      username: data.username,
      password: data.password,
      createdAt,
    };

    const result = await getDB().collection("users").insertOne(newUser);
    return {
      _id: result.insertedId,
      username: data.username,
      createdAt: createdAt,
    };
  }

  static async findByUsername(username) {
    const result = await getDB().collection("users").findOne({
      username,
    });
    return result;
  }
}

module.exports = User;
