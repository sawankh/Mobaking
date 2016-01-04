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

app.get("/world/ranking", function (req, res) {
Data.find({}, function (err, result) {
        res.render("world_ranking", {
            data: result
        });
    });    
});

app.get("/world/stats", function (req, res) {
Data.find({}, function (err, result) {
        res.render("world_stats", {
            data: result
        });
    });
});

app.get("/world/compare", function (req, res) {
Data.find({}, function (err, result) {
        res.render("world_compare", {
            data: result
        });
    });
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
            barDesc: "This bar chart shows the number of searchs of League of Legends for each two months in 2014. As it can be seen from the bar chart and the distribution line, there is no huge changes in 2014. But the number of searches still fluctuates between 20,000 and 25,000, declining a bit during May-June. That means that League of Legends is very popular in the world.",
            bubbleDesc: "This bubble plot shows the popularity over the year 2014 for League of Legends. The X axis represent the periods of two months of one year and Y axis represents the number of searches, the size bubble indicates the percentage according the total. As it can been seen from the graph, the huger number of searches is, the bigger the bubble is.  The lowest number of search is between May and June and the biggest bubble is in September and October. In the whole, the number of search is from 22,000 to 24,000 in each 2 months in 2014 expect May and June.",
            data: result,
            currentGame: "lol",
            gameName: "League of Legends",
        });
    });    
});

app.get("/lol/2015", function (req, res) {
    Data.find({'game': 'lol', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            barDesc: "This bar chart shows the number of searchs of League of Legends for each two months in 2015. As it can be seen from the bar chart and the distribution line, there is no huge changes in 2014. But the number of searches still fluctuates between 20,000 and 25,000.",
            bubbleDesc: "This bubble plot shows the popularity over the year 2014 for League of Legends. The X axis represent the periods of two months of one year and Y axis represents the number of searches, the size bubble indicates the percentage according the total. As it can been seen from the graph, the huger number of searches is, the bigger the bubble is.  The lowest number of search is between May and June and the biggest bubble is in September and October. In the whole, the number of search is from 22,000 to 24,000 in each 2 months in 2014 expect May and June.",
            data: result,
            currentGame: "lol",
            gameName: "League of Legends",
        });
    });    
});

app.get("/lol/world2014", function (req, res) {
    World.aggregate([{"$match": {year: "2014", game: "lol"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'lol', 'year': '2014'}, function (err, result) {
            res.render("game_world_14", {
                pieDesc: "The pie chart shows the popularity of League of Legends over the different continents. Game players in Europe were more interested in this game than in other continents, which followed by players in Asia and South America. By contrast, the last two continents were Africa and Antarctica.",
                barDesc: "The bar chart shows the top 10 countries for League of Legends with regard to the number of searches. In this year, Peru was the top one country, because only the number of searches in Peru was more than 5000, which was followed by Canada and Thailand.",
                worldTop: top,
                worldData: result,
                currentGame: "lol",
                gameName: "League of Legends",
            }); 
        });
    });    
});

app.get("/lol/world2015", function (req, res) {
    World.aggregate([{"$match": {year: "2015", game: "lol"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'lol', 'year': '2015'}, function (err, result) {
            res.render("game_world_15", {
                pieDesc: "The pie chart shows the popularity of League of Legends over the different continents. Game players in Europe were more interested in this game than in other continents, which followed by players in Asia and South America. By contrast, the last two continents were Africa and Antarctica.",
                barDesc: "The bar chart shows the top 10 countries for League of Legends with regard to the number of searches. In this year, Peru was the top one country, because only the number of searches in Peru was more than 4500, which was followed by Argentina and Belgium.",
                worldTop: top,
                worldData: result,
                currentGame: "lol",
                gameName: "League of Legends",
            });
        }); 
    });    
});

