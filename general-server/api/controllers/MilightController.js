/**
 * MilightController
 *
 * @description :: Server-side logic for managing milights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var init = null;


var Weather = {
  sunset: function (date, cb) {
    CronService.addCron(date, function () {
      // on Tick

      // Récupère le dernier état de la lampe
      Milight.find().sort('createdAt DESC').limit(1).exec(function (err, lastEntry) {
        if (err) {
          sails.log.error(err);
        } else {
          sails.log.silly('Last entry milight: ', lastEntry);

          if (!parseInt(lastEntry.brightness) > 0) {
            sails.log.verbose('Start CRON `sunset`.');
            MilightEffectService.init([
              {hue: '', brightness: '5', wait: '300000', type: 'brightness'},
              {hue: '', brightness: '10', wait: '300000', type: 'brightness'},
              {hue: '', brightness: '15', wait: '300000', type: 'brightness'},
              {hue: '', brightness: '20', wait: '300000', type: 'brightness'},
              {hue: '', brightness: '25', wait: '300000', type: 'brightness'},
              {hue: '', brightness: '30', wait: '300000', type: 'brightness'},
              {hue: '', brightness: '40', wait: '300000', type: 'brightness'},
              {hue: '', brightness: '50', wait: '300000', type: 'brightness'},
              {hue: '', brightness: '75', wait: '300000', type: 'brightness'},
              {hue: '', brightness: '100', wait: '300000', type: 'brightness'}
            ], function () {

            });
          }

        }
      }); // End Milight Query

    }, function () {
      // on Complete
      sails.log.verbose('Operations of CRON `sunset` finished.');
    }, true, function (job) {
      // then
      cb(job);
    });
  }
};

var calendar = {
  awakening: function (date, cb) {
    CronService.addCron(date, function () {
      // on Tick

      Milight.find().sort('createdAt DESC').limit(1).exec(function (err, lastEntry) {
        if (err) {
          sails.log.error(err);
        } else {
          sails.log.silly('Last entry milight: ', lastEntry);

          if (!parseInt(lastEntry.brightness) > 0) {
            sails.log.verbose('Start CRON `awakening`.');
            MilightEffectService.init([
              {hue: '', brightness: '5', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '10', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '15', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '20', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '25', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '30', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '40', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '50', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '75', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '100', wait: '60000', type: 'brightness'}
            ], function () {

            });
          }

        }
      }); // End Milight Query

    }, function () {
      // on Complete
      sails.log.verbose('Operations of CRON `awakening` finished.');
    }, true, function (job) {
      // then
      cb(job);
    });
  },

  bedDown: function (date, cb) {
    CronService.addCron(date, function () {
      // on Tick

      Milight.find().sort('createdAt DESC').limit(1).exec(function (err, lastEntry) {
        if (err) {
          sails.log.error(err);
        } else {
          sails.log.silly('Last entry milight: ', lastEntry);

          if (parseInt(lastEntry.brightness) > 0) {
            sails.log.verbose('Start CRON `bedDown`.');
            MilightEffectService.init([
              {hue: '', brightness: '50', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '45', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '40', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '35', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '30', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '25', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '20', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '15', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '10', wait: '60000', type: 'brightness'},
              {hue: '', brightness: '5', wait: '60000', type: 'brightness'},
              {hue: '', brightness: false, wait: '60000', type: 'black'}
            ], function () {

            });
          } else {
            sails.log.verbose('Start CRON `bedDown`.');
            MilightEffectService.init([
              {hue: '', brightness: '5', wait: '500', type: 'brightness'},
              {hue: '', brightness: '10', wait: '500', type: 'brightness'},
              {hue: '', brightness: '5', wait: '500', type: 'brightness'},
              {hue: '', brightness: '10', wait: '500', type: 'brightness'},
              {hue: '', brightness: '0', wait: '500', type: 'brightness'},
              {hue: '', brightness: false, wait: '500', type: 'black'}
            ], function () {

            });
          }

        }
      }); // End Milight Query

    }, function () {
      // on Complete
      sails.log.verbose('Operations of CRON `bedDown` finished.');
    }, true, function (job) {
      // then
      cb(job);
    });
  },

  alarm: function (date, cb) {
    CronService.addCron(date, function () {
      // on Tick
      sails.log.verbose('Start CRON `alarm`.');
      MilightEffectService.init([
        {hue: HueService.getHue('red'), brightness: '', wait: '100', type: 'color'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '500', type: 'black'},
        {hue: '', brightness: '100', wait: '1000', type: 'brightness'},
        {hue: '', brightness: false, wait: '100', type: 'black'},
        {hue: '', brightness: false, wait: '100', type: 'whiteMode'}
      ], function () {

      });
    }, function () {
      // on Complete
      sails.log.verbose('Operations of CRON `alarm` finished.');
    }, true, function (job) {
      // then
      cb(job);
    });
  }
};

module.exports = {

  init: function (req, res) {
    if (init == null) {
      // Définition d'une CRON qui va vérifier et récupérer les évènements Google pour la journée
      //CronService.addCron('0 */12 * * * *', function () {
      CronService.addCron('01 00 00 * * *', function () {
        // on Tick
        sails.log.verbose('Start CRON `Google Agenda Events`.');
        CalendarService.getItems(function (items) {
          // Parcourir le tableau d'items
          items.forEach(function (item) {
            CalendarService.getInfos(item, function (infos) {

              var today = new Date();
              if (today.getDate() == infos.date.getDate() && today.getMonth() == infos.date.getMonth() && today.getFullYear() == infos.date.getFullYear()) {
                // Définition des CRON en fonction du texte de l'évènement
                ParseEvent(infos.text, function (hue, options) {
                  switch (options.type) {
                    case 'awakening':
                      calendar.awakening(infos.date, function () {
                        sails.log.verbose('CRON `awakening` defined on %s.', infos.date);
                      });
                      break;

                    case 'bedDown':
                      calendar.bedDown(infos.date, function () {
                        sails.log.verbose('CRON `bedDown` defined on %s.', infos.date);
                      });
                      break;

                    case 'alarm':
                    default:
                      calendar.alarm(infos.date, function () {
                        sails.log.verbose('CRON `alarm` defined on %s.', infos.date);
                      });
                      break;

                  }
                });

              }

            });
          });
        });
      }, function () {
        // on Complete
        sails.log.silly('Google Calendar Events defined.');
      }, true, function (job) {
        // then
        sails.log.verbose('CRON `Google Agenda Events` defined at 0:10 am.');
      });

      // Définition d'une CRON qui va récupérer les informations de météo et programme l'allumage de l'éclairage au couché du soleil
      CronService.addCron('10 00 00 * * *', function () {
        // on Tick
        sails.log.verbose('Start CRON `OpenWeatherMap`.');
        OpenWeatherMapService.getCurrent(function (weather) {
          if (weather.err) {
            sails.log.error(new Error(weather.err, 'general-server/api/controllers/MilightController.js', 156), weather.httpResponse);
          } else {
            // On ajoute une CRON pour l'allumage de l'éclairage quand le soleil commence à se coucher
            var sunset = new Date(weather.data.sys.sunset * 1000);
            sunset.setSeconds(sunset.getSeconds() - 1800);
            Weather.sunset(sunset, function (job) {
              sails.log.verbose('CRON `sunset` defined on %d.', infos.date);
            });
          }
        })
      }, function () {
        // on Complete
        sails.log.silly('Recovery of complete weather.');
      }, true, function (job) {
        // then
        sails.log.verbose('CRON `OpenWeatherMap.getCurrent` defined at 0:10 am.');
      });
      // END CRON WEATHER

      // End of initialization
      init = true;
      res.json({init: true, message: 'Launched initialization.'});
    } else {
      res.json({init: true, message: 'Initialization already launched.'});
    }
  },

  on: function (req, res) {
    MilightService.init(function (box) {
      MilightService.on(box, 'all', function () {
        res.json({message: 'Light ON'});
      });
    });
  },

  off: function (req, res) {
    MilightService.init(function (box) {
      MilightService.off(box, 'all', function () {
        res.json({message: 'Light OFF'});
      });
    });
  },

  changeColorText: function (req, res) {
    MilightService.init(function (box) {
      switch (req.param('color')) {
        case 'blue':
          MilightService.color(box, 'all', 0, function () {
            res.json({message: 'Color BLUE'});
          });
          break;
        case 'blue-light':
          MilightService.color(box, 'all', 42, function () {
            res.json({message: 'Color BLUE LIGHT'});
          });
          break;
        case 'green':
          MilightService.color(box, 'all', 85, function () {
            res.json({message: 'Color GREEN'});
          });
          break;
        case 'yellow':
          MilightService.color(box, 'all', 126, function () {
            res.json({message: 'Color YELLOW'});
          });
          break;
        case 'red':
          MilightService.color(box, 'all', 170, function () {
            res.json({message: 'Color RED'});
          });
          break;
        case 'pink':
          MilightService.color(box, 'all', 213, function () {
            res.json({message: 'Color PINK'});
          });
          break;
        default:
          MilightService.whiteMode(box, 'all', function () {
            setTimeout(function () {
              MilightService.brightness(box, 'all', 20, function () {
                res.json({message: 'White mode'});
              });
            }, 50);
          });
          break;
      }
    });
  },

  changeColorHue: function (req, res) {
    MilightService.init(function (box) {
      var hueParam = req.param('hue');
      if (typeof hueParam === 'undefined' || parseInt(hueParam) > 255 || parseInt(hueParam) < 0) {
        MilightService.whiteMode(box, 'all', function () {
          setTimeout(function () {
            MilightService.brightness(box, 'all', 20, function () {
              res.json({message: 'White mode'});
            });
          }, 50);
        });
      } else {
        MilightService.color(box, 'all', parseInt(hueParam), function () {
          res.json({message: 'Hue color (0-255): ' + hueParam});
        });
      }
    });
  },

  setBrightness: function (req, res) {
    var percent = req.param('percent');
    MilightService.init(function (box) {
      MilightService.brightness(box, 'all', percent, function () {
        res.json({message: 'Brightness: ' + percent + '%'});
      });
    });
  },

  cronForceWeather: function (req, res) {
    OpenWeatherMapService.getCurrent(function (weather) {
      if (weather.err) {
        sails.log.error(new Error(weather.err, 'general-server/api/controllers/MilightController.js', 276), weather.httpResponse);
      } else {
        // On ajoute une CRON pour l'allumage de l'éclairage quand le soleil commence à se coucher
        var sunset = new Date(weather.data.sys.sunset * 1000);
        sunset.setSeconds(sunset.getSeconds() - 5400);
        Weather.sunset(sunset, function (job) {
          var date = sunset.getDate() + '/' + (sunset.getMonth() + 1) + '/' + sunset.getFullYear() + ' ' + sunset.getHours() + ':' + sunset.getMinutes();
          sails.log.verbose('CRON `sunset` defined on %s.', date);
          res.json({message: 'Cron Force Weather !!!'});
        });
      }
    });
  },

  cronForceGoogleCalendar: function (req, res) {
    CalendarService.getItems(function (items) {
      // Parcourir le tableau d'items
      items.forEach(function (item) {
        CalendarService.getInfos(item, function (infos) {

          var today = new Date();
          if (today.getDate() == infos.date.getDate() && today.getMonth() == infos.date.getMonth() && today.getFullYear() == infos.date.getFullYear()) {
            // Définition des CRON en fonction du texte de l'évènement
            ParseEvent(infos.text, function (hue, options) {
              switch (options.type) {
                case 'awakening':
                  calendar.awakening(infos.date, function () {
                    sails.log.verbose('CRON `awakening` defined on %s.', infos.date);
                  });
                  break;

                case 'bedDown':
                  calendar.bedDown(infos.date, function () {
                    sails.log.verbose('CRON `bedDown` defined on %s.', infos.date);
                  });
                  break;

                case 'alarm':
                default:
                  calendar.alarm(infos.date, function () {
                    sails.log.verbose('CRON `alarm` defined on %s.', infos.date);
                  });
                  break;

              }
            });

          }

        });
      });
    });
    return res.json({message: "Google Calendar events added."});
  },

  test: function (req, res) {
    MilightEffectService.init([
      {hue: '', brightness: '5', wait: '60000', type: 'brightness'},
      {hue: '', brightness: '10', wait: '60000', type: 'brightness'}
    ], function () {
      res.json({test: true});
    });
  }

};
