/**
 * MilightController
 *
 * @description :: Server-side logic for managing milights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var init = null;

module.exports = {

  init: function (req, res) {
    if(init == null) {
      // Définition d'une CRON qui va vérifier et récupérer les évènements Google pour la journée

      // Définition d'une CRON qui va vérifier et récupérer les évènements Google toutes les 5 minutes

    } else {
      res.json({init: true, message: 'Initialisation déjà lancée.'})
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
    CronService.addCron(date, hue, options, function() {
      return res.json({message: "Ajout d'un évènement pour : ("+date+")."});
    });
  },

  getGoogleCal: function (req, res) {
    CalendarService.getItems(function(items) {
      sails.log(items);
      // Parcourir le tableau d'items
      CalendarService.getInfos(items[0], function(infos) {
        // Modification dynamique de la couleur et des options en fonction du texte de l'évènement
        ParseEvent(infos.text, function (hue, options) {
          CronService.addCron(infos.date, hue, options, function() {
            return res.json({message: "Ajout d'un évènement pour : ("+infos.date+")."});
          });
        });
      });
    });
  }
};