app.get("/lol/future", function (req, res) {
    Data.find({'game': 'lol'}, function (err, result) {
        res.render("future", {
            scatterDesc: "The scatter plot indicates the future trend of League of Legends by analysing the past data. It can be concluded from the regression line that League of Legends will still be very popular but it will decrease at very slow speed.",
            data: result,
            currentGame: "lol",
            gameName: "League of Legends",
        });
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
            barDesc: "This chart illustrates the variations of the searches of Doat2 in the year 2014. It was obvious that the searches of Dota2 fluctuated slightly during this year, but the figures of all period were both over 15000. So, it showed that games players around the world maintained a continuous enthusiasm in Dota2.",
            bubbleDesc: "Normally, bubble charts are a type of chart that displays three dimensions of data. In this chart, the x coordinate and the y coordinate stands for the period of time and the number of searches separately, and the size of bubble stands for the percentage of searches. Obviously, the number of searches experienced a fluctuation in 2014. The number and percentage of searches in March and April were the least in this year. On the contrary, the figures of July and August were both the highest.",
            data: result,
            currentGame: "dota2",
            gameName: "Dota 2",
        });
    });    
});

app.get("/dota2/2015", function (req, res) {
    Data.find({'game': 'dota2', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            barDesc: "Compared with the figures in 2014, it is easy to find that the variation of searches in 2015 were similar with that in 2015. Also, the number of searches in 2015 were over 15000. In this way, we can conclude that Dota2 is still a very popular MOBA game in the world.",
            bubbleDesc: "The bubble chart shows the variations of the number and percentage of searches over the year 2015. The number of searches of Dota2 in 2015 experienced a fluctuation in the number of searches. Meanwhile, the percentage of searches of Dota2 has the same trend in this year.",
            data: result,
            currentGame: "dota2",
            gameName: "Dota 2",
        });
    });    
});

app.get("/dota2/world2014", function (req, res) {
    World.aggregate([{"$match": {year: "2014", game: "dota2"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'dota2', 'year': '2014'}, function (err, result) {
            res.render("game_world_14", {
                pieDesc: "The pie chart shows the popularity of Dota2 in different continents. It was obvious that Dota2 was more popular in Europe, Asia and South America than in other continents. Compared with the chart in 2014, the popularity in each continent almost had no change.",
                barDesc: "The bar chart illustrates the top 10 countries for Dota2, according to the number of searches. Compared with the chart in 2014, it could be found that the figures of top 10 countries in 2015 decreased slightly and the top 10 countries changed a lot. The top one in 2015 was Greece and games players in Greece searched Dota2 over 4000 in this year.",
                worldTop: top,
                worldData: result,
                currentGame: "dota2",
                gameName: "Dota 2",
            });
        });
    });    
});

app.get("/dota2/world2015", function (req, res) {
    World.aggregate([{"$match": {year: "2015", game: "dota2"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'dota2', 'year': '2015'}, function (err, result) {
            res.render("game_world_15", {
                pieDesc: "The pie chart indicates the popularity of Dota2, according to the number of searches in different continents. It was clear that almost half of searches came from Europe, followed by Asia and South America. By contrary, Players in Africa and Antarctica had the least number of searches.",
                barDesc: "The bar chart presents the top 10 countries for Dota2, according to the number of searches. New Zealand had the largest number of searches of Dota2, which was followed by Estonia and Canada. Apart from the top 3 countries, the figures of other countries were less then 3000.",
                worldTop: top,
                worldData: result,
                currentGame: "dota2",
                gameName: "Dota 2",
            });
        });
    });    
});

app.get("/dota2/future", function (req, res) {
    Data.find({'game': 'dota2'}, function (err, result) {
        res.render("future", {
            scatterDesc: "The scatter plot shows the variation of the number of searches of Dota2 and indicates the future trend by giving a regression line. It can be concluded that the number of searches tends to show a downward trend in 2016. In other words, Dota2 will gradually not be so attractive anymore.",
            data: result,
            currentGame: "dota2",
            gameName: "Dota 2",
        });
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
            barDesc: "The bar chart shows the trend and specific values of searching for Airmech over year 2014. We can see from the graph that the trend commonly stayed at a stable level maintained between 2.8 thousand and 2.6 thousand. In July and August the values reached the peak while it was at the lowest point in the first two months.",
            bubbleDesc: "This bubble graph displays the number of searches of Airmech every two months over year 2014. At the beginning of 2014, the number of searching for Airmech was the lowest with only about 1300 and the smallest size bubble. After that, it rose to around 2800 in March and April, and then decreased until June. In July and August it peaked at above 2850 which accounted for the largest percentage of the whole year’s number of search. However, it fell again during the rest of year. According to the bubble graph, the whole trend was fluctuated so that it did not clearly ascending trend or descending trend.",            
            data: result,
            currentGame: "airmech",
            gameName: "Airmech",
        });
    });    
});

