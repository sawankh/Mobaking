var jq=jQuery.noConflict();
jq(function () {
    var months = ["Jan/Feb", "Mar/Apr", "May/Jun", "Jul/Aug", "Sep/Oct", "Nov/Dec"];

    var colors = ["#D4D4D", "#5DA5DA", "#FAA43A", "#60BD68", "#F17CB0", "#B2912F", "#B276B2","#DECF3F", "#F15854"];
    var randomColor = parseInt((Math.random() * ((colors.length - 1) - 0 + 1)), 10) + 0;

    var serie = [];

    for (var i = 0; i < historical_data.length; i++) {
        serie.push(historical_data[i].value);
    };

    var title = "Scatter Plot with regression line for "+game;
    
    jq('#container-scatter').highcharts({
        xAxis: {
            min: -0.5,
            max: 5.5
        },
        yAxis: {
            min: 0
        },
        title: {
            text: title
        },
        series: [{
            type: 'line',
            name: 'Regression Line',
            data: [[0, 1.11], [5, 4.51]],
            marker: {
                enabled: false
            },
            states: {
                hover: {
                    lineWidth: 0
                }
            },
            enableMouseTracking: false
        }, {
            type: 'scatter',
            name: 'Observations',
            data: serie,
            marker: {
                radius: 4
            }
        }]
    });
});