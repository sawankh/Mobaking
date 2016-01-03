var jqu=jQuery.noConflict();
jqu("#compare").click(function () {
	var selector = jqu("#gameSelect").val();
	console.log(selector.length);
	if (selector != null && selector.length == 2) {
		var selector = jqu("#gameSelect").val();

		console.log(selector);

		var games = ["lol", "dota2", "ic", "smite", "hos", "hon", "strife", "airmech", "overwatch", "mww"];

		var months = ["Jan/Feb", "Mar/Apr", "May/Jun", "Jul/Aug", "Sep/Oct", "Nov/Dec"];
		var m = ["January-February 2014", "March-April 2014", "May-June 2014", "July-August 2014", "September-October 2014", "November-December 2014", "January-February 2015", "March-April 2015", "May-June 2015", "July-August 2015", "September-October 2015", "November-December 2015"];

		/* Varibles of regression line and labels for X axis */
		var serieLol = [];
		var serieDota2 = [];
		var serieAirmech = [];
		var serieHos = [];
		var serieHon = [];
		var serieMww = [];
		var serieIc = [];
		var serieSmite = [];
		var serieStrife = [];
		var serieOverwatch = [];

		var axisX_labels = [];

		/* Calculating labels */
		year = 2014;
		for (var i = 0; i < (3 * months.length); i++) {
		    if ((i % months.length) == 0 && i != 0) {
		        year++;
		    };
		    var label = months[i % months.length]+" "+year.toString();
		    axisX_labels.push(label);
		}

		for (var i = 0; i < world_data.length; i++) {
		    if (world_data[i].game == "lol") {
		        serieLol.push([world_data[i].value, m.indexOf(world_data[i].period+" "+world_data[i].year)]);
		    } else if (world_data[i].game == "dota2") {
		        serieDota2.push([world_data[i].value, m.indexOf(world_data[i].period+" "+world_data[i].year)]);
		    } else if (world_data[i].game == "airmech") {
		        serieAirmech.push([world_data[i].value, m.indexOf(world_data[i].period+" "+world_data[i].year)]);
		    } else if (world_data[i].game == "hos") {
		        serieHos.push([world_data[i].value, m.indexOf(world_data[i].period+" "+world_data[i].year)]);
		    } else if (world_data[i].game == "hon") {
		        serieHon.push([world_data[i].value, m.indexOf(world_data[i].period+" "+world_data[i].year)]);
		    } else if (world_data[i].game == "ic") {
		        serieIc.push([world_data[i].value, m.indexOf(world_data[i].period+" "+world_data[i].year)]);
		    } else if (world_data[i].game == "smite") {
		        serieSmite.push([world_data[i].value, m.indexOf(world_data[i].period+" "+world_data[i].year)]);
		    } else if (world_data[i].game == "overwatch") {
		        serieOverwatch.push([world_data[i].value, m.indexOf(world_data[i].period+" "+world_data[i].year)]);
		    } else if (world_data[i].game == "mww") {
		        serieMww.push([world_data[i].value, m.indexOf(world_data[i].period+" "+world_data[i].year)]);
		    } else if (world_data[i].game == "strife") {
		        serieStrife.push([world_data[i].value, m.indexOf(world_data[i].period+" "+world_data[i].year)]);
		    };
		};

		serieLol.sort(compareSecondColumn);
		serieDota2.sort(compareSecondColumn);
		serieAirmech.sort(compareSecondColumn);
		serieHos.sort(compareSecondColumn);
		serieHon.sort(compareSecondColumn);
		serieIc.sort(compareSecondColumn);
		serieSmite.sort(compareSecondColumn);
		serieStrife.sort(compareSecondColumn);
		serieOverwatch.sort(compareSecondColumn);
		serieMww.sort(compareSecondColumn);

		function compareSecondColumn(a, b) {
		    if (a[1] === b[1]) {
		        return 0;
		    }
		    else {
		        return (a[1] < b[1]) ? -1 : 1;
		    }
		}

		function slice(arr) {
		    var sl = [];
		    for (var i = 0; i < arr.length; i++) {
		        sl.push(arr[i][0]);
		    };
		    return sl;
		}

		serieLol = slice(serieLol);
		serieDota2 = slice(serieDota2);
		serieAirmech = slice(serieAirmech);
		serieHos = slice(serieHos);
		serieHon = slice(serieHon);
		serieIc = slice(serieIc);
		serieSmite = slice(serieSmite);
		serieStrife = slice(serieStrife);
		serieOverwatch = slice(serieOverwatch);
		serieMww = slice(serieMww);
		
		    jqu('#container-area').highcharts({
		        chart: {
		            type: 'bar'
		        },
		        title: {
		            text: 'Population pyramid for Germany, 2015'
		        },
		        subtitle: {
		            text: 'Source: <a href="http://populationpyramid.net/germany/2015/">Population Pyramids of the World from 1950 to 2100</a>'
		        },
		        xAxis: [{
		            categories: axisX_labels,
		            reversed: false,
		            labels: {
		                step: 1
		            }
		        }, { // mirror axis on right side
		            opposite: true,
		            reversed: false,
		            categories: axisX_labels,
		            linkedTo: 0,
		            labels: {
		                step: 1
		            }
		        }],
		        yAxis: {
		            title: {
		                text: null
		            },
		            labels: {
		                formatter: function () {
		                    return Math.abs(this.value) + '%';
		                }
		            }
		        },

		        plotOptions: {
		            series: {
		                stacking: 'normal'
		            }
		        },

		        tooltip: {
		            formatter: function () {
		                return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
		                    'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
		            }
		        },

		        series: [{
		            name: 'Male',
		            data: [-2.2, -2.2, -2.3, -2.5, -2.7, -3.1, -3.2,
		                -3.0, -3.2, -4.3, -4.4, -3.6, -3.1, -2.4,
		                -2.5, -2.3, -1.2, -0.6, -0.2, -0.0, -0.0]
		        }, {
		            name: 'Female',
		            data: [2.1, 2.0, 2.2, 2.4, 2.6, 3.0, 3.1, 2.9,
		                3.1, 4.1, 4.3, 3.6, 3.4, 2.6, 2.9, 2.9,
		                1.8, 1.2, 0.6, 0.1, 0.0]
		        }]
		    });
	};
});
