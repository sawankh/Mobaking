var jqe=jQuery.noConflict();
jqe(function () {
    
    /* Continents */
    /* Africa */
    var africa = ['Algeria', 'Angolia', 'Benin', 'Botswana', 'Burkina', 'Burundi', 'Cameroon', 'Central African Republic', 'Chad', 'Chana', 'Comoros Island', 'Congo', 'Congo (Zaire)', 'Cote D\'Ivoire', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Guinea', 'Guinea Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tomi and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'Republic of South Africa', 'Sudan', 'Swaziland', 'Tanzania', 'Tunisia', 'Togo', 'Uganda', 'Zambia', 'Zimbabwe'];

    /* Antarctica */
    var antarctica = ['Mainland Antarctica', 'United Kingdom (Islands only)'];

    /* Asia */
    var asia = ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'Iran', 'Iraq', 'India', 'Indonesia', 'Israel and Gaza', 'Japan', 'Jordan', 'Kazakstan', 'Kuwait', 'Kyrgzstan', 'Laos', 'Lebanon', 'Malaysia', 'Mongolia', 'Myanmar (Burma)', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palau', 'Phillipines', 'Quatar', 'Russian Federation', 'Saudi Arabia', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikstan', 'Thailand', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'];

    /* Oceania */
    var oceania = ['Australia', 'Fiji', 'France (Islands only)', 'Kiribati', 'Marshall Islands', 'Micronesia, F.S.O', 'Nauru', 'New Zealand', 'Papua New Guinea', 'Solomon Islands', 'Tonga', 'Tuvalu', 'United Kingdom (Islands only)', 'Vanuatu', 'Western Samoa'];

    /* Europe */
    var europe = ['Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia-Herzegovina', 'Bulgaria', 'Cape Verde', 'Croatia', 'Czech Republic', 'Denmark and Greenland', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Republic of Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Yugoslavia'];

    /* North America */
    var northAmerica = ['Barbados', 'Bahamas', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 'France (Islands only)', 'Greenland (Denmark)', 'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Netherlands (Islands only)', 'Pacific Islands Inc. Hawaii', 'Panama', 'St Kitts-Nevis', 'St Lucia', 'St Vincent and the Grenadines', 'Trinidad and Tobago', 'United Kingdom (Islands only)', 'United States Of America'];

    /* South America */
    var southAmerica = ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'French Guiana', 'Guyana', 'Nicaragua', 'Paraguay', 'Peru', 'Suriname', 'United Kingdom (Islands only)', 'Uruguay', 'Venezuela']; 

    var datos = [];

    jqe('#container').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Popularity based on continent'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Continent Popularity',
            data: [
                ['Firefox', 45.0],
                ['IE', 26.8],
                ['Chrome', 12.8],
                ['Safari', 8.5],
                ['Opera', 6.2],
                ['Others', 0.7]
            ]
        }]
    });
});