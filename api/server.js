require('dotenv').config({ path: __dirname + '/.env' });
const path = require('path'); // or else the express.static(path.join(...)) gets mad
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const passport = require('passport');
const helper = require('./handlers/helpers.js');

const app = express();

/* --- middle ware section --- */

// not sure if we need this but ¯\_(ツ)_/¯
// serves up static files from the public folder. 
app.use('/static', express.static(path.join(__dirname, '../public')));


// ejs views + sessions middle ware
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(cookieParser('oreos'));
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    })
);


// tell node to use json and HTTP header features
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// set up the passport authentication
require('./handlers/auth.js');

// get our data model
const Play = require('./models/Play.js');
const User = require('./models/User.js');

// use the route handlers
const router = require('./handlers/router.js');
router.handleAllPlays(app, Play);
router.handleSinglePlay(app, Play);
router.handleSingleUser(app, User);

app.get('/', helper.ensureAuthenticated, (req, res) => {
    res.render('home.ejs', { user: req.user });
});

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

// customize the 404 error with our own middleware function
app.use(function (req, res, next) {
    res.status(404).send("404 Not Found - Sorry can't find that!")
});

// create connection to database
require('./handlers/dataConnector.js').connect();
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server running at port = " + port);
});