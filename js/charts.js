/* Sortiertfunktion */
function sortResults(data, prop, asc) {
    data = data.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}
/* Highcharts theme */

Highcharts.theme = {
    colors: ['#e9594a', '#AEA692', '#00AEEF', '#e9a94a', '#ae9892','#7befde', '#b2e94a', '#92aead','#7b8cef'],
    chart: {
        style: {
            fontFamily: 'Georgia',
        }
    }
};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);

var showLabels = $(window).width() > 768;

/*
Block 1: Demographie
Geschlecht, Alter, Migration: 1 stacked bar
SO, SA, Glaube: Donut charts
Block 2: Partei: Semicircle donut
Block 3: Bier: Bar chart (weil mehrfachnennung)
Block 4: Fußball: Bubble
Block 5: Automarke: Donut
Block 6: 1 stacked bar
*/

/* Block 1: Demographie: 1 stacked bar / donut */

/* chart 1.1: geschlecht */
// array filtern
chart11data = $.grep(data, function (data) {
  return data.variable === "Geschlecht";
}); sortResults(chart11data, 'target_percent', asc=false);
// Populate series
var chart11series = [];
for (i = 0; i < chart11data.length; i++){
    chart11series.push({
      name: chart11data[i].answer,
      data: [chart11data[i].target_percent],
    });
}
var chart11seriesDE = [];
for (i = 0; i < chart11data.length; i++){
    chart11seriesDE.push(chart11data[i].control_percent);
}
$(function () {
    $('#chart11').highcharts({
        chart: {
            backgroundColor: null,
            type: 'bar',
            margin: [0,0,0,0]
        },
        title: {text: ''},
        xAxis: {enabled: false,},
        yAxis: {enabled: false,},
        legend: {enabled: false,},
        credits: {enabled: false,},
        tooltip: {
            formatter: function() {
                return "<strong>" + this.series.name + ":</strong> Etwa " + Math.round(this.y*10)/10 + " %";
            }
        },
        plotOptions: {
            series: {
                stacking: 'percent',
                pointPadding: 0,
                groupPadding: 0,
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    },
                    formatter: function() {
                        return "<strong>" + this.series.name + "</strong>";
                    }
                }
            },
        },
        series: $.extend(true,[],chart11series),
    });
    $('.highcharts-axis').css('display','none');
});

/* chart 1.2: geschlecht */
// array filtern
chart12data = $.grep(data, function (data) {
  return data.variable === "Alter";
}); sortResults(chart12data, 'target_percent', asc=false);
// Populate series
var chart12series = [];
for (i = 0; i < chart12data.length; i++){
    chart12series.push({
      name: chart12data[i].answer,
      data: [chart12data[i].target_percent],
    });
}
var chart12seriesDE = [];
for (i = 0; i < chart12data.length; i++){
    chart12seriesDE.push(chart12data[i].control_percent);
}
$(function () {
    $('#chart12').highcharts({
        chart: {
            backgroundColor: null,
            type: 'bar',
            margin: [0,0,0,0]
        },
        title: {text: ''},
        xAxis: {enabled: false,},
        yAxis: {enabled: false,},
        legend: {enabled: false,},
        credits: {enabled: false,},
        tooltip: {
            formatter: function() {
                return "<strong>" + this.series.name + ":</strong> Etwa " + Math.round(this.y*10)/10 + " %";
            }
        },
        plotOptions: {
            series: {
                stacking: 'percent',
                pointPadding: 0,
                groupPadding: 0,
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    },
                    formatter: function() {
                        return "<strong>" + this.series.name + "</strong>";
                    }
                }
            },
        },
        series: $.extend(true,[],chart12series),
    });
    $('.highcharts-axis').css('display','none');
});

