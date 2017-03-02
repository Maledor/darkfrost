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
    icon: 'partly-cloudy-day',
    apparentTemperature: 67.4,
    precipProbability: 0.30,
    humidity: 0.61,
    location: 'Gainesville, FL',
    latitude:29.1,
    longitude:-81.4
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    },
    updateWeather: function(){
      var url = `/weather/${this.latitude},${this.longitude}`;
      axios.get(url)
        .then(function(response){
          var data = response.data.currently;
          currentlyWidget.time = data.time;
          currentlyWidget.summary = data.summary;
          currentlyWidget.icon = data.icon;
          currentlyWidget.apparentTemperature = data.apparentTemperature;
          currentlyWidget.precipProbability = data.precipProbability;
          currentlyWidget.humidity = data.humidity;
          currentlyWidget.location = data.location;
          currentlyWidget.location = data.location;
        })
        .catch(function(err){
          console.log(err);
        });
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
        currentlyWidget.location = data.location;
      })
      .catch(function(err){
        console.log(err);
      });
  }
});

var dailyWidget = new Vue({
  el: "#daily",
  data: {
    summary: 'partly-cloudy',
    icon: 'tornado'
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    }
  },
  created: function(){
    axios.get('/weather/29.1,-81.4')
      .then(function(response){
        var data = response.data.daily;
        dailyWidget.summary = data.summary;
        dailyWidget.icon = data.icon;
      })
      .catch(function(err){
        console.log(err);
      });
  }
});