app.get("/airmech/2015", function (req, res) {
    Data.find({'game': 'airmech', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            barDesc: "The bar chart shows the trend and specific values of searching for Airmech over year 2015. It can be seen that the trend decreased firstly from 2200 in January to 2000 in April and then increased gradually for the rest year. At last, it peaked around 2300 in the last two months.",
            bubbleDesc: "This bubble graph illustrates the number of searches of Airmech every two months over year 2015. At the beginning of 2015, the number of searching for Airmech stood at above 2200, but it fell rapidly in the following two months with only about 800 and the smallest size bubble. After that, it began to climb persistently for the rest period. In November and December it peaked at above 2300 which has the biggest bubble in the whole graph.",
            data: result,
            currentGame: "airmech",
            gameName: "Airmech",
        });
    });    
});

app.get("/airmech/world2014", function (req, res) {
    World.aggregate([{"$match": {year: "2014", game: "airmech"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'airmech', 'year': '2014'}, function (err, result) {
            res.render("game_world_14", {
                pieDesc: "The pie chart reveals the popularity of Airmech based on seven continents. Apparently, this game gained the highest popularity in Europe, which almost consisted half of the whole searching amount. Asia and South America followed Europe, with they having the same percentage approximately 30%. Other continents, North America, Oceania, Africa and Antarctica altogether accounted for about one fifth of the total searching number.",
                barDesc: "This bar chart shows the top 10 countries for Airmech and specific data of every country. Australia came firstly with around 880 volume of search, and followed by Paraguay, Philippines, and Bolivia with about 760, 550 and 530 respectively. Austria, Vietnam, Ukraine, Chile, United Arab Emirates and Luxembourg, these six countries followed in turn with similar popularity about 450 volume of search.",
                worldTop: top,
                worldData: result,
                currentGame: "airmech",
                gameName: "Airmech",
            });
        });
    });    
});

app.get("/airmech/world2015", function (req, res) {
    World.aggregate([{"$match": {year: "2015", game: "airmech"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'airmech', 'year': '2015'}, function (err, result) {
            res.render("game_world_15", {
                pieDesc: "The pie chart reveals the popularity of Airmech based indifferent continents. Obviously, this game gained the highest popularity in Europe, which almost consisted 40% of the whole searching amount. Asia and South America followed Europe, with they having the same percentage approximately 35%. However, the rest continents, North America, Oceania, Africa and Antarctica altogether accounted for about one fifth of the total searching number.",
                barDesc: "This bar chart shows the top 10 countries for Airmech and specific data of every country. Poland came firstly with around 580 volume of search, followed by New Zealand with a volume that just a little less than that of Poland. Vietnam, Israel and Ireland ranked third, fourth and fifth in turn. After that, Denmark, Brasil and Mexico were following them with about 430, 420 and 410 respectively. Finally, Chile and Macedonia ranked at last.",
                worldTop: top,
                worldData: result,
                currentGame: "airmech",
                gameName: "Airmech",
            });
        });
    });    
});
app.get("/airmech/future", function (req, res) {
    Data.find({'game': 'airmech'}, function (err, result) {
        res.render("future", {
            scatterDesc: "The scatter plot illustrates the history number of search for Airmech from January 2014 to December 2015, and makes a prediction about the trend for the next year 2016. According to these nodes, although it was fluctuated during the past two years, the whole tendency is descending. So basically the regression line predictes that the game Airmech will be less popular during the period of 2016.",
            data: result,
            currentGame: "airmech",
            gameName: "Airmech",
        });
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
    World.aggregate([{"$match": {year: "2014", game: "hos"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'hos', 'year': '2014'}, function (err, result) {
            res.render("game_world_14", {
                worldTop: top,
                worldData: result,
                currentGame: "hos",
                gameName: "Heroes of the Storm",
            });
        });
    });    
});

app.get("/hos/world2015", function (req, res) {
    World.aggregate([{"$match": {year: "2015", game: "hos"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'hos', 'year': '2015'}, function (err, result) {
            res.render("game_world_15", {
                worldTop: top,
                worldData: result,
                currentGame: "hos",
                gameName: "Heroes of the Storm",
            });
        });
    });    
});

app.get("/hos/future", function (req, res) {
    Data.find({'game': 'hos'}, function (err, result) {
        res.render("future", {
            data: result,
            currentGame: "hos",
            gameName: "Heroes of the Storm",
        });
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
            barDesc: "The bar chart shows the poplarity for Infinite Crisis, according to the number of searches in different months. Obviously, the number of searches experienced a flucation during this year. And only the number of searches in Mar/Apr and Jul/Aug were more than 12500.",
            bubbleDesc: "The bubble chart displays the period of time, the number of searches and the percentage of searches. The number of searches increase a lot from January to July, despite a decrease in May/Jun. After August, the number of searches and the percentage of searches experienced a dramatic decrease.",
            data: result,
            currentGame: "ic",
            gameName: "Infinite Crisis",
        });
    });    
});

