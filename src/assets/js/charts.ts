import * as Chartist from "chartist";

export default function initDemo(series1, label1, series2, label2, series3, label3) {
  var dataSales = {
    labels: [
      "9:00AM",
      "12:00AM",
      "3:00PM",
      "6:00PM",
      "9:00PM",
      "12:00PM",
      "3:00AM",
      "6:00AM"
    ],
    series: [
      [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
      [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
      [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
    ]
  };

  var optionsSales = {
    lineSmooth: false,
    low: 0,
    high: 800,
    showArea: true,
    height: "245px",
    axisX: {
      showGrid: false
    },
    showLine: false,
    showPoint: false
  };

  var responsiveSales = [
    [
      "screen and (max-width: 640px)",
      {
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ];

  //Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
  var dataActivity = {
    labels: label3,
    series: series3
  };

  var optionsActivity = {
    seriesBarDistance: 12,
    reverseData: true,
    horizontalBars: true,
    axisX: {
      showGrid: false
    },
    height: "1000px"
  };

  var responsiveOptions = [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ];

  new Chartist.Bar(
    "#chartActivity",
    dataActivity,
    optionsActivity
  );
  var dataPreferences = {
    series: [[25, 30, 20, 25]]
  };

  var optionsPreferences = {
    donut: true,
    donutWidth: 40,
    startAngle: 0,
    total: 100,
    //height: "245px",
    showLabel: false,
    axisX: {
      showGrid: false
    }
  };

  //Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

  new Chartist.Pie(
    "#chartPreferences",
    {
      series: series1,
      labels: label1
    },
    {
      showLabel: false
    }
  );
}
