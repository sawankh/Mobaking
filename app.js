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
mongoose.connect("mongodb://localhost/mobaking");

var gameSchema = new mongoose.Schema({
    name: String,
    logo: String,
    videoUrl: String,
    description: String,
    image1: String,
    image2: String,
    image3: String
});

var worldSchema = new mongoose.Schema({
    country: String,
    value: Number,
    game: String,
    period: String,
    year: String,
});

var dataSchema = new mongoose.Schema({
    value: Number,
    game: String,
    period: String,
    year: String,
});

var World = mongoose.model('world', worldSchema);
var Data = mongoose.model('data', dataSchema);
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

app.get("/world", function (req, res) {

    res.render("world");

});

app.get("/about", function (req, res) {

    res.render("about");

});

//----------------------------- LOL ----------------------------- //
app.get("/lol", function (req, res) {

    res.render("game", {
        currentGame: "lol",
        gameName: "League of Legends",
    });

});

app.get("/lol/intro", function (req, res) {
    game.find({'name': 'League of Legends'}, function (err, result) {
        res.render('intro', {
            gameInfo: result,
            currentGame: "lol",
            gameName: "League of Legends",
        });
    });
});

app.get("/lol/2014", function (req, res) {
    Data.find({'game': 'lol', 'year': '2014'}, function (err, result) {
        res.render("date_14", {
            data: result,
            currentGame: "lol",
            gameName: "League of Legends",
        });
    });    
});

app.get("/lol/2015", function (req, res) {
    Data.find({'game': 'lol', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            data: result,
            currentGame: "lol",
            gameName: "League of Legends",
        });
    });    
});

app.get("/lol/world2014", function (req, res) {
    World.find({'game': 'lol', 'year': '2014'}, function (err, result) {
        res.render("game_world_14", {
            worldData: result,
            currentGame: "lol",
            gameName: "League of Legends",
        }); 
    });    
});

app.get("/lol/world2015", function (req, res) {
    World.find({'game': 'lol', 'year': '2014'}, function (err, result) {
        res.render("game_world_15", {
            worldData: result,
            currentGame: "lol",
            gameName: "League of Legends",
        }); 
    });    
});

app.get("/lol/future", function (req, res) {

    res.render("future", {
        currentGame: "lol",
        gameName: "League of Legends",
    });

});


//----------------------------- DOTA 2 ----------------------------- //
app.get("/dota2", function (req, res) {

    res.render("game", {
        currentGame: "dota2",
        gameName: "Dota 2",
    });

});

app.get("/dota2/intro", function (req, res) {
    game.find({'name': 'Dota 2'}, function (err, result) {
        res.render('intro', {
            gameInfo: result,
            currentGame: "dota2",
            gameName: "Dota 2",
        });
    });
});

app.get("/dota2/2014", function (req, res) {
    Data.find({'game': 'dota2', 'year': '2014'}, function (err, result) {
        res.render("date_14", {
            data: result,
            currentGame: "dota2",
            gameName: "Dota 2",
        });
    });    
});

app.get("/dota2/2015", function (req, res) {
    Data.find({'game': 'dota2', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            data: result,
            currentGame: "dota2",
            gameName: "Dota 2",
        });
    });    
});

app.get("/dota2/world2014", function (req, res) {
    World.find({'game': 'dota2', 'year': '2014'}, function (err, result) {
        res.render("game_world_14", {
            worldData: result,
            currentGame: "dota2",
            gameName: "Dota 2",
        });
    });    
});

app.get("/dota2/world", function (req, res) {
    World.find({'game': 'dota2', 'year': '2015'}, function (err, result) {
        res.render("game_world_15", {
            worldData: result,
            currentGame: "dota2",
            gameName: "Dota 2",
        });
    });    
});

app.get("/dota2/future", function (req, res) {

    res.render("future", {
        currentGame: "dota2",
        gameName: "Dota 2",
    });

});

//----------------------------- AIRMECH ----------------------------- //
app.get("/airmech", function (req, res) {

    res.render("game", {
        currentGame: "airmech",
        gameName: "Airmech",
    });

});

