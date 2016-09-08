var request = require('request');

var OpenWeatherMap = {

  apikey: sails.config.rpiApp.openWeatherMap.apikey,
  city: sails.config.rpiApp.openWeatherMap.city,
  unit: sails.config.rpiApp.openWeatherMap.unit,

  getCurrent: function (cb) {
    request.get(
      {
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&units=' + this.unit + '&APPID=' + this.apikey,
      }, function (err, httpResponse, body) {
        if (err) {
          cb({err: err, httpResponse: httpResponse, data: false});
        } else {
          var response = JSON.parse(body);
          cb({err: false, httpResponse: httpResponse, data: response});
        }
      });
  },

  getRecentForecast: function (cb) {
    request.get(
      {
        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + this.city + '&units=' + this.unit + '&APPID=' + this.apikey,
      }, function (err, httpResponse, body) {
        if (err) {
          cb({err: err, httpResponse: httpResponse, data: false});
        } else {
          var response = JSON.parse(body);
          cb({err: false, httpResponse: httpResponse, data: response});
        }
      });
  },

  getAdvancedForecast: function (cb) {
    request.get(
      {
        url: 'api.openweathermap.org/data/2.5/forecast/daily?q=' + this.city + '&cnt=16&units=' + this.unit + '&APPID=' + this.apikey,
      }, function (err, httpResponse, body) {
        if (err) {
          cb({err: err, httpResponse: httpResponse, data: false});
        } else {
          var response = JSON.parse(body);
          cb({err: false, httpResponse: httpResponse, data: response});
        }
      });
  }
};

module.exports = OpenWeatherMap;
