const Dog = require("../models/Dog");

async function registerDog(req, res) {
  const { name, description } = req.body;
  if (!name || !description) {
    return res
      .status(400)
      .json({ error: "Dog name and description are required fields." });
  }
  try {
    const dog = await Dog.create({ name, description, ownerId: req.userId });
    return res.status(201).json({ dog });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong." });
  }
}

async function adoptDog(req, res) {
  const { id } = req.params;
  const { thankYouMessage } = req.body;

  if (!thankYouMessage) {
    return res.status(400).json({ error: "Thank you message is required." });
  }
  try {
    const dog = await Dog.findById(id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found." });
    }
    if (dog.status === "adopted") {
      return res.status(409).json({ error: "Dog is already adopted." });
    }
    if (dog.ownerId.toString() === req.userId) {
      return res
        .status(403)
        .json({ error: "You cannot adopt your own dog, you already own it!" });
    }

    await Dog.markAdopted(id, req.userId, thankYouMessage);
    const updatedDog = await Dog.findById(id);
    return res.status(200).json({ dog: updatedDog });
  } catch (error) {
    return res.status(500).json({ error: "Somthing went wrong." });
  }
}

async function removeDog(req, res) {
  const { id } = req.params;
  try {
    const dog = await Dog.findById(id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found." });
    }
    if (dog.ownerId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You can only remove a dog that you registered." });
    }
    if (dog.status === "adopted") {
      return res
        .status(400)
        .json({ error: "Cannot remove a dog that has already been adopted." });
    }

    await Dog.remove(id);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong." });
  }
}

async function listMine(req, res) {
  const { status } = req.query;
  const page =
    parseInt(req.query.page, 10) > 0 ? parseInt(req.query.page, 10) : 1;
  const limit =
    parseInt(req.query.limit, 10) > 0 ? parseInt(req.query.limit, 10) : 10;
  try {
    const myDogs = await Dog.findByOwner(req.userId, { status, page, limit });
    return res.status(200).json({ dogs: myDogs });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong." });
  }
}

async function listAdopted(req, res) {
  const page =
    parseInt(req.query.page, 10) > 0 ? parseInt(req.query.page, 10) : 1;
  const limit =
    parseInt(req.query.limit, 10) > 0 ? parseInt(req.query.limit, 10) : 10;
  try {
    const adoptedDogs = await Dog.findByAdopter(req.userId, { page, limit });
    return res.status(200).json({ adopted: adoptedDogs });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong." });
  }
}
module.exports = { registerDog, adoptDog, removeDog, listMine, listAdopted };