app.get("/ic/2015", function (req, res) {
    Data.find({'game': 'ic', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            barDesc: "The bar chart shows the poplarity for Infinite Crisis over 2015. It is easy to know that Sep and Oct had the least number of searches in this year, which is less than 9000. Compared with the figures in 2014, the number of searches decreased a lot, which can be concluded that games players had less enthusiasm in this game in 2015 than in 2014.",
            bubbleDesc: "The bubble chart shows the relationships among the number of searches, the percentage of searches and the period of time in 2015. The number of searches of Infinite Crisis in 2015 decreased at the beginning of 2015, then it increased from June before a sudden decrease in September. This trend could also be indicated from the size of bubbles, which stand for the percentage of searches.",
            data: result,
            currentGame: "ic",
            gameName: "Infinite Crisis",
        });
    });    
});

app.get("/ic/world2014", function (req, res) {
    World.aggregate([{"$match": {year: "2014", game: "ic"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'ic', 'year': '2014'}, function (err, result) {
            res.render("game_world_14", {
                pieDesc: "The pie chart shows the popularity of Infinite Crisis in different continents. Game players in Europe were more interested in this game than in other continents, which followed by players in Asia and South America. By contrast, the last two continents were Africa and Antarctica.",
                barDesc: "The bar chart shows the top 10 countries for Infinite Crisis with regard to the number of searches. In this year, Mexico was the top one country, because only the number of searches in Mexico was more than 3000, which was followed by Australia and Colombia.",
                worldTop: top,
                worldData: result,
                currentGame: "ic",
                gameName: "Infinite Crisis",
            });
        });
    });    
});

app.get("/ic/world2015", function (req, res) {
    World.aggregate([{"$match": {year: "2015", game: "ic"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'ic', 'year': '2015'}, function (err, result) {
            res.render("game_world_15", {
                pieDesc: "The pie chart shows the popularity of Infinite Crisis in different continents. Tough the total number of searches changed a lot in these two years, around 50% of game players who were interested in Infinite Crisis came from European countries. ",
                barDesc: "The bar chart shows the top 10 countries for Infinite Crisis with regard to the number of searches. The top one in this year was Bulgaria and games players there searched this game over 2000. The second country is India, where the number of searches was around 1700.",
                worldTop: top,
                worldData: result,
                currentGame: "ic",
                gameName: "Infinite Crisis",
            });
        });
    });    
});

app.get("/ic/future", function (req, res) {
    Data.find({'game': 'ic'}, function (err, result) {
        res.render("future", {
            scatterDesc: "The scatter plot indicates the future trend of Infinite Crisis by analysing the past data. It can be concluded from the regression line that Infinite Crisis will gradually not be so attractive anymore in regards of the predicted number of searches.",
            data: result,
            currentGame: "ic",
            gameName: "Infinite Crisis",
        });
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
            barDesc: "The bar chart shows the trend and specific values of searching for smite over year 2014. It is clear from the chart the trend did not have fierce fluctuation that the value basically maintained between 10 thousand and 10.5 thousand.",
            bubbleDesc: "This bubble graph displays the number of searches of Smite every two months over year 2014. At the beginning of 2014, Smite was not so popular with above 10200 number of searches. After that, it peaked at around 10700 at the following two months, which also accounted for the biggest percentage of total search amount during the year according to the size of bubble. Gradually, the popularity slowed down until July and August, and then it increased at 10400 at September and October. However, the popularity declined dramatically at the last two months, with the smallest bubble overall.",
            data: result,
            currentGame: "smite",
            gameName: "Smite",
        });
    });    
});

