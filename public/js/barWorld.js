var jqu=jQuery.noConflict();
jqu(function () {

    var colors = ["#D4D4D", "#5DA5DA", "#FAA43A", "#60BD68", "#F17CB0", "#B2912F", "#B276B2","#DECF3F", "#F15854"];
    var randomColor = parseInt((Math.random() * ((colors.length - 1) - 0 + 1)), 10) + 0;

    var dataCategories = [];
    var serie = [];
    var title = "Top 10 countries for "+game+" over the year "+world_data[0].year;
    
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
                text: 'Volume of Search (nº of searches)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
            name: 'nº searches',
            data: serie,
            color: colors[randomColor]
        }]
    });
});