const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  registerDog,
  adoptDog,
  removeDog,
  listMine,
  listAdopted,
} = require("../controllers/dogController");

router.post("/", auth, registerDog);
router.post("/:id/adopt", auth, adoptDog);
router.delete("/:id", auth, removeDog);
router.get("/mine", auth, listMine);
router.get("/adopted", auth, listAdopted);

module.exports = router;