app.get("/airmech/intro", function (req, res) {
    game.find({'name': 'Airmech'}, function (err, result) {
        res.render('intro', {
            gameInfo: result,
            currentGame: "airmech",
            gameName: "Airmech",
        });
    });
});

app.get("/airmech/2014", function (req, res) {
    Data.find({'game': 'airmech', 'year': '2014'}, function (err, result) {
        res.render("date_14", {
            data: result,
            currentGame: "airmech",
            gameName: "Airmech",
        });
    });    
});

app.get("/airmech/2015", function (req, res) {
    Data.find({'game': 'airmech', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            data: result,
            currentGame: "airmech",
            gameName: "Airmech",
        });
    });    
});

app.get("/airmech/world2014", function (req, res) {
    World.find({'game': 'airmech', 'year': '2014'}, function (err, result) {
        res.render("game_world_14", {
            worldData: result,
            currentGame: "airmech",
            gameName: "Airmech",
        });
    });    
});

app.get("/airmech/world2015", function (req, res) {
    World.find({'game': 'airmech', 'year': '2015'}, function (err, result) {
        res.render("game_world_15", {
            worldData: result,
            currentGame: "airmech",
            gameName: "Airmech",
        });
    });    
});
app.get("/airmech/future", function (req, res) {

    res.render("future", {
        currentGame: "airmech",
        gameName: "Airmech",
    });

});

//----------------------------- HOS ----------------------------- //
app.get("/hos", function (req, res) {

    res.render("game", {
        currentGame: "hos",
        gameName: "Heroes of the Storm",
    });

});

app.get("/hos/intro", function (req, res) {
    game.find({'name': 'Heroes of the Storm'}, function (err, result) {
        res.render('intro', {
            gameInfo: result,
            currentGame: "hos",
            gameName: "Heroes of the Storm",
        });
    });
});

app.get("/hos/2014", function (req, res) {
    Data.find({'game': 'hos', 'year': '2014'}, function (err, result) {
        res.render("date_14", {
            data: result,
            currentGame: "hos",
            gameName: "Heroes of the Storm",
        });
    });    
});

app.get("/hos/2015", function (req, res) {
    Data.find({'game': 'hos', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            data: result,
            currentGame: "hos",
            gameName: "Heroes of the Storm",
        });
    });    
});

app.get("/hos/world2014", function (req, res) {
    World.find({'game': 'hos', 'year': '2014'}, function (err, result) {
        res.render("game_world_14", {
            currentGame: "hos",
            gameName: "Heroes of the Storm",
        });
    });    
});

app.get("/hos/world2015", function (req, res) {
    World.find({'game': 'hos', 'year': '2015'}, function (err, result) {
        res.render("game_world_15", {
            currentGame: "hos",
            gameName: "Heroes of the Storm",
        });
    });    
});

app.get("/hos/future", function (req, res) {

    res.render("future", {
        currentGame: "hos",
        gameName: "Heroes of the Storm",
    });

});

//----------------------------- IC ----------------------------- //
app.get("/ic", function (req, res) {

    res.render("game", {
        currentGame: "ic",
        gameName: "Infinite Crisis",
    });

});

app.get("/ic/intro", function (req, res) {
    game.find({'name': 'Infinite Crisis'}, function (err, result) {
        res.render('intro', {
            gameInfo: result,
            currentGame: "ic",
            gameName: "Infinite Crisis",
        });
    });
});

app.get("/ic/2014", function (req, res) {
    Data.find({'game': 'ic', 'year': '2014'}, function (err, result) {
        res.render("date_14", {
            data: result,
            currentGame: "ic",
            gameName: "Infinite Crisis",
        });
    });    
});

app.get("/ic/2015", function (req, res) {
    Data.find({'game': 'ic', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            data: result,
            currentGame: "ic",
            gameName: "Infinite Crisis",
        });
    });    
});

app.get("/ic/world2014", function (req, res) {
    World.find({'game': 'ic', 'year': '2014'}, function (err, result) {
        res.render("game_world_14", {
            worldData: result,
            currentGame: "ic",
            gameName: "Infinite Crisis",
        });
    });    
});

