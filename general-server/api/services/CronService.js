var CronJob = require('cron').CronJob;

var Cron = {
  timeZone: 'Europe/Paris',

  addCron: function (date, color, options, cb) {
    // Traitement des options
    sails.log(date);
    sails.log(color);
    sails.log(options);
    var zone = 'all';
    if(typeof options.zone !== 'undefined') {
      zone = options.zone;
    }

    // Création de la CRON
    var job = new CronJob(date, function () {
      // Appeler MilightService avec la couleur et les options définies
        MilightService.init(function (box) {
          MilightService.color(box, zone, color, function () {
            sails.log('start cron at ' + date);
          });
        });
      }, function () {
        /* This function is executed when the job stops */
      },
      true, /* Start the job right now */
      this.timeZone /* Time zone of this job. */
    );
    cb(job);
  },

  checkDaily: function () {
    var job = new CronJob('00 00 02 * * *', function() {
        var date = new Date();
        CalendarService.getItemsDate(date, function(items) {

        });
      }, function () {
        /* This function is executed when the job stops */
      },
      true, /* Start the job right now */
      this.timeZone /* Time zone of this job. */)
  }
};

module.exports = Cron;
