/**
 * WeatherController
 *
 * @description :: Server-side logic for managing Weathers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var CronJob = require('cron').CronJob;

module.exports = {
  test: function (req, res) {
    var date = new Date('2016-09-08T04:55:00');
    var job = new CronJob(date, function () {
        // Appeler MilightService avec la couleur et les options définies
        MilightService.init(function (box) {
          MilightService.on(box, 'all', function () {
            setTimeout(function () {
              MilightService.brightness(box, 'all', '5', function () {
                setTimeout(function () {
                  MilightService.brightness(box, 'all', '10', function () {

                  });
                }, 500);
              });
            }, 500);
          });
        });
      }, function () {
        /* This function is executed when the job stops */
      },
      true, /* Start the job right now */
      'Europe/Paris' /* Time zone of this job. */
    );
    res.json({message: 'Test'});
  }
};

