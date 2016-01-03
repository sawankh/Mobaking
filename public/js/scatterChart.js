var jq=jQuery.noConflict();
jq(function () {
        var months = ["Jan/Feb", "Mar/Apr", "May/Jun", "Jul/Aug", "Sep/Oct", "Nov/Dec"];

        /* Generate random colors */
        var colors = ["#D4D4D", "#5DA5DA", "#FAA43A", "#60BD68", "#F17CB0", "#B2912F", "#B276B2","#DECF3F", "#F15854"];
        var randomColorLine = parseInt((Math.random() * ((colors.length - 1) - 0 + 1)), 10) + 0;
        var randomColorDots = parseInt((Math.random() * ((colors.length - 1) - 0 + 1)), 10) + 0;

        /* Varibles of regression line and labels for X axis */
        var serie = [];
        var regressionValues = [];
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

        console.log(axisX_labels);

        for (var i = 0; i < historical_data.length; i++) {
            console.log(historical_data[i].year);
            serie.push(historical_data[i].value);
        };

        serie.reverse();

        var title = "Scatter Plot with regression line for "+game;


        /* Calculating regression line points */
        var x_values = [];
        for (var i = 0; i < 12; i++) {
            x_values.push(i);
        };

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
         var values_length = x_values.length;

         if (values_length != serie.length) {
            throw new Error('The parameters x_values and serie need to have same size!');
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
         for (var v = 0; v < values_length; v++) {
            x = x_values[v];
            y = serie[v];
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
         var result_x_values = [];
         var result_serie = [];

         for (var v = 0; v < values_length; v++) {
            x = x_values[v];
            y = x * m + b;
            regressionValues.push([x,y]);
        }

        /* Time to predict one more year (2016) */
        for (var i = 12; i < 12 * 2; i++) {
            x = i;
            y = x * m + b;
            regressionValues.push([x,y]);   
        };

        jq('#container-scatter').highcharts({
            xAxis: {
                min: 0,
                max: 17,
                categories: axisX_labels
            },
            yAxis: {
                title: {
                        text: 'Number of searches'
                        }
            },
            title: {
                text: title
            },
            series: [{
                type: 'line',
                name: 'Regression Line',
                data: regressionValues,
                color: colors[randomColorLine],
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        lineWidth: 0
                    }
                },
                enableMouseTracking: true
            }, {
                type: 'scatter',
                name: 'Volume of Search',
                data: serie,
                color: colors[randomColorDots],
                marker: {
                    radius: 4
                }
            }]
        });
    });