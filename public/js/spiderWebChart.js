var jqu=jQuery.noConflict();
jqu(function () {
    var months = ["Jan/Feb", "Mar/Apr", "May/Jun", "Jul/Aug", "Sep/Oct", "Nov/Dec"];

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

    jqu('#container-radar').highcharts({

        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: 'Budget vs spending',
            x: -80
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: axisX_labels,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b> {point.y:,.0f}</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },

        series: [{
            name: 'Allocated Budget',
            data: [43000, 19000, 60000, 35000, 17000, 10000, 43000, 19000, 60000, 35000, 17000, 10000],
            pointPlacement: 'on'
        }, {
            name: 'Actual Spending',
            data: [50000, 39000, 42000, 31000, 26000, 14000, 50000, 39000, 42000, 31000, 26000, 14000],
            pointPlacement: 'on'
        }]

    });
});