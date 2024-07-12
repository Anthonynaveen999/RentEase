const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../db.js").collection("User");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      favHouseIds: [],
    };

    const result = await User.insertOne(newUser);
    const createdUser = await User.findOne({ _id: result.insertedId });
    const token = jwt.sign({ id: createdUser._id,email: createdUser.email, name: createdUser.name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email: email});
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect Password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addFavorite = async (req, res) => {
  const { userId, houseId } = req.params;

  try {
    const user = await User.findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.favHouseIds.includes(houseId)) {
      user.favHouseIds.push(houseId);
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { favHouseIds: user.favHouseIds } }
      );
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).json({ error: "User not found" });

    const favoriteHouses = await houseListingsCollection
      .find({ _id: { $in: user.favHouseIds.map((id) => new ObjectId(id)) } })
      .toArray();
    res.status(200).json(favoriteHouses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  addFavorite,
  getFavorites,
};
