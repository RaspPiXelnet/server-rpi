var CronJobManager = require('cron-job-manager');

var CronManager = {
  manager: new CronJobManager('initialisation',
    '00 00 00 * * *',
    function () {

    },
    {
      start: true,
      completion: function () {

      },
      timeZone: "Europe/Paris"
    }),

  addCron: function () {

  },

  updateCron: function () {

  },

  removeCron: function () {

  }
};

module.exports = CronManager;
