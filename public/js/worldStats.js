var jq=jQuery.noConflict();
jq(function () {
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

    
    jq('#container-area').highcharts({
        title: {
            text: 'Popularity of Games',
            x: -20 //center
        },
        xAxis: {
            categories: axisX_labels
        },
        yAxis: {
            title: {
                text: 'Volume of Search'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'League of Legends',
            data: serieLol
        }, 
        {
            name: 'Dota 2',
            data: serieDota2
        }, {
            name: 'Airmech',
            data: serieAirmech
        }, {
            name: 'Heroes of the Storm',
            data: serieHos
        }, {
            name: 'Heroes of Newreth',
            data: serieHon
        }, {
            name: 'Infinite Crisis',
            data: serieIc
        }, {
            name: 'Smite',
            data: serieSmite
        }, {
            name: 'Strife',
            data: serieStrife
        }, {
            name: 'Overwatch',
            data: serieOverwatch
        }, {
            name: 'Magicka Wizard Wars',
            data: serieMww
        }]
    });
});