app.get("/smite/2015", function (req, res) {
    Data.find({'game': 'smite', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            barDesc: "The bar chart shows the trend and specific values of searching for smite over year 2015. It is clear from the chart the trend was stable that the value basically maintained.",
            bubbleDesc: "This bubble graph displays the number of searches of Smite every two months over year 2015. At the beginning of 2015, the number of searching for Smite stood at approximately 10500. After that, it bottomed at around 10000 at the March and April, which only consisted quietly small part of total search amount during the year. According to the bubble graph, the whole trend was fluctuated, where it reached the peak at around 11125 at September and October.",
            data: result,
            currentGame: "smite",
            gameName: "Smite",
        });
    });
});

app.get("/smite/world2014", function (req, res) {
    World.aggregate([{"$match": {year: "2014", game: "smite"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'smite', 'year': '2014'}, function (err, result) {
            res.render("game_world_14", {
                pieDesc: "The pie chart represents the popularity of Smite in different continents. Obviously, it owned the highest popularity in Europe, which almost consisted half of the whole searching amount. Asia and South America followed Europe, and they had the same percentage. Other continents, North America, Oceania, Africa and Antarctica altogether accounted for about one fifth of the total searching number.",
                barDesc: "This bar chart shows the top 10 countries for Smite and specific figure of every country. Brasil ranked firstly with around 2.8 thousand volume of search, and followed by Argentina and United State with the volume 2.7 thousand and 2.4 respectively. United Arab Emirates, Australia and Philippines these three countries had similar popularity about 2 thousand volume of search. Finally, China, Japan, Finland and Mexico were following in turn.",
                worldTop: top,
                worldData: result,
                currentGame: "smite",
                gameName: "Smite",
            });
        });
    });    
});

app.get("/smite/world2015", function (req, res) {
    World.aggregate([{"$match": {year: "2015", game: "smite"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'smite', 'year': '2015'}, function (err, result) {
            res.render("game_world_15", {
                pieDesc: "The pie chart describes the popularity of Smite based on seven continents. Apparently, this game gained the highest popularity in Europe, which almost consisted half of the whole searching amount. Asia and South America followed Europe, and they had the same percentage. Other continents, North America, Oceania, Africa and Antarctica altogether accounted for about one fifth of the total searching number.",
                barDesc: "This bar chart shows the top 10 countries for Smite and specific figure of every country. New Zealand ranked firstly with around 3.2 thousand volume of search, and followed by Philippines, Japan and Chile which had the same volume about 2.8 thousand. Next, Bolivia, Uruguay, China and Denmark these four countries shared similar popularity even though they ranked at different positon. Finally, USA and France came in at last.",
                worldTop: top,
                worldData: result,
                currentGame: "smite",
                gameName: "Smite",
            });
        });
    });    
});

app.get("/smite/future", function (req, res) {
    Data.find({'game': 'smite'}, function (err, result) {
        res.render("future", {
            scatterDesc: "The scatter plot illustrates the history number of search for Smite from January 2014 to December 2015, and makes a prediction about the trend for the next year 2016. Although it is not absolute up trend in terms of every node, the whole tendency is to increase. So roughly it is expected that the game Smite will be more popular during the period of 2016.",
            data: result,
            currentGame: "smite",
            gameName: "Smite",
        });
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
            barDesc: "The bar chart shows the popularity of Overwatch. The X axis combine two months in one unit. The Y axis shows the value of searching keywords of the game. From the chart we can see that the values of searching is similar in the different months of 2014 except January and February. They are around 290. The months which have maximum value are March and April as well as November and December. However the gap between the maximum and minim values is below 100.",
            bubbleDesc: "The Bubble Chart focuses on the comparison of different months in the percentage. The percentage decides the size of the bubble. From the chart we can clearly see that March and April as well as November and December have the largest searching amount because the size of the bubble is largest. The smallest bubble is in the July and August.",
            data: result,
            currentGame: "overwatch",
            gameName: "Overwatch",
        });
    });
});

