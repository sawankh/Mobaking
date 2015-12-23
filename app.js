/*
Module Dependencies 
*/
var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    hash = require('./pass').hash;

var app = express();

/*
Database and Models
*/
mongoose.connect("mongodb://localhost/myapp");

var gameSchema = new mongoose.Schema({
});

var game = mongoose.model('games', gameSchema);
/*
Middlewares and configurations 
*/
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.cookieParser('Authentication Tutorial '));
    app.use(express.session());
    app.use(express.static(path.join(__dirname, '/public')));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});


/*
Helper Functions
*/



/*
Routes
*/
app.get("/", function (req, res) {

    res.render("index");

});


//----------------------------- LOL ----------------------------- //
app.get("/lol", function (req, res) {

    res.render("game", {
        currentGame: "lol",
    });

});

app.get("/lol/intro", function (req, res) {

    res.render("intro", {
        currentGame: "lol",
    });

});

app.get("/lol/2014", function (req, res) {

    res.render("date_14", {
        currentGame: "lol",
    });

});

app.get("/lol/2015", function (req, res) {

    res.render("date_15", {
        currentGame: "lol",
    });

});

app.get("/lol/world", function (req, res) {

    res.render("game_world", {
        currentGame: "lol",
    });

});

app.get("/lol/future", function (req, res) {

    res.render("future", {
        currentGame: "lol",
    });

});


//----------------------------- DOTA 2 ----------------------------- //
app.get("/dota2", function (req, res) {

    res.render("game", {
        currentGame: "dota2",
    });

});


//----------------------------- AIRMECH ----------------------------- //
app.get("/airmech", function (req, res) {

    res.render("game", {
        currentGame: "airmech",
    });

});

//----------------------------- HOS ----------------------------- //
app.get("/hos", function (req, res) {

    res.render("game", {
        currentGame: "hos",
    });

});

//----------------------------- IC ----------------------------- //
app.get("/ic", function (req, res) {

    res.render("game", {
        currentGame: "ic",
    });

});

//----------------------------- SMITE ----------------------------- //
app.get("/smite", function (req, res) {

    res.render("game", {
        currentGame: "smite",
    });

});

//----------------------------- OVERWATCH ----------------------------- //
app.get("/overwatch", function (req, res) {

    res.render("game", {
        currentGame: "overwatch",
    });

});

//----------------------------- STRIFE ----------------------------- //
app.get("/strife", function (req, res) {

    res.render("game", {
        currentGame: "strife",
    });

});

//----------------------------- HON ----------------------------- //
app.get("/hon", function (req, res) {

    res.render("game", {
        currentGame: "hon",
    });

});

//----------------------------- MWW ----------------------------- //
app.get("/mww", function (req, res) {

    res.render("game", {
        currentGame: "mww",
    });

});

app.get("/world", function (req, res) {

    res.render("world");

});

app.get("/about", function (req, res) {

    res.render("about");

});

http.createServer(app).listen(3000);