/* chart 1.3: migrationshintergrund */
// array filtern
chart13data = $.grep(data, function (data) {
  return data.variable === "Migrationshintergrund";
}); sortResults(chart13data, 'target_percent', asc=false);
// Populate series
var chart13series = [];
for (i = 0; i < chart13data.length; i++){
    chart13series.push({
      name: chart13data[i].answer,
      data: [chart13data[i].target_percent],
    });
}
var chart13seriesDE = [];
for (i = 0; i < chart13data.length; i++){
    chart13seriesDE.push(chart13data[i].control_percent);
}
$(function () {
    $('#chart13').highcharts({
        chart: {
            backgroundColor: null,
            type: 'bar',
            margin: [0,0,0,0]
        },
        title: {text: ''},
        xAxis: {enabled: false,},
        yAxis: {enabled: false,},
        legend: {enabled: false,},
        credits: {enabled: false,},
        tooltip: {
            formatter: function() {
                return "<strong>" + this.series.name + ":</strong> Etwa " + Math.round(this.y*10)/10 + " %";
            }
        },
        plotOptions: {
            series: {
                stacking: 'percent',
                pointPadding: 0,
                groupPadding: 0,
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    },
                    formatter: function() {
                        return "<strong>" + this.series.name + "</strong>";
                    }
                }
            },
        },
        series: $.extend(true,[],chart13series),
    });
    $('.highcharts-axis').css('display','none');
});

/* chart 1.4: sexuelle orientierung */
// array filtern
chart14data = $.grep(data, function (data) {
  return data.variable === "Sexuelle Orientierung";
});
sortResults(chart14data, 'target_percent', asc=false);
// Populate series
var chart14series = [];
for (i = 0; i < chart14data.length; i++){
    chart14series.push([chart14data[i].answer, chart14data[i].target_percent]);
}
var chart14seriesDE = [];
for (i = 0; i < chart14data.length; i++){
    chart14seriesDE.push([chart14data[i].answer, chart14data[i].control_percent]);
}
$(function () {
    $('#chart14').highcharts({
        chart: {
            type: 'pie',
            backgroundColor: null,
            margin: [0, 0, 0, 0],
        },
        title: {text: null},
        tooltip: {
          useHTML: true,
          formatter: function () {
              return "<strong>" + this.point.name + ":</strong> Etwa " + Math.round(this.y*10)/10 + " %";
          }
        },
        legend: {enabled: false},
        credits: {enabled: false},
        series: [{
          data: $.extend(true,[],chart14series),
          size: '100%',
          innerSize: '70%',
          dataLabels: { enabled: false },
          pointPadding: 0,
          groupPadding: 0,
        }]
    });
});

/* chart 1.5: schulabschluss */
// array filtern
chart15data = $.grep(data, function (data) {
  return data.variable === "Schulabschluss";
});
sortResults(chart15data, 'target_percent', asc=false);
// Populate series
var chart15series = [];
for (i = 0; i < chart15data.length; i++){
    chart15series.push([chart15data[i].answer, chart15data[i].target_percent]);
}
var chart15seriesDE = [];
for (i = 0; i < chart15data.length; i++){
    chart15seriesDE.push([chart15data[i].answer, chart15data[i].control_percent]);
}
$(function () {
    $('#chart15').highcharts({
        chart: {
            type: 'pie',
            backgroundColor: null,
            margin: [0, 0, 0, 0],
        },
        title: {text: null},
        tooltip: {
          useHTML: true,
          formatter: function () {
              return "<strong>" + this.point.name + ":</strong> Etwa " + Math.round(this.y*10)/10 + " %";
          }
        },
        legend: {enabled: false},
        credits: {enabled: false},
        series: [{
          data: $.extend(true,[],chart15series),
          size: '100%',
          innerSize: '70%',
          dataLabels: { enabled: false },
          pointPadding: 0,
          groupPadding: 0,
        }]
    });
});

