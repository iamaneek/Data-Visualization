$(function () {
    const property = 'hc-key';

    const saarc_countries = [
        'af',  // Afghanishtan
        'bd',  // Bangladesh
        'bt',  // Bhutan
        'in',  // India
        'mv',  // Maldives
        'np',  // Nepal
        'pk',  // Pakistan
        'lk'  // Sri Lanka
    ]

    const visited_states_in_india = [
        // 19/35
        
        'in-ap',  // Andhra Pradesh
        'in-br',  // Bihar
        'in-dl',  // Delhi
		'in-as',  // Assam
		'in-sk',  // Sikkim
		'in-py',  // Puducherry
		'in-ml',  // Meghalaya
        'in-ga',  // Goa
		'in-kl',  // Kerela
        'in-hp',  // Himachal Pradesh
        'in-jh',  // Jharkhand
        'in-ka',  // Karnataka
        'in-mh',  // Maharashtra
        'in-or',  // Orissa
        'in-tn',  // Tamil Nadu
        'in-up',  // Uttar Pradesh
        'in-ut',  // Utrakhand
        'in-wb'  // West Bengal
    ]

    ;

    function getDrilldown(data, visited) {
        $.each(data, function(i) {
            this.value = visited.indexOf(this.properties[property]);
        });
        return data;
    }

    // Fetch data
    var asia_data =  Highcharts.geojson(Highcharts.maps['custom/asia']);


    var india_data =  Highcharts.geojson(Highcharts.maps['countries/in/custom/in-all-disputed']);


    console.log(india_data);

    // Set drilldown pointers
    $.each(asia_data, function (i) {

        if (this.properties[property] == 'in') {
            //this.drilldown = getDrilldown(
                //india_data,
                //visited_states_in_india);
			this.click='india/india.html';
            this.drilldownLabel = 'India';
        }

        this.value = saarc_countries.indexOf(this.properties[property]);
    });

    // Instanciate the map
    $('#container').highcharts('Map', {
        chart: {
            spacingBottom: 20,
            events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {
                        var chart = this;
                        var data = e.point.drilldown;
                        var label = e.point.drilldownLabel;

                        chart.addSeriesAsDrilldown(e.point, {
                            name: label,
                            data: data,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            },
                            tooltip: {
                                headerFormat: '',
                                pointFormat: '{point.name}'
                            }
                        });
                    }
                    chart.setTitle(null, { text: 'asia' });
                },
                drillup: function () {
                    this.setTitle(null, { text: 'asia' });
                }
            }
        },
        title : {
            text : 'Economic Development of SAARC Countries (1992 to 2016)',
        },

        subtitle: {
            text: ' Aneek Barman Roy, Department of Computer Science & Statistics, Trinity College Dublin, barmanra@tcd.ie',
        },

        mapNavigation: {
            enabled: true,
            enableMouseWheelZoom: false,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            dataClasses: [{
                from: -100,
                to: 0,
                color: '#ffd08e',
                name: 'Non-SAARC Countries'
            }, {
                from: 0,
                to: 100,
                color: '#0f96e0',
                name: 'SAARC Countries'
            }]
        },

        plotOptions: {
            map: {
                states: {
                    hover: {
                        color: '#EEDD66'
                    }
                }
            }
        },
		
		plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        if (this.properties[property] == 'in') {
							location.href = 'india/india.html' // + this.options.key;
							this.drilldownLabel = 'India';
						}
						else if (this.properties[property]=='bd'){
							location.href = 'bangladesh/bangladesh.html' // + this.options.key;
							this.drilldownLabel = 'Bangladesh';
							
						}
						else if (this.properties[property]=='pk'){
							location.href = 'pakistan/pakistan.html' // + this.options.key;
							this.drilldownLabel = 'Pakistan';
							
						}
						else if (this.properties[property]=='af'){
							location.href = 'afghanistan/afghanistan.html' // + this.options.key;
							this.drilldownLabel = 'Afghanistan';
							
						}
						else if (this.properties[property]=='bt'){
							location.href = 'bhutan/bhutan.html' // + this.options.key;
							this.drilldownLabel = 'Bhutan';
							
						}
						else if (this.properties[property]=='np'){
							location.href = 'nepal/nepal.html' // + this.options.key;
							this.drilldownLabel = 'Nepal';
							
						}
						else if (this.properties[property]=='lk'){
							location.href = 'srilanka/srilanka.html' // + this.options.key;
							this.drilldownLabel = 'Sri Lanka';
							
						}
						
                    }
                }
            }
        }
        },
		
		

        series : [{
            name: 'World',
            data: asia_data,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.name}'
            }
        }],

        drilldown: {
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textShadow: '0 0 3px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        }
    });
});
