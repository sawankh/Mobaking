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

    var regressionLine = function findLineByLeastSquares(values_x, values_y) {
            var sum_x = 0;
            var sum_y = 0;
            var sum_xy = 0;
            var sum_xx = 0;
            var count = 0;

        /*
         * We'll use those variables for faster read/write access.
         */
         var x = 0;
         var y = 0;
         var values_length = values_x.length;

         if (values_length != values_y.length) {
            throw new Error('The parameters values_x and values_y need to have same size!');
        }

        /*
         * Nothing to do.
         */
         if (values_length === 0) {
            return [ [], [] ];
        }

        /*
         * Calculate the sum for each of the parts necessary.
         */
         for (var v = 0; v &lt; values_length; v++) {
            x = values_x[v];
            y = values_y[v];
            sum_x += x;
            sum_y += y;
            sum_xx += x*x;
            sum_xy += x*y;
            count++;
        }

        /*
         * Calculate m and b for the formular:
         * y = x * m + b
         */
         var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
         var b = (sum_y/count) - (m*sum_x)/count;

        /*
         * We will make the x and y result line now
         */
         var result_values_x = [];
         var result_values_y = [];

         for (var v = 0; v &lt; values_length; v++) {
            x = values_x[v];
            y = x * m + b;
            result_values_x.push(x);
            result_values_y.push(y);
        }

        return [result_values_x, result_values_y];
    };
    
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