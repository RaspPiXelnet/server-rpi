var gcal = require('google-calendar');
var request = require('request');

var Calendar = {
  getItems: function (cb) {
    request.post(
      {
        url: 'https://www.googleapis.com/oauth2/v4/token',
        form: {
          client_id: sails.config.google.client_id,
          client_secret: sails.config.google.client_secret,
          refresh_token: sails.config.google.refresh_token,
          grant_type: 'refresh_token'
        }
      }, function (err, httpResponse, body) {
        if (err) {
          cb({err: err, httpResponse: httpResponse});
        } else {
          var googleResponse = JSON.parse(body);
          if (typeof googleResponse.access_token !== 'undefined') {
            var token = googleResponse.access_token;
            var google_calendar = new gcal.GoogleCalendar(token);
            google_calendar.events.list(sails.config.google.events_list, function (err, events) {
              if (err) {
                sails.log(err);
                cb({err: err});
              } else {
                cb(events.items);
              }
            });
          } else {
            cb({err: 'Impossible de récupérer le token Google !'});
          }
        }
      });
  },

  getItemsDate: function (date, cb) {
    this.getItems(function (items) {

    });
  },

  getStart: function(item, cb) {
    if(typeof item !== 'undefined' && typeof item.start !== 'undefined') {
      var start = item.start.dateTime;
      var dateStart = new Date(start);
      cb(dateStart);
    } else {
      cb({err: 'Item mal formé ou indéfini.'});
    }
  },

  getInfos: function (item, cb) {
    if(typeof item !== 'undefined' && typeof item.start !== 'undefined' && item.status === 'confirmed') {
      var start = item.start.dateTime;
      var dateStart = new Date(start);
      var text = item.summary;
      cb({err: false, date: dateStart, text: text});
    } else {
      cb({err: 'Item mal formé ou indéfini.'});
    }
  }

};

module.exports = Calendar;