/* chart 1.4: sexuelle orientierung */
// array filtern
chart16data = $.grep(data, function (data) {
  return data.variable === "Glaube";
});
sortResults(chart16data, 'target_percent', asc=false);
// Populate series
var chart16series = [];
for (i = 0; i < chart16data.length; i++){
    chart16series.push([chart16data[i].answer, chart16data[i].target_percent]);
}
var chart16seriesDE = [];
for (i = 0; i < chart16data.length; i++){
    chart16seriesDE.push([chart16data[i].answer, chart16data[i].control_percent]);
}
$(function () {
    $('#chart16').highcharts({
        chart: {
            type: 'pie',
            backgroundColor: null,
            margin: [0, 0, 0, 0],
        },
        title: {text: null},
        tooltip: {
          useHTML: true,
          formatter: function () {
              return "<strong>" + this.point.name + ":</strong> Etwa " + Math.round(this.y*10)/10 + " %";
          }
        },
        legend: {enabled: false},
        credits: {enabled: false},
        series: [{
          data: $.extend(true,[],chart16series),
          size: '100%',
          innerSize: '70%',
          dataLabels: { enabled: false },
          pointPadding: 0,
          groupPadding: 0,
        }]
    });
});
$('#de1').click(function(){
  var chart11 = $('#chart11').highcharts();
  var chart12 = $('#chart12').highcharts();
  var chart13 = $('#chart13').highcharts();
  var chart14 = $('#chart14').highcharts();
  var chart15 = $('#chart15').highcharts();
  var chart16 = $('#chart16').highcharts();
  for(i = 0; i < chart11.series.length; i++) {
    chart11.series[i].setData([chart11seriesDE[i]]);
  };
  for(i = 0; i < chart12.series.length; i++) {
    chart12.series[i].setData([chart12seriesDE[i]]);
  };
  for(i = 0; i < chart13.series.length; i++) {
    chart13.series[i].setData([chart13seriesDE[i]]);
  };
  chart14.series[0].setData(chart14seriesDE);
  chart15.series[0].setData(chart15seriesDE);
  chart16.series[0].setData(chart16seriesDE);
});
$('#do1').click(function(){
  var chart11 = $('#chart11').highcharts();
  var chart12 = $('#chart12').highcharts();
  var chart13 = $('#chart13').highcharts();
  var chart14 = $('#chart14').highcharts();
  var chart15 = $('#chart15').highcharts();
  var chart16 = $('#chart16').highcharts();
  for(i = 0; i < chart11.series.length; i++) {
    chart11.series[i].setData([chart11series[i].data]);
  };
  for(i = 0; i < chart12.series.length; i++) {
    chart12.series[i].setData([chart12series[i].data]);
  };
  for(i = 0; i < chart13.series.length; i++) {
    chart13.series[i].setData([chart13series[i].data]);
  };
  chart14.series[0].setData(chart14series);
  chart15.series[0].setData(chart15series);
  chart16.series[0].setData(chart16series);
});

/* Block 2: Parteineigung: Semicircle donut */
// array filtern
chart2data = $.grep(data, function (data) {
  return data.variable === "Parteineigung";
});
sortResults(chart2data, 'target_percent', asc=false);
// Populate series
var chart2series = [];
for (i = 0; i < chart2data.length; i++){
    chart2series.push([chart2data[i].answer, chart2data[i].target_percent]);
}
var chart2seriesDE = [];
for (i = 0; i < chart2data.length; i++){
    chart2seriesDE.push([chart2data[i].answer, chart2data[i].control_percent]);
}

$(function () {
    $('#chart2').highcharts({
        colors: ['#969696', '#E0001A', '#1B191E', '#B4029C', '#3F8E5F', '#FEED01', '#F29400', '#9c35db', '#009EE0', '#A96C2C', '#346284'],
        chart: {
            type: 'pie',
            backgroundColor: 'rgba(255,255,255,0.3)',
        },
        title: { text: null },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                dataLabels: {enabled: showLabels}
            }
        },
        tooltip: {
        	formatter: function () {
        	    return  "<strong>" + this.point.name + ":</strong> Etwa " + Math.round(this.y*10)/10 + " %";
        	}
        },
        legend: { enabled: false },
        credits: { enabled: false },
        series: [{
        	data: $.extend(true,[],chart2series),
          size: '90%',
          innerSize: '70%'
        }]
    });
});
$('#de2').click(function(){
  $('#chart2').highcharts().series[0].setData(chart2seriesDE);
});
$('#do2').click(function(){
  $('#chart2').highcharts().series[0].setData(chart2series);
});

/* Block 3: Biersorten: Tree map */
   // array filtern
   chart3data = $.grep(data, function (data) {
     return data.variable === "Biersorten";
   });
   sortResults(chart3data, 'target_percent', asc=false);
   // Populate series
   chart3series = [];
   for (i = 0; i < chart3data.length; i++){
       chart3series.push(
        { name: chart3data[i].answer,
          value: chart3data[i].target_percent
        });
   }
   //Daten für Deutschland
   chart3seriesDE = [];
   for (i = 0; i < chart3data.length; i++){
       chart3seriesDE.push(
        { name: chart3data[i].answer,
          value: chart3data[i].control_percent
        });
   }