app.get("/overwatch/2015", function (req, res) {
    Data.find({'game': 'overwatch', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            barDesc: "The bar chart shows the popularity of Overwatch in 2015. The X axis combine two months in one unit. The Y axis shows the value of searching keywords of the game. From the chart we can see that the values of searching is similar in the different months of 2015. They are around 2900. The months which have maximum value are September to December. However the gap between the maximum and minim values is below 300.",
            bubbleDesc: "The Bubble Chart focuses on the comparison of different months in the percentage. The percentage decides the size of the bubble. From the chart we can clearly see that September to December have the largest searching amount because the size of the bubble is largest. The smallest bubble is in the March and April.",
            data: result,
            currentGame: "overwatch",
            gameName: "Overwatch",
        });
    });
});

app.get("/overwatch/world2014", function (req, res) {
    World.aggregate([{"$match": {year: "2014", game: "overwatch"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'overwatch', 'year': '2014'}, function (err, result) {
            res.render("game_world_14", {
                pieDesc: "The pie chart shows the popularity of different continents. It can be seen that the Europe, Asia and South America are accounted for a large proportion. The game is most popular in the Europe. The popularity in Asia and South America are similar. The Europe nearly accounts for half of the whole chart.",
                barDesc: "The bar chart is about the top 10 countries which have the largest searching frequency about the game. It is clearly shown that the largest volume is in the United States. And the South Korea follows the US locates at the second place. The other countries have a lower volume but the gap is not large. The last one is Venezuela.",
                worldTop: top,
                worldData: result,
                currentGame: "overwatch",
                gameName: "Overwatch",
            });
        });
    });    
});

app.get("/overwatch/world2015", function (req, res) {
    World.aggregate([{"$match": {year: "2015", game: "overwatch"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'overwatch', 'year': '2015'}, function (err, result) {
            res.render("game_world_15", {
                pieDesc: "The pie chart shows the popularity of different continents. It can be seen that the Europe, Asia and South America are accounted for a large proportion. The game is most popular in the Europe. The popularity in Asia and South America are similar. The Europe nearly accounts for half of the whole chart. ",
                barDesc: "The bar chart is about the top 10 countries which have the largest searching frequency about the game. It is clearly shown that the largest volume is in the Sweden. And the Peru follows the Sweden locates at the second place. The other countries have a similar volume which is around 500.",
                worldTop: top,
                worldData: result,
                currentGame: "overwatch",
                gameName: "Overwatch",
            });
        });
    });    
});

app.get("/overwatch/future", function (req, res) {
    Data.find({'game': 'overwatch'}, function (err, result) {
        res.render("future", {
            scatterDesc: "The chart shows the simple linear regression of the trend of years. The line is calculated by the points of each two months. The line is the most suitably line to describe the trend of the popularity of the game. According to the line on the chart, the trend is rising. It can be predicted that it will increase in the early months of 2016.",
            data: result,
            currentGame: "overwatch",
            gameName: "Overwatch",
        });
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
            barDesc: "As the chart shows, from January 2014 to June 2014, the popularity of the Strife has a slight fluctuation. Since July 2014, the popularity of Strife keeps decreasing.",
            bubbleDesc: "The minimum number of searches in 2014 between on January and February, which is less than 3400. However, the main portion of this year is on March, April, July and August, which are over 3800.",
            data: result,
            currentGame: "strife",
            gameName: "Strife",
        });
    });    
});

app.get("/strife/2015", function (req, res) {
    Data.find({'game': 'strife', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            barDesc: "As the chart shows, in 2015, the popularity of the Strife keeps stability. On May, June, September and October, there is some decreament. But at the end of the year, the number of searches reached its maximum value, over 2.5k searches.",
            bubbleDesc: "As the chart shows, the average number of searches is between 2600 and 2700 in 2015. The minimum appeared in the middle of the year, which is less than 2500. At the end of 2015, the searches of Strife reached its maximum value.",
            data: result,
            currentGame: "strife",
            gameName: "Strife",
        });
    });
});

