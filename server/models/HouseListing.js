const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HouseListingSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rent: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  imgURL: [{ type: String, required: true}],
  bedroom: { type: Number, required: true },
  bathroom: { type: Number, required: true },
  sqFt: { type: Number, required: true },
  contact: { type: String, required: true },
  securityDeposit: { type: Number, required: true },
  availableFor: {
    type: String,
    enum: ["Family", "Bachelors", "Both"],
    required: true,
  },
});

module.exports = mongoose.model("HouseListing", HouseListingSchema);
