var app = new Vue({
  el: '#app',
  data: {
    message: "Hello Vue"
  }
});

var hourlyWidget = new Vue({
  el: '#hourly',
  data: {
    summary: "it's gonna rain",
    icon: 'clear-night',
    hours: [],
  },
  methods: {
    getHourlyIcon: function(iconString){
      return `/images/${iconString}.png`
    },
    getDate: function(seconds){
      var date = new Date(seconds * 1000);
      var month = date.getMonth();
      var year = date.getFullYear();
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      return `${month + 1}/${day}/${year} ${hour}:${minutes < 9 ? '0' + minutes : minutes}`;
    },
    getMainIcon: function(){
      return `/images/${this.icon}.png`;
    },
    getHourlyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
      .then(function(response){
        var hourlyData = response.data.hourly;
        console.log(hourlyData);
        this.summary = hourlyData.summary;
        this.icon = hourlyData.icon;
        this.hours = hourlyData.data;
      }.bind(this))
      .catch(function(err){
        console.log(err);
      });
    }
  },
  created: function(){
    this.getHourlyWeather(29.1, -84.1);
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
    getWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
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
        })
        .catch(function(err){
          console.log(err);
        });
    },
    updateWeather: function(){
      this.getWeather(this.latitude, this.longitude);
    }
  },
  created: function(){
    this.getWeather(29.1, -81.4);
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
