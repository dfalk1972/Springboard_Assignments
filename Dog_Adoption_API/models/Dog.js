const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

class Dog {
  static async create(data) {
    const createdAt = new Date();
    const newDog = {
      name: data.name,
      description: data.description,
      ownerId: data.ownerId,
      status: "available",
      adopterId: null,
      thankYouMessage: null,
      createdAt,
      adoptedAt: null,
    };

    const result = await getDB().collection("dogs").insertOne(newDog);

    return {
      _id: result.insertedId,
      ...newDog,
    };
  }

  static async findById(id) {
    const result = await getDB()
      .collection("dogs")
      .findOne({
        _id: new ObjectId(id),
      });
    return result;
  }

  static async findByOwner(ownerId, { status, page = 1, limit = 10 } = {}) {
    const filter = { ownerId };
    if (status) {
      filter.status = status;
    }
    const skip = (page - 1) * limit;

    const result = await getDB()
      .collection("dogs")
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();
    return result;
  }

  static async findByAdopter(adopterId, { page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;
    const result = await getDB()
      .collection("dogs")
      .find({
        adopterId,
      })
      .skip(skip)
      .limit(limit)
      .toArray();
    return result;
  }

  static async markAdopted(id, adopterId, thankYouMessage) {
    const result = await getDB()
      .collection("dogs")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            status: "adopted",
            adopterId,
            thankYouMessage,
            adoptedAt: new Date(),
          },
        },
      );
    return result;
  }

  static async remove(id) {
    const result = await getDB()
      .collection("dogs")
      .deleteOne({
        _id: new ObjectId(id),
      });
    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
    };
  }
}

module.exports = Dog;