$(function () {
    $('#chart3').highcharts({
        chart: {
            backgroundColor: 'rgba(255,255,255,0.3)',
        },
        title: {
            text: null
        },
        tooltip: {
            formatter: function () {
                return "<strong>" + this.point.name + ":</strong> Etwa " + Math.round(this.point.value*10)/10 + " %";
            }
        },
        legend: {
                   enabled: false
               },
        credits: {
            enabled: false
        },
        series: [{
          type: "treemap",
          colorByPoint: true,
          layoutAlgorithm: 'squarified',
          data: $.extend(true,[],chart3series)
        }]
    });
  });
$('#de3').click(function(){
  $('#chart3').highcharts().series[0].setData(chart3seriesDE);
});
$('#do3').click(function(){
  $('#chart3').highcharts().series[0].setData(chart3series);
});



/* Block 4: Fußballteams: Bar chart */

// array filtern
chart4data = $.grep(data, function (data) {
  return data.variable === "Fußballteam";
});
//kurznamen hinzufügen
chart4shortnames = ["Dortmund", "Bochum", "Leverkusen", "Duisburg", "Paderborn", "Aachen", "Hoffenheim", "Wolfsburg", "Karslruhe", "Düsseldorf", "keine Angabe", "Bremen", "Mainz", "Augsburg", "Schalke", "Frankfurt", "Rostock", "TSV München", "weiß nicht", "Freiburg", "Leipzig", "St. Pauli", "Hannover", "Stuttgart", "Kaiserslautern", "Berlin", "Nürnberg", "Mönchengladbach", "Köln", "Hamburg", "Bayern München","Andere/kein Fußballfan"]
for (i = 0; i < chart4data.length; i++){
  chart4data[i].shortname = chart4shortnames[i]
}
sortResults(chart4data, 'target_percent', asc=false);

//verwende nur die 12 teams mit der höchsten wertung
chart4datas = chart4data.slice(0,12)

// Populate series
var chart4categories = [];
var chart4series = [];
var chart4seriesDE = [];
for (i = 0; i < chart4datas.length; i++){
    chart4categories.push(chart4datas[i].shortname);
    chart4series.push(chart4datas[i].target_percent);
    chart4seriesDE.push(chart4datas[i].control_percent);
}

//Chart

$(function () {
    $('#chart4').highcharts({
        chart: {
            type: 'bar',
            backgroundColor: 'rgba(255,255,255,0.3)',
        },
        title: { text: null },
        tooltip: {
          formatter: function () {
              return  "<strong>" + this.x + ":</strong> Etwa " + Math.round(this.y*10)/10 + " %";
          }
        },
        xAxis: {
          categories: chart4categories,
          crosshair: true,
        },
        legend: { enabled: false },
        credits: { enabled: false },
        series: [{
          colorByPoint: true,
          data: $.extend(true,[],chart4series),
        }]
    });
});
$('#de4').click(function(){
  $('#chart4').highcharts().series[0].setData(chart4seriesDE);
});
$('#do4').click(function(){
  $('#chart4').highcharts().series[0].setData(chart4series);
});

/*
// Populate series
chart4series = []; x = 20; y = 40;
for (i = 0; i < chart4datas.length; i++){
    chart4series.push(
     {x: x, y: y,
      z: chart4datas[i].target_percent,
      name: chart4datas[i].shortname,
      longname: chart4datas[i].answer,
      value: chart4datas[i].target_percent
     });
    x += 5;
    if((i+1) % 5 === 0 && i != 0) {x = 20; y -= 5;}
}
//Daten für Deutschland
chart4seriesDE = []; x = 20; y = 40;
for (i = 0; i < chart4datas.length; i++){
    chart4seriesDE.push(
     {x: x, y: y,
      z: chart4datas[i].control_percent,
      name: chart4datas[i].shortname,
      longname: chart4datas[i].answer,
      value: chart4datas[i].control_percent
     });
    x += 15;
    if((i+1) % 5 === 0 && i != 0) {x = 20; y -= 10;}
}

$(function () {
    $('#chart4').highcharts({
        chart: {
            type: 'bubble',
            backgroundColor: 'rgba(255,255,255,0.3)',
            //margin: [0,0,0,0]
        },
        legend: {enabled: false},
        title: {text: ''},
        xAxis: {visible: false},
        yAxis: {visible: false},
        tooltip: {
            formatter: function () {
                return "<strong>" + this.point.longname + ":</strong> Etwa " + Math.round(this.point.value*100)/100 + " %";
            }
        },
        series: [{
            data: $.extend(true,[],chart4series),
            dataLabels: {
              enabled: true,
              formatter: function () {
                  return this.point.name;//Math.round(this.point.value*10)/10 + "%";
                },
            },
            displayNegative: true,
            negativeColor: Highcharts.getOptions().colors[1],
            zThreshold: 0.05,
        }]

    });
});
$('#de4').click(function(){
  $('#chart4').highcharts().series[0].setData(chart4seriesDE);
});
$('#do4').click(function(){
  $('#chart4').highcharts().series[0].setData(chart4series);
});
*/

