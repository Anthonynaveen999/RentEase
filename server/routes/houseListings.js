const express = require("express");
const {
  createHouseListing,
  getHouseListings,
  getHouseListingById,
  updateHouseListing,
  deleteHouseListing,
} = require("../controllers/houseListings.js");
const router = express.Router();

router.post("/", createHouseListing);
router.get("/", getHouseListings);
router.get("/:id", getHouseListingById);
router.put("/:id", updateHouseListing);
router.delete("/:id", deleteHouseListing);

module.exports = router;