app.get("/ic/world2015", function (req, res) {
    World.find({'game': 'ic', 'year': '2015'}, function (err, result) {
        res.render("game_world_15", {
            worldData: result,
            currentGame: "ic",
            gameName: "Infinite Crisis",
        });
    });    
});

app.get("/ic/future", function (req, res) {

    res.render("future", {
        currentGame: "ic",
        gameName: "Infinite Crisis",
    });

});

//----------------------------- SMITE ----------------------------- //
app.get("/smite", function (req, res) {

    res.render("game", {
        currentGame: "smite",
        gameName: "Smite",
    });

});

app.get("/smite/intro", function (req, res) {
    game.find({'name': 'Smite'}, function (err, result) {
        res.render('intro', {
            gameInfo: result,
            currentGame: "smite",
            gameName: "Smite",
        });
    });
});

app.get("/smite/2014", function (req, res) {
    Data.find({'game': 'smite', 'year': '2014'}, function (err, result) {
        res.render("date_14", {
            data: result,
            currentGame: "smite",
            gameName: "Smite",
        });
    });    
});

app.get("/smite/2015", function (req, res) {
    Data.find({'game': 'smite', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            data: result,
            currentGame: "smite",
            gameName: "Smite",
        });
    });
});

app.get("/smite/world2014", function (req, res) {
    World.find({'game': 'smite', 'year': '2014'}, function (err, result) {
        res.render("game_world_14", {
            worldData: result,
            currentGame: "smite",
            gameName: "Smite",
        });
    });    
});

app.get("/smite/world2015", function (req, res) {
    World.find({'game': 'smite', 'year': '2015'}, function (err, result) {
        res.render("game_world_15", {
            worldData: result,
            currentGame: "smite",
            gameName: "Smite",
        });
    });    
});

app.get("/smite/future", function (req, res) {

    res.render("future", {
        currentGame: "smite",
        gameName: "Smite",
    });

});

//----------------------------- OVERWATCH ----------------------------- //
app.get("/overwatch", function (req, res) {

    res.render("game", {
        currentGame: "overwatch",
        gameName: "Overwatch",
    });

});

app.get("/overwatch/intro", function (req, res) {
    game.find({'name': 'Overwatch'}, function (err, result) {
        res.render('intro', {
            gameInfo: result,
            currentGame: "overwatch",
            gameName: "Overwatch",
        });
    });
});

app.get("/overwatch/2014", function (req, res) {
    Data.find({'game': 'overwatch', 'year': '2014'}, function (err, result) {
        res.render("date_14", {
            data: result,
            currentGame: "overwatch",
            gameName: "Overwatch",
        });
    });
});

app.get("/overwatch/2015", function (req, res) {
    Data.find({'game': 'overwatch', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            data: result,
            currentGame: "overwatch",
            gameName: "Overwatch",
        });
    });
});

app.get("/overwatch/world2014", function (req, res) {
    World.find({'game': 'overwatch', 'year': '2014'}, function (err, result) {
        res.render("game_world_14", {
            worldData: result,
            currentGame: "overwatch",
            gameName: "Overwatch",
        });
    });    
});

app.get("/overwatch/world2015", function (req, res) {
    World.find({'game': 'overwatch', 'year': '2015'}, function (err, result) {
        res.render("game_world_15", {
            worldData: result,
            currentGame: "overwatch",
            gameName: "Overwatch",
        });
    });    
});

app.get("/overwatch/future", function (req, res) {

    res.render("future", {
        currentGame: "overwatch",
        gameName: "Overwatch",
    });

});

//----------------------------- STRIFE ----------------------------- //
app.get("/strife", function (req, res) {

    res.render("game", {
        currentGame: "strife",
        gameName: "Strife",
    });

});

app.get("/strife/intro", function (req, res) {
    game.find({'name': 'Strife'}, function (err, result) {
        res.render('intro', {
            gameInfo: result,
            currentGame: "strife",
            gameName: "Strife",
        });
    });
});

app.get("/strife/2014", function (req, res) {
    Data.find({'game': 'strife', 'year': '2014'}, function (err, result) {
        res.render("date_14", {
            data: result,
            currentGame: "strife",
            gameName: "Strife",
        });
    });    
});

