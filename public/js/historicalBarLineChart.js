var jqu=jQuery.noConflict();
jqu(function () {
    var months = ["Jan/Feb", "Mar/Apr", "May/Jun", "Jul/Aug", "Sep/Oct", "Nov/Dec"];

    var serie = [];

    for (var i = 0; i < historical_data.length; i++) {
        serie.push(historical_data[i].value);
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
            name: 'Average',
            data: serie,
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }]
    });
});