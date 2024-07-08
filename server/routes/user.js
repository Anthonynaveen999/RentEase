const express = require("express");
const {
  registerUser,
  loginUser,
  addFavorite,
  getFavorites,
} = require("../controllers/user.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/:userId/favorites/:houseId", addFavorite);
router.get("/:userId/favorites", getFavorites);

module.exports = router;
