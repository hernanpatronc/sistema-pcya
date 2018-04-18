import * as Chartist from "chartist";

export default function initDemo(series0, series1, series2, series3, series4) {
  // console.log(series0)
  let anios = Object.keys(series0).filter((val,index,array)=>{
    return 2010 <= parseInt(val) && parseInt(val) <= 2018;
  });
  let valores = anios.reduce((previous,val,index,array)=>{
    previous.push(series0[val]);
    return previous;
  }, []);
  var dataSales = {
    labels: anios,
    series: [
      valores
    ]
  };

  var optionsSales = {
    lineSmooth: false,
    low: 0,
    // high: 800,
    // showArea: true,
    // height: "245px",
    axisX: {
      showGrid: false
    },
    // showLine: false,
    // showPoint: false
  };

  var responsiveSales = [
    [
      // "screen and (max-width: 640px)",
      {
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ];

  new Chartist.Line('#chartHours', dataSales, optionsSales);

  var dataActivity = {
    labels: Object.keys(series2),
    series: [Object.values(series2)]
  };
  // console.log(dataActivity)
  var optionsActivity = {
    seriesBarDistance: 12,
    reverseData: true,
    horizontalBars: true,
    axisX: {
      showGrid: false
    },
    height: "500px"
  };

  new Chartist.Bar(
    "#chartActivity1",
    dataActivity,
    optionsActivity
  );
  dataActivity = {
    labels: Object.keys(series3),
    series: [Object.values(series3)]
  };
  new Chartist.Bar(
    "#chartActivity2",
    dataActivity,
    optionsActivity
  );
  dataActivity = {
    labels: Object.keys(series4),
    series: [Object.values(series4)]
  };
  new Chartist.Bar(
    "#chartActivity3",
    dataActivity,
    optionsActivity
  );


  //Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

  new Chartist.Pie(
    "#chartPreferences",
    {
      labels: Object.keys(series1),
      series: Object.values(series1)
    },
    {
      showLabel: false
    }
  );
}