app.get("/strife/2015", function (req, res) {
    Data.find({'game': 'strife', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            data: result,
            currentGame: "strife",
            gameName: "Strife",
        });
    });
});

app.get("/strife/world2014", function (req, res) {
    World.find({'game': 'strife', 'year': '2014'}, function (err, result) {
        res.render("game_world_14", {
            worldData: result,
            currentGame: "strife",
            gameName: "Strife",
        });
    });
});

app.get("/strife/world2015", function (req, res) {
    World.find({'game': 'strife', 'year': '2015'}, function (err, result) {
        res.render("game_world_15", {
            worldData: result,
            currentGame: "strife",
            gameName: "Strife",
        });
    });
});

app.get("/strife/future", function (req, res) {

    res.render("future", {
        currentGame: "strife",
        gameName: "Strife",
    });

});

//----------------------------- HON ----------------------------- //
app.get("/hon", function (req, res) {

    res.render("game", {
        currentGame: "hon",
        gameName: "Heroes of Newerth",
    });

});

app.get("/hon/intro", function (req, res) {
    game.find({'name': 'Heroes of Newerth'}, function (err, result) {
        res.render('intro', {
            gameInfo: result,
            currentGame: "hon",
            gameName: "Heroes of Newerth",
        });
    });
});

app.get("/hon/2014", function (req, res) {
    Data.find({'game': 'hon', 'year': '2014'}, function (err, result) {
        res.render("date_14", {
            data: result,
            currentGame: "hon",
            gameName: "Heroes of Newerth",
        });
    });
});

app.get("/hon/2015", function (req, res) {
    Data.find({'game': 'hon', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            data: result,
            currentGame: "hon",
            gameName: "Heroes of Newerth",
        });
    });
});

app.get("/hon/world2014", function (req, res) {
    World.find({'game': 'hon', 'year': '2014'}, function (err, result) {
        res.render("game_world_14", {
            worldData: result,
            currentGame: "hon",
            gameName: "Heroes of Newerth",
        });
    });    
});

app.get("/hon/world2015", function (req, res) {
    World.find({'game': 'hon', 'year': '2015'}, function (err, result) {
        res.render("game_world_15", {
            worldData: result,
            currentGame: "hon",
            gameName: "Heroes of Newerth",
        });
    });    
});

app.get("/hon/future", function (req, res) {

    res.render("future", {
        currentGame: "hon",
        gameName: "Heroes of Newerth",
    });

});

//----------------------------- MWW ----------------------------- //
app.get("/mww", function (req, res) {

    res.render("game", {
        currentGame: "mww",
        gameName: "Magicka Wizard Wars",
    });

});

app.get("/mww/intro", function (req, res) {
    game.find({'name': 'Magicka Wizard Wars'}, function (err, result) {
        res.render('intro', {
            gameInfo: result,
            currentGame: "mww",
            gameName: "Magicka Wizard Wars",
        });
    });
});

app.get("/mww/2014", function (req, res) {
    Data.find({'game': 'mww', 'year': '2014'}, function (err, result) {
        res.render("date_14", {
            data: result,
            currentGame: "mww",
            gameName: "Magicka Wizard Wars",
        });
    });
});

app.get("/mww/2015", function (req, res) {
    Data.find({'game': 'mww', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            data: result,
            currentGame: "mww",
            gameName: "Magicka Wizard Wars",
        });
    });
});

app.get("/mww/world2014", function (req, res) {
    World.find({'game': 'mww', 'year': '2014'}, function (err, result) {
        res.render("game_world_14", {
            worldData: result,
            currentGame: "mww",
            gameName: "Magicka Wizard Wars",
        });
    });
});

app.get("/mww/world2015", function (req, res) {
    World.find({'game': 'mww', 'year': '2015'}, function (err, result) {
        res.render("game_world_15", {
            worldData: result,
            currentGame: "mww",
            gameName: "Magicka Wizard Wars",
        });
    });
});

app.get("/mww/future", function (req, res) {

    res.render("future", {
        currentGame: "mww",
        gameName: "Magicka Wizard Wars",
    });

});


http.createServer(app).listen(3000);