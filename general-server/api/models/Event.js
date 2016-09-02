/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'string',
      primaryKey: true,
      required: true
    },

    title: {
      type: 'string',
      required: true
    },

    dateStart: {
      type: 'datetime',
      required: true
    },

    cron: {
      type: 'json'
    }

  },

  beforeCreate: function (values, cb) {
    // Création de la CRON qui va appeler Milight
    ParseEvent(values.title, function (hue, options) {
      cb();
    });
  },

  beforeUpdate: function (values, cb) {
    // Arrêt de la CRON et recréation de celle-ci
    var cronJob = values.cron;
    cronJob.stop();
    ParseEvent(values.title, function (hue, options) {
      CronService.addCron(values.dateStart, hue, options, function (cronJob) {
        values.cron = cronJob;
        cb();
      });
    });
  },

  afterDestroy: function (record, cb) {
    // Arrêt de la CRON
    var cronJob = record.cron;
    cronJob.stop();
  }
};

