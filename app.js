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


app.get("/lol", function (req, res) {

    res.render("game", {
        currentGame: "lol",
    });

});

app.get("/dota2", function (req, res) {

    res.render("game", {
        currentGame: "dota2",
    });

});

app.get("/airmech", function (req, res) {

    res.render("game", {
        currentGame: "airmech",
    });

});

app.get("/hos", function (req, res) {

    res.render("game", {
        currentGame: "hos",
    });

});

app.get("/ic", function (req, res) {

    res.render("game", {
        currentGame: "ic",
    });

});

app.get("/smite", function (req, res) {

    res.render("game", {
        currentGame: "smite",
    });

});

app.get("/overwatch", function (req, res) {

    res.render("game", {
        currentGame: "overwatch",
    });

});

app.get("/strife", function (req, res) {

    res.render("game", {
        currentGame: "strife",
    });

});

app.get("/hon", function (req, res) {

    res.render("game", {
        currentGame: "hon",
    });

});

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