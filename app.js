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
var UserSchema = new mongoose.Schema({
    
});

var User = mongoose.model('users', UserSchema);
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




http.createServer(app).listen(3000);