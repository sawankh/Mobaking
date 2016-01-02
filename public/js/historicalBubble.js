var jq=jQuery.noConflict();
jq(function () {
    var months = ["Jan/Feb", "Mar/Apr", "May/Jun", "Jul/Aug", "Sep/Oct", "Nov/Dec"];

    var serie = [];

    var totalSearches = 0;
    for (var i = 0; i < historical_data.length; i++) {
        totalSearches = totalSearches + historical_data[i].value;
    };

    var percentage = 100 / totalSearches;

    for (var i = 0; i < historical_data.length; i++) {
        serie.push([historical_data[i].period, historical_data[i].value, historical_data[i].value * percentage]);
    };

    var title = "Popularity over the year "+historical_data[0].year+" for "+game;
    var serie_name = game+" over the year "+historical_data[0].year;
    console.log(serie);

    jq('#container-bubble').highcharts({

        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        title: {
            text: title
        },

        xAxis: {
            title: {
                    text: 'Period of time'
                    },
            gridLineWidth: 1,
            categories: months
        },

        yAxis: {
            title: {
                    text: 'Number of searches'
                    },
            startOnTick: false,
            endOnTick: false
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h3> {point.country}</h3></th></tr>' +
                '<tr><th>Period:</th><td> {point.x}</td></tr>' +
                '<tr><th>Volume of Search:</th><td> {point.y}</td></tr>' +
                '<tr><th>Percentage:</th><td> {point.z:,0.2f}%</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        series: [{
            name: serie_name,
            data: serie,
            marker: {
                fillColor: {
                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, 'rgba(255,255,255,0.5)'],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                    ]
                }
            }
        }]
    });
});