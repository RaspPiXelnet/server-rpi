(function() {
  'use strict';

  angular
    .module('app')
    .controller('MilightColorController', MilightColorController);

  /** @ngInject */
  function MilightColorController(MilightService, $log) {
    var vm = this;

    vm.on = function() {
      MilightService.on(function(data) {
        $log.info(data);
      });
    };

    vm.off = function() {
      MilightService.off(function(data) {
        $log.info(data);
      });
    };

    vm.red = function() {
      MilightService.changeColorText('red', function(data) {
        $log.info(data);
      });
    };

    vm.blue = function() {
      MilightService.changeColorText('blue', function(data) {
        $log.info(data);
      });
    };

    vm.green = function() {
      MilightService.changeColorText('green', function(data) {
        $log.info(data);
      });
    };

    vm.yellow = function() {
      MilightService.changeColorText('yellow', function(data) {
        $log.info(data);
      });
    };

    vm.white = function() {
      MilightService.changeColorText('white', function(data) {
        $log.info(data);
      });
    };

    vm.brightness = 0;
    vm.changeBrightness = function() {
      MilightService.brightness(vm.brightness, function (data) {
        $log.info(data);
      });
    }
  }
})();