app.get("/strife/world2014", function (req, res) {
    World.aggregate([{"$match": {year: "2014", game: "strife"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'strife', 'year': '2014'}, function (err, result) {
            res.render("game_world_14", {
                pieDesc: "The pie chart shows the popularity of Strife in different continent. The Europe account for the biggest portion in this chart, which is over a half. It seems to be that the Strife’s almost as popular in Asia as in South America.",
                barDesc: "This bar chart illustrates that the volume of search for the Strife in the top 10 countries. Australia is the first, which is over 750. Nevertheless, the tenth is Hungary, just achieve 500.",
                worldTop: top,
                worldData: result,
                currentGame: "strife",
                gameName: "Strife",
            });
        });
    });
});

app.get("/strife/world2015", function (req, res) {
    World.aggregate([{"$match": {year: "2015", game: "strife"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'strife', 'year': '2015'}, function (err, result) {
            res.render("game_world_15", {
                pieDesc: "The pie chart shows the popularity of Strife in different continent. The Europe account for the biggest portion in this chart, which is over a half. It seems to be that the Strife’s almost as popular in Asia as in South America.",
                barDesc: "This bar chart illustrates that the volume of search for the Strife in the top 10 countries. Germany is the first, which is over 750. Furthermore, there are 5 countries, whose values are less than 500.",
                worldTop: top,
                worldData: result,
                currentGame: "strife",
                gameName: "Strife",
            });
        });
    });
});

app.get("/strife/future", function (req, res) {
    Data.find({'game': 'strife'}, function (err, result) {
        res.render("future", {
            scatterDesc: "According to this plot, the number of searches for Strife are keep dwindling since January 2014 to December 2015. So the popularity of Strife maybe decrease in 2016.",
            data: result,
            currentGame: "strife",
            gameName: "Strife",
        });
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
            barDesc: "As the chart shows, from January to June 2014, the popularity of the Heroes of Newerth maintained. The peak value of the popularity appeared on January and February 2014.",
            bubbleDesc: "The popularity for Heroes of Newerth in 2014 has a fluctuation. The minimum number of searches for Heroes of Newerth in 2014 where registered during the period of March and April, which is less than 8300. However, the biggest portion of this year is on January and February, which is over 8800.",
            data: result,
            currentGame: "hon",
            gameName: "Heroes of Newerth",
        });
    });
});

app.get("/hon/2015", function (req, res) {
    Data.find({'game': 'hon', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            barDesc: "As the chart shows, in 2015, the popularity of the Heroes of Newerth was maintained, being the average value around 7k. From September to October, there is an increament, and also was registered the maximum value.",
            bubbleDesc: "This chart demonstrates that there is a fluctuation in popularity of Heroes of Neweerth during January to August in 2015. On September and October, there is a sharply increament in the number of searches, and it achieves the peak value which is over 7400. At the end of 2015, the number of searches reduce to, registiring less than 7000.",
            data: result,
            currentGame: "hon",
            gameName: "Heroes of Newerth",
        });
    });
});

app.get("/hon/world2014", function (req, res) {
    World.aggregate([{"$match": {year: "2014", game: "hon"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'hon', 'year': '2014'}, function (err, result) {
            res.render("game_world_14", {
                pieDesc: "The pie chart shows the popularity of Heroes of Newerth on different continent. The Europe account for the biggest portion in this chart, which is near a half. It seems to be that the Heroes of Newerth is almost as popular in Asia as in South America.",
                barDesc: "This diagram illustrates that the volume of search for the Strife in the top 10 countries. Canada is the first, which is near 2000. Furthermore, there are top 4 countries’ values are over than 1500.",
                worldTop: top,
                worldData: result,
                currentGame: "hon",
                gameName: "Heroes of Newerth",
            });
        });
    });    
});

app.get("/hon/world2015", function (req, res) {
    World.aggregate([{"$match": {year: "2015", game: "hon"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'hon', 'year': '2015'}, function (err, result) {
            res.render("game_world_15", {
                pieDesc: "The pie chart shows the popularity of Heroes of Newerth on different continent. The Europe account for the biggest portion in this chart, which is near a half. It seems to be that the Heroes of Newerth is almost as popular in Asia as in South America.",
                barDesc: "This bar chart illustrates that the volume of search for Heroes of Newrth in the top 10 countries. Argentina is the first, which is over 2k. Nevertheless, the tenth is Ecuador, just over 1k.",
                worldTop: top,
                worldData: result,
                currentGame: "hon",
                gameName: "Heroes of Newerth",
            });
        });
    });    
});

