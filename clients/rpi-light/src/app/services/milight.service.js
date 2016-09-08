(function () {
  'use strict';

  angular
    .module('app')
    .factory('MilightService', MilightService);

  /** @ngInject */
  function MilightService($sails, $log) {
    return {

      on: function (callback) {
        $sails.get('/on')
          .success(function (data) {
            callback(data);
          })
          .error(function (data) {
            $log.error(data);
          });
      },

      off: function (callback) {
        $sails.get('/off')
          .success(function (data) {
            callback(data);
          })
          .error(function (data) {
            $log.error(data);
          });
      },

      changeColorText: function (colorText, callback) {
        $sails.get('/color/text/' + colorText)
          .success(function (data) {
            callback(data);
          })
          .error(function (data) {
            $log.error(data);
          });
      },

      brightness: function (percent, callback) {
        $sails.get('/brightness/' + percent)
          .success(function (data) {
            callback(data);
          })
          .error(function (data) {
            $log.error(data);
          });
      }

    };

  }
})();
