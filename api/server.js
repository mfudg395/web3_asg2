require('dotenv').config();
const express = require('express');
const app = express();

// get our data model
const Play = require('./models/Play.js');
const User = require('./models/User.js');

// tell node to use json and HTTP header features in body-parser
app.use(express.urlencoded({ extended: true }));

// use the route handlers
const router = require('./handlers/router.js');
router.handleAllPlays(app, Play);
router.handleSinglePlay(app, Play);
router.handleSingleUser(app, User);


// create connection to database
require('./handlers/dataConnector.js').connect();
const port = process.env.port;
app.listen(port, () => {
    console.log("Server running at port = " + port);
});