app.get("/hon/future", function (req, res) {
    Data.find({'game': 'hon'}, function (err, result) {
        res.render("future", {
            scatterDesc: "",
            data: result,
            currentGame: "hon",
            gameName: "Heroes of Newerth",
        });
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
            barDesc: "The bar chart shows the popularity of Magicka Wizard Wars. The X axis combine two months in one unit. The Y axis shows the value of searching keywords of the game. From the chart we can see that the values of searching is similar in the different months of 2014. They are around 2000. The months which have maximum value are July and August. However the gap between the maximum and minim values is below 500.",
            bubbleDesc: "The Bubble Chart focuses on the comparison of different months in the percentage. The percentage decides the size of the bubble. From the chart we can clearly see that the July and August have the largest searching amount because the size of the bubble is largest. The smallest bubble is in the September and October.",
            data: result,
            currentGame: "mww",
            gameName: "Magicka Wizard Wars",
        });
    });
});

app.get("/mww/2015", function (req, res) {
    Data.find({'game': 'mww', 'year': '2015'}, function (err, result) {
        res.render("date_15", {
            barDesc: "The bar chart shows the popularity of Magicka Wizard Wars in 2015. The X axis combine two months in one unit. The Y axis shows the value of searching keywords of the game. From the chart we can see that the values of searching is similar in the different months of 2015. They are around 1100. The months which have maximum value are May and June and September to December. However the gap between the maximum and minim values is below 100.",
            bubbleDesc: "The Bubble Chart focuses on the comparison of different months in the percentage. The percentage decides the size of the bubble. From the chart we can clearly see that the May and June have the largest searching amount because the size of the bubble is largest. The smallest bubble is in the September and October.",
            data: result,
            currentGame: "mww",
            gameName: "Magicka Wizard Wars",
        });
    });
});

app.get("/mww/world2014", function (req, res) {
    World.aggregate([{"$match": {year: "2014", game: "mww"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'mww', 'year': '2014'}, function (err, result) {
            res.render("game_world_14", {
                pieDesc: "The pie chart shows the popularity of different continents. It can be seen that the Europe, Asia and South America are accounted for a large proportion. The game is most popular in the Europe. The popularity in Asia and South America are similar. The Europe nearly accounts for half of the whole chart.",
                barDesc: "The bar chart is about the top 10 countries which have the largest searching frequency about the game. It is clearly shown that the largest volume is in the United States. And the Australia follows the US locates at the second place. The other countries have a similar volume which is around 380.",
                worldTop: top,
                worldData: result,
                currentGame: "mww",
                gameName: "Magicka Wizard Wars",
            });
        });
    });
});

app.get("/mww/world2015", function (req, res) {
    World.aggregate([{"$match": {year: "2015", game: "mww"}}, { "$group": {"_id": '$countryName', "recommendCount": { "$sum": "$value" }}}, { "$sort": { "recommendCount": -1 } }, { "$limit": 10 }], function (err, top) { 
        World.find({'game': 'mww', 'year': '2015'}, function (err, result) {
            res.render("game_world_15", {
                pieDesc: "The pie chart shows the popularity of different continents. It can be seen that the Europe, Asia and South America are accounted for a large proportion. The game is most popular in the Europe. The popularity in Asia and South America are similar. The Europe nearly accounts for half of the whole chart. ",
                barDesc: "The bar chart is about the top 10 countries which have the largest searching frequency about the game. It is clearly shown that the largest volume is in the Italy. And the India and Uruguay follow the US locates at the second place. The other countries have a similar volume which is around 180.",
                worldTop: top,
                worldData: result,
                currentGame: "mww",
                gameName: "Magicka Wizard Wars",
            });
        });
    });
});

app.get("/mww/future", function (req, res) {
    Data.find({'game': 'mww'}, function (err, result) {
        res.render("future", {
            scatterDesc: "The chart shows the simple linear regression of the trend of years. The line is calculated by the points of each two months. The line is the most suitably line to describe the trend of the popularity of the game. According to the line on the chart, the trend is declining. It can be predicted that it will decrease in the early months of 2016.",
            data: result,
            currentGame: "mww",
            gameName: "Magicka Wizard Wars",
        });
    });
});


http.createServer(app).listen(3000);