var app = new Vue({
  el: '#app',
  data: {
    message: "Hello Vue"
  }
});

var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    time: 1000000,
    summary: 'Partly Cloudy',
    icon: 'partly-cloudy',
    apparentTemperature: 67.4,
    precipProbability: 0.30,
    humidity: 0.61,
    location: 'Gainesville, FL'
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    }
  },
  created: function(){
    axios.get('/weather/29.1,-81.4')
      .then(function(response){
        var data = response.data.currently;
        currentlyWidget.time = data.time;
        currentlyWidget.summary = data.summary;
        currentlyWidget.icon = data.icon;
        currentlyWidget.apparentTemperature = data.apparentTemperature;
        currentlyWidget.precipProbability = data.precipProbability;
        currentlyWidget.humidity = data.humidity;
        currentlyWidget.location = data.location;
      })
      .catch(function(err){
        console.log(err);
      });
  }
});
