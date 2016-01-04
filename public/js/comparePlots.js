var jqu=jQuery.noConflict();
jqu("#compare").click(function () {
	var selector = jqu("#gameSelect").val();
	console.log(selector.length);
	if (selector != null && selector.length == 2) {
		var selector = jqu("#gameSelect").val();
		var games = ["League of Legends", "Dota 2", "Infinite Crisis", "Smite", "Heroes of the Storm", "Heroes of Newreth", "Strife", "Airmech", "Overwatch", "Magicka Wizard Wars"];

		var game1 = games[selector[0] - 1];
		var game2 = games[selector[1] - 1];

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
		
		var serie1 = [];
		var serie2= [];

		if (game1 == "League of Legends") {
			serie1 = serieLol;
		} else if (game1 == "Dota 2") {
			serie1 = serieDota2;
		} else if (game1 == "Airmech") {
			serie1 = serieAirmech;
		} else if (game1 == "Heroes of Newreth") {
			serie1 = serieHon;
		} else if (game1 == "Heroes of the Storm") {
			serie1 = serieHos;
		} else if (game1 == "Smite") {
			serie1 = serieSmite;
		} else if (game1 == "Strife") {
			serie1 = serieStrife;
		} else if (game1 == "Overwatch") {
			serie1 = serieOverwatch;
		} else if (game1 == "Magicka Wizard Wars") {
			serie1 = serieMww;
		} else if (game1 == "Infinite Crisis") {
			serie1 = serieIc;
		};


		if (game2 == "League of Legends") {
			serie2 = serieLol;
		} else if (game2 == "Dota 2") {
			serie2 = serieDota2;
		} else if (game2 == "Airmech") {
			serie2 = serieAirmech;
		} else if (game2 == "Heroes of Newreth") {
			serie2 = serieHon;
		} else if (game2 == "Heroes of the Storm") {
			serie2 = serieHos;
		} else if (game2 == "Smite") {
			serie2 = serieSmite;
		} else if (game2 == "Strife") {
			serie2 = serieStrife;
		} else if (game2 == "Overwatch") {
			serie2 = serieOverwatch;
		} else if (game2 == "Magicka Wizard Wars") {
			serie2 = serieMww;
		} else if (game2 == "Infinite Crisis") {
			serie2 = serieIc;
		};

		for (var i = 0; i < serie2.length; i++) {
			serie2[i] = serie2[i] * -1;
		}; 

		jqu('#container-bar').highcharts({
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Popularity pyramid for ' + game1 + " and " + game2 + ' over the years 2014 and 2015'
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
		        			return Math.abs(this.value);
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
		        		return '<b>' + this.series.name + ', period ' + this.point.category + '</b><br/>' +
		        		'Volume of search: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0) + " searches";
		        	}
		        },

		        series: [{
		        	name: game1,
		        	data: serie1
		        }, {
		        	name: game2,
		        	data: serie2
		        }]
		    });

	//-------------------------------------------------------------- o ----------------------------------//
	   /**
     * In order to synchronize tooltips and crosshairs, override the
     * built-in events with handlers defined on the parent element.
     */
     jqu('#container-area').bind('mousemove touchmove', function (e) {
     	var chart,
     	point,
     	i;

     	for (i = 0; i < Highcharts.charts.length; i = i + 1) {
     		chart = Highcharts.charts[i];
            e = chart.pointer.normalize(e); // Find coordinates within the chart
            point = chart.series[0].searchPoint(e, true); // Get the hovered point

            if (point) {
                point.onMouseOver(); // Show the hover marker
                chart.tooltip.refresh(point); // Show the tooltip
                chart.xAxis[0].drawCrosshair(e, point); // Show the crosshair
            }
        }
    });
    /**
     * Override the reset function, we don't need to hide the tooltips and crosshairs.
     */
     Highcharts.Pointer.prototype.reset = function () {
     	return undefined;
     };

    /**
     * Synchronize zooming through the setExtremes event handler.
     */
     function syncExtremes(e) {
     	var thisChart = this.chart;

        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        	Highcharts.each(Highcharts.charts, function (chart) {
        		if (chart !== thisChart) {
                    if (chart.xAxis[0].setExtremes) { // It is null while updating
                    	chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                    }
                }
            });
        }
    }

    serie3 = [];
    for (var i = 0; i < serie2.length; i++) {
    	serie3.push(serie2[i] * -1);
    };

    jqu('<div class="chart">')
    .appendTo('#container-area')
    .highcharts({
    	chart: {
                        marginLeft: 40, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20,
                        zoomType: 'x'
                    },
                    title: {
                    	text: "Popularity for " + game1 + " over years 2014 and 2015",
                    	align: 'left',
                    	margin: 0,
                    	x: 30
                    },
                    credits: {
                    	enabled: false
                    },
                    legend: {
                    	enabled: false
                    },
                    xAxis: {
                    	crosshair: true,
                    	categories: axisX_labels,
                    	events: {
                    		setExtremes: syncExtremes
                    	},
                    	labels: {
                    		format: '{value} '
                    	}
                    },
                    yAxis: {
                    	title: {
                    		text: null
                    	}
                    },
                    tooltip: {
                    	positioner: function () {
                    		return {
                                x: this.chart.chartWidth - this.label.width, // right aligned
                                y: -1 // align to title
                            };
                        },
                        borderWidth: 0,
                        backgroundColor: 'none',
                        pointFormat: '{point.y}',
                        headerFormat: '',
                        shadow: false,
                        style: {
                        	fontSize: '18px'
                        },
                        valueDecimals: 0
                    },
                    series: [{
                    	data: serie1,
                    	name: game1,
                    	type: "area",
                    	color: Highcharts.getOptions().colors[i],
                    	fillOpacity: 0.3,
                    	tooltip: {
                    		valueSuffix: ' searches' 
                    	}
                    }]
                });

jqu('<div class="chart">')
.appendTo('#container-area')
.highcharts({
	chart: {
                        marginLeft: 40, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20,
                        zoomType: 'x'
                    },
                    title: {
                    	text: "Popularity for " + game2 + " over years 2014 and 2015",
                    	align: 'left',
                    	margin: 0,
                    	x: 30
                    },
                    credits: {
                    	enabled: false
                    },
                    legend: {
                    	enabled: false
                    },
                    xAxis: {
                    	crosshair: true,
                    	categories: axisX_labels,
                    	events: {
                    		setExtremes: syncExtremes
                    	},
                    	labels: {
                    		format: '{value} '
                    	}
                    },
                    yAxis: {
                    	title: {
                    		text: null
                    	}
                    },
                    tooltip: {
                    	positioner: function () {
                    		return {
                                x: this.chart.chartWidth - this.label.width, // right aligned
                                y: -1 // align to title
                            };
                        },
                        borderWidth: 0,
                        backgroundColor: 'none',
                        pointFormat: '{point.y}',
                        headerFormat: '',
                        shadow: false,
                        style: {
                        	fontSize: '18px'
                        },
                        valueDecimals: 0
                    },
                    series: [{
                    	data: serie3,
                    	name: game2,
                    	type: "area",
                    	color: Highcharts.getOptions().colors[1],
                    	fillOpacity: 0.3,
                    	tooltip: {
                    		valueSuffix: ' searches'
                    	}
                    }]
                });

};
});