/* Block 5: Automarke: Donut */

// array filtern
chart5data = $.grep(data, function (data) {
  return data.variable === "Automarke";
});
sortResults(chart5data, 'target_percent', asc=false);
// Populate series
var chart5series = [];
for (i = 0; i < chart5data.length; i++){
    chart5series.push([chart5data[i].answer, chart5data[i].target_percent]);
}
var chart5seriesDE = [];
for (i = 0; i < chart5data.length; i++){
    chart5seriesDE.push([chart5data[i].answer, chart5data[i].control_percent]);
}
$(function () {
    $('#chart5').highcharts({
        chart: {
            type: 'pie',
            backgroundColor: 'rgba(255,255,255,0.3)',
        },
        title: {text: null},
        tooltip: {
          useHTML: true,
          formatter: function () {
              return "<strong>" + this.point.name + ":</strong> Etwa " + Math.round(this.y*10)/10 + " %";
          }
        },
        plotOptions: { pie: { dataLabels: {enabled: showLabels} } },
        legend: {enabled: false},
        credits: {enabled: false},
        series: [{
          data: $.extend(true,[],chart5series),
          size: '80%',
          innerSize: '60%',
          dataLabels: { crop: false}
        }]
    });
});
$('#de5').click(function(){
  $('#chart5').highcharts().series[0].setData(chart5seriesDE);
});
$('#do5').click(function(){
  $('#chart5').highcharts().series[0].setData(chart5series);
});

/* Block 6: Lieblingstier: 1 stacked bar */

// array filtern
chart6data = $.grep(data, function (data) {
  return data.variable === "Hunde- oder Katzenfreund";
});
sortResults(chart6data, 'target_percent', asc=false);
// Populate series
var chart6series = [];
for (i = 0; i < chart6data.length; i++){
    chart6series.push({
      name: chart6data[i].answer,
      data: [chart6data[i].target_percent],
    });
}
var chart6seriesDE = [];
for (i = 0; i < chart6data.length; i++){
    chart6seriesDE.push(chart6data[i].control_percent);
}
$(function () {
    $('#chart6').highcharts({
        chart: {
            backgroundColor: null,
            type: 'bar',
            margin: [0,0,0,0]
        },
        title: {text: ''},
        xAxis: {enabled: false,},
        yAxis: {enabled: false,},
        legend: {enabled: false,},
        credits: {enabled: false,},
        tooltip: {
            formatter: function() {
                return "<strong>" + this.series.name + ":</strong> Etwa " + Math.round(this.y*10)/10 + " %";
            }
        },
        plotOptions: {
            series: {
                stacking: 'percent',
                pointPadding: 0,
                groupPadding: 0,
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    },
                    formatter: function() {
                        return "<strong>" + this.series.name + "</strong>";
                    }
                }
            },
        },
        series: $.extend(true,[],chart6series),
    });
    $('.highcharts-axis').css('display','none');
});

$('#de6').click(function(){
  var chart6 = $('#chart6').highcharts();
  for(i = 0; i < chart6.series.length; i++) {
    chart6.series[i].setData([chart6seriesDE[i]]);
  };
});
$('#do6').click(function(){
  var chart6 = $('#chart6').highcharts();
  for(i = 0; i < chart6.series.length; i++) {
    chart6.series[i].setData([chart6series[i].data]);
  };
});