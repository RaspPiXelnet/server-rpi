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
      sails.log('Start CRON `sunset`.');
      MilightEffectService.init([
        {hue: '', brightness: '5', wait: '300', type: 'brightness'},
        {hue: '', brightness: '10', wait: '300', type: 'brightness'},
        {hue: '', brightness: '15', wait: '300', type: 'brightness'},
        {hue: '', brightness: '20', wait: '300', type: 'brightness'},
        {hue: '', brightness: '25', wait: '300', type: 'brightness'},
        {hue: '', brightness: '30', wait: '300', type: 'brightness'},
        {hue: '', brightness: '40', wait: '300', type: 'brightness'},
        {hue: '', brightness: '50', wait: '300', type: 'brightness'},
        {hue: '', brightness: '75', wait: '300', type: 'brightness'},
        {hue: '', brightness: '100', wait: '300', type: 'brightness'}
      ], function () {

      });

      /* Ancien fonctionnement */
      /*MilightService.init(function (box) {
       MilightService.on(box, 'all', function () {
       setTimeout(function () {
       MilightService.brightness(box, 'all', '20', function () {

       // Programme que l'éclairage augmente en intensité 30 min après.
       var newDateObj = new Date(date.getTime() + 1800000);
       CronService(date, function () {
       sails.log('Start CRON `sunset` (Increased intensity).');
       MilightService.init(function (box) {
       setTimeout(function () {
       MilightService.brightness(box, 'all', '40', function () {

       });
       }, 500);
       });
       }, function () {
       // on Complete
       sails.log('Increase in light intensity.');
       }, true, function () {
       // then
       });
       // End: 30 min

       });
       }, 500);
       });
       });*/
    }, function () {
      // on Complete
      sails.log('Lighting launched.');
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

      // Définition d'une CRON qui va vérifier et récupérer les évènements Google toutes les 5 minutes

      // Définition d'une CRON qui va récupérer les informations de météo
      CronService.addCron('10 00 00 * * *', function () {
        // on Tick
        sails.log('Start CRON `OpenWeatherMap Service - getCurrent`.');
        OpenWeatherMapService.getCurrent(function (weather) {
          if (weather.err) {
            sails.log.error(new Error(weather.err));
            sails.log.error(new Error(weather.httpResponse));
          } else {
            // On ajoute une CRON pour l'allumage de l'éclairage quand le soleil commence à se coucher
            var sunset = new Date(weather.data.sys.sunset);
            Weather.sunset(sunset, function (job) {
              sails.log('Programming CRON `sunset` to ' + sunset + '.');
            });
          }
        })
      }, function () {
        // on Complete
        sails.log('Recovery of complete weather.');
      }, true, function (job) {
        // then
        sails.log('Programming CRON `OpenWeatherMap Service - getCurrent` every day at 0:10.');
      });

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

  addCron: function (req, res) {
    var date = new Date(req.param('date'));
    var hue = 200;
    var options = {};
    CronService.addCronMilight(date, hue, options, function () {
      return res.json({message: "Ajout d'un évènement pour : (" + date + ")."});
    });
  },

  getGoogleCal: function (req, res) {
    CalendarService.getItems(function (items) {
      sails.log(items);
      // Parcourir le tableau d'items
      CalendarService.getInfos(items[0], function (infos) {
        // Modification dynamique de la couleur et des options en fonction du texte de l'évènement
        ParseEvent(infos.text, function (hue, options) {
          CronService.addCronMilight(infos.date, hue, options, function () {
            return res.json({message: "Ajout d'un évènement pour : (" + infos.date + ")."});
          });
        });
      });
    });
  },

  testSunset: function (req, res) {
    var date = new Date();
    date.setSeconds(date.getSeconds() + 30);
    CronService.addCron(date, function () {
      // on Tick
      sails.log('Start CRON `sunset`.');
      MilightEffectService.init([
        {hue: '', brightness: '5', wait: '300', type: 'brightness'},
        {hue: '', brightness: '10', wait: '300', type: 'brightness'},
        {hue: '', brightness: '15', wait: '300', type: 'brightness'},
        {hue: '', brightness: '20', wait: '300', type: 'brightness'},
        {hue: '', brightness: '25', wait: '300', type: 'brightness'},
        {hue: '', brightness: '30', wait: '300', type: 'brightness'},
        {hue: '', brightness: '40', wait: '300', type: 'brightness'},
        {hue: '', brightness: '50', wait: '300', type: 'brightness'},
        {hue: '', brightness: '75', wait: '300', type: 'brightness'},
        {hue: '', brightness: '100', wait: '300', type: 'brightness'}
      ], function () {

      });

    }, function () {
      // on Complete
      sails.log('Lighting launched.');
    }, true, function (job) {
      // then
      sails.log(date);
      res.json({date: date});
    });
  }
};
