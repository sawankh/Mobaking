        var jq=jQuery.noConflict();
        jq(document).ready(function () {

            var months = ["January/February", "March/April", "May/June", "July/August", "September/Ocotber", "November/December"];
            var knobData = ["Jan/Feb", "Mar/Apr", "May/Jun", "Jul/Aug", "Sep/Oct", "Nov/Dec"];
            var datos = {};
            for (var i = 0; i < months.length; i++) {
                datos[months[i]] = {};
                datos[months[i]]["areas"] = {};
                for (var j = 0; j < world_data.length; j++) {
                    if (world_data[j].period == months[i]) {
                        //console.log(world_data[j].period + " --> " + months[i]);
                        var co = new String(world_data[j].country);
                        if (co.toString() !== "undefined") {
                            datos[months[i]]["areas"][world_data[j].country] = {"value" : world_data[j].value, "tooltip" : {"content" : "<span style=\"font-weight:bold;\">"+world_data[j].countryName+"</span><br />Searches : "+world_data[j].value.toString()}, "value" : world_data[j].value};
                        };
                    };
                };
            };
            // Fake data for countries and cities from 2003 to 2013
            var data = datos;

            // Default plots params
            // Knob initialisation (for selecting a year)
            jq(".knob").knob({
                release: function (value) {
                    value = months[value];
                    jq(".world").trigger('update', [{
                        mapOptions: data[value],
                        animDuration: 300
                    }]);
                },
                format: function(value) {
                    return knobData[value];
                },
                draw: function() {
                     jq(".knob").css("font-size","13px");
                }
            });

            // Mapael initialisation
            $world = jq(".world");
            $world.mapael({
                map: {
                    name: "world_countries",
                    defaultArea: {
                        attrs: {
                            fill: "#fff",
                            stroke: "#232323",
                            "stroke-width": 0.3
                        }
                    },
                    defaultPlot: {
                        text: {
                            attrs: {
                                fill: "#b4b4b4"
                            },
                            attrsHover: {
                                fill: "#fff",
                                "font-weight": "bold"
                            }
                        }
                    }
                    , zoom: {
                        enabled: true
                        , step: 0.25
                        , maxLevel: 20
                    }
                },
                legend: {
                    area: {
                        display: true,
                        title: "Search Volume",
                        marginBottom: 7,
                        slices: [
                            {
                                max: 250,
                                attrs: {
                                    fill: "#6ECBD4"
                                },
                                label: "Less than 250"
                            },
                            {
                                min: 250,
                                max: 500,
                                attrs: {
                                    fill: "#3EC7D4"
                                },
                                label: "Between 250 and 500"
                            },
                            {
                                min: 500,
                                max: 750,
                                attrs: {
                                    fill: "#028E9B"
                                },
                                label: "Between 500 and 750"
                            },
                            {
                                min: 1000,
                                attrs: {
                                    fill: "#01565E"
                                },
                                label: "More than 1000"
                            }
                        ]
                    },
                    plot: {
                        display: true,
                        title: "City population",
                        marginBottom: 6
                        }
                },
                areas: data[months[0]]['areas']
            });
        });