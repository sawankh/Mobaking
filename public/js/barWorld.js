var jqu=jQuery.noConflict();
jqu(function () {

    var dataCategories = [];
    var serie = [];
    var title = "Top 10 countries for "+game;
    
    for (var i = 0; i < bar_data.length; i++) {
        dataCategories.push(bar_data[i]._id);
        serie.push(bar_data[i].recommendCount);
    };

    jqu('#container-bar').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        xAxis: {
            categories: dataCategories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'countries',
            data: serie

        }]
    });
});