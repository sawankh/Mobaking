var fs = require("fs"),
	readline = require("readline"),
	countries = require("i18n-iso-countries"),
	mongoose = require('mongoose'),
	walk = require('walk');


mongoose.connect("mongodb://localhost/mobaking");

var documentSchema = new mongoose.Schema({
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

var Document = mongoose.model('world', documentSchema);
var Data = mongoose.model('data', documentSchema);

var files = [];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Walker options
var walker  = walk.walk('data', { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
});


walker.on('end', function() {    
    
    for (var i = 0; i < files.length; i++) {
    	readFile(files[i]);
    };
});

function readFile(file) {
	var rl = readline.createInterface({
	    input: fs.createReadStream(file),
	    output: null,
	    terminal: false
	})

	rl.on("line", function(line) {
		if (line != "" && line.indexOf("Month") == -1) {
			var checkType = containsAny(line, months);
			if (checkType != null) {
				var arr = line.split(",");
				
				var period = arr[0];
				var value = arr[1];
				
				var fileExtention = file.split("/");
				var info = fileExtention[0].split("\\");
				
				var game = info[1];
				var year = info[2];

				var documentInsert = new Data({
					value: value,
					game: game,
					period: period,
					year: year
				}).save(function(err,doc){
					if (err) console.log("Error!");
					else console.log("Inserted successfully!");
				});
			} else {
				//console.log("Got line: " + line);
				var arr = line.split(",");	
				var fileExtention = file.split("/");
				var name = fileExtention[1];
				if (name.indexOf("Jan") > -1) {
					name = "January/February";
				} else if (name.indexOf("Mar") > -1) {
					name = "March/April";
				} else if (name.indexOf("May") > -1) {
					name = "May/June";
				} else if (name.indexOf("July") > -1) {
					name = "July/August";
				} else if (name.indexOf("Sept") > -1) {
					name = "September/October";
				} else if (name.indexOf("Nov") > -1) {
					name = "November/December";
				};
				//console.log(name);
				var info = fileExtention[0].split("\\");
				//console.log(info[2]);	
				//console.log(countries.getAlpha2Code(arr[0], 'en'));
				var code = countries.getAlpha2Code(arr[0], 'en');
				var value = arr[1];
				var game = info[1];
				var period = name;
				var year = info[2];

				var documentInsert = new Document({
					country: code,
					value: value,
					game: game,
					period: period,
					year: year
				}).save(function(err,doc){
					if (err) console.log("Error!");
					else console.log("Inserted successfully!");
				});
			};
		};
	});

	rl.on("close", function() {
	    console.log("All data processed. ---> " + file);
	}); 
}

function containsAny(str, substrings) {
     for (var i = 0; i != substrings.length; i++) {
        var substring = substrings[i];
        if (str.indexOf(substring) != - 1) {
          return substring;
        }
     }
     return null; 
 }