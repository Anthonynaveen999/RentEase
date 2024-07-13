const express = require('express');
const bodyParser = require('body-parser');
const app = express();
dotenv = require('dotenv');
dotenv.config();
const db = require('./db');
const cors = require('cors');
const mongoose = require('mongoose');

const listingRoute = require('./routes/houseListings.js');
const userRoute = require('./routes/user.js');

mongoose.Promise = Promise;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
const corsOptions = {
  origin: "http://localhost:3000", // Update with your frontend's URL
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/user', userRoute)
app.use('/api/houselistings', listingRoute)

app.get('/', async (req, res) => {
    res.send('Hello, world!');
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});