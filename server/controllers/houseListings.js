const { ObjectId } = require("mongodb");
const HouseListing = require("../db.js").collection("HouseListing");

const createHouseListing = async (req, res) => {
  const {
    owner,
    rent,
    address,
    city,
    country,
    description,
    bedroom,
    bathroom,
    sqFt,
    contact,
    securityDeposit,
    availableFor,
  } = req.body;

  try {
    const newHouseListing = {
    //   owner: new ObjectId(owner),
      owner,
      rent,
      address,
      city,
      country,
      description,
      bedroom,
      bathroom,
      sqFt,
      contact,
      securityDeposit,
      availableFor,
    };

    const result = await HouseListing.insertOne(newHouseListing);

    const createHouseListing = await HouseListing.findOne({_id: result.insertedId});
    res.status(201).json(createHouseListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getHouseListings = async (req, res) => {

  try {
    const houseListings = await HouseListing.find().toArray();
    res.status(200).json(houseListings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getHouseListingById = async (req, res) => {
  const { id } = req.params;

  try {
    const houseListing = await HouseListing.findOne({
      _id: new ObjectId(id),
    });
    if (!houseListing)
      return res.status(404).json({ error: "House listing not found" });
    res.status(200).json(houseListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateHouseListing = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    
    try {
        const result = await HouseListing.updateOne(
        { _id: new ObjectId(id) },
        { $set: update }
        );
        if (result.matchedCount === 0)
        return res.status(404).json({ error: "House listing not found" });
        res.status(200).json({ message: "House listing updated" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteHouseListing = async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await HouseListing.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0)
        return res.status(404).json({ error: "House listing not found" });
        res.status(200).json({ message: "House listing deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
  createHouseListing,
  getHouseListings,
  getHouseListingById,
  updateHouseListing,
  deleteHouseListing,
};
