var jqu=jQuery.noConflict();
jqu(function () {
    var months = ["Jan/Feb", "Mar/Apr", "May/Jun", "Jul/Aug", "Sep/Oct", "Nov/Dec"];

    var serie = [];
    var av = [];

    var totalSearches = 0;
    for (var i = 0; i < historical_data.length; i++) {
        totalSearches = totalSearches + historical_data[i].value;
    };

    for (var i = 0; i < historical_data.length; i++) {
        serie.push(historical_data[i].value);
    };

    for (var i = 0; i < serie.length; i++) {
        av.push(serie[i]/totalSearches);
    };

    var title = "Popularity over the year "+historical_data[0].year+" for "+game;
    var serie_name = game+" over the year "+historical_data[0].year;

    jqu('#container-area').highcharts({
        title: {
            text: title
        },
        xAxis: {
            categories: months
        },
        series: [{
            type: 'column',
            name: serie_name,
            data: serie
        }, {
            type: 'spline',
            name: 'Distribution',
            data: serie,
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }],
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 1,
                groupPadding: 0
            }
        }
    });
});