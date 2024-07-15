const express = require("express");
const {
  registerUser,
  loginUser,
  addFavorite,
  getFavorites,
  removeFavorite,
  getUser,
} = require("../controllers/user.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id",getUser);
router.post("/addFavorite", addFavorite);
router.post("/favorites", getFavorites);
router.post("/removeFavorite", removeFavorite);

module.exports = router;
