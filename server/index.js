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

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin:"http://192.168.163.141:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use('/api/user', userRoute)
app.use('/api/listings', listingRoute)

app.get('/', async (req, res) => {
    res.send('Hello, world!');
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});