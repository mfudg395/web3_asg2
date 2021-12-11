require('dotenv').config({ path: __dirname + '/.env' });
const path = require('path'); // or else the express.static(path.join(...)) gets mad
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const helper = require('./handlers/helpers.js');
const cookieParser = require("cookie-parser");
require('./handlers/dataConnector.js').connect();
// get our data model
const Play = require('./models/Play.js');
const User = require('./models/User.js');
require('./handlers/auth.js');

let currentUser;

// tell node to use json and HTTP header features
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use the route handlers
// const router = require('./handlers/router.js');
// router.handleAllPlays(app, Play);
// router.handleSinglePlay(app, Play);
// router.handleSingleUser(app, User);

/* --- middle ware section --- */

// not sure if we need this but ¯\_(ツ)_/¯
// serves up static files from the public folder. 
app.use('/static', express.static(path.join(__dirname, 'build')));


// Telling the app to use ejs as its view engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(cookieParser("oreo"));
// Express session
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use express flash, which will be used for passing messages
app.use(flash());


app.get('/', helper.ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
    app.use("/", express.static(path.join(__dirname, "./build")));
    console.log(typeof req.user);
    console.log(req.user.id);
});

app.get("/currentUser", function(req, res) {
    User.find({id: req.user.id}, 'id', (err, data) => {
        if (err) {
            res.send({message: "User not found"});
        } else {
            res.send(data);
        }
    })
})

// login and logout handlers
app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('error') });
});

app.post('/login', async (req, resp, next) => {
    // use passport authentication to see if valid login
    passport.authenticate('localLogin',
        {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, resp, next);
});

app.get('/logout', (req, resp) => {
    req.logout();
    req.flash('info', 'You were logged out');
    resp.render('login', { message: req.flash('info') });
});

// // customize the 404 error with our own middleware function
// app.use(function (req, res, next) {
//     res.status(404).send("Sorry can't find that!")
// });

app.get('/api/list', helper.ensureAuthenticated, (req, resp) => {
    Play.find({}, '-playText', (err, data) => {
        if (err) {
            resp.json({ message: 'Unable to connect to plays' });
        } else {
            resp.json(data);
        }
    });
});

app.get('/api/list/:id', helper.ensureAuthenticated, (req, resp) => {
    Play.find({ id: req.params.id }, (err, data) => { // must be exact match
        if (err) {
            resp.json({ message: 'Play not found' });
        } else {
            resp.json(data);
        }
    });
});


app.get('/api/user/:id', helper.ensureAuthenticated, (req, resp) => {
    User.find({ id: req.params.id }, 'id details picture membership email', (err, data) => {
        if (err) {
            resp.json({ message: 'User not found'});
        } else {
            resp.json(data);
        }
    })
});

// create connection to database
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server running at port = " + port);
});