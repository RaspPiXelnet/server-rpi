(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('milight-color', {
        url: '/milight/color',
        templateUrl: 'app/milight/color/milightColor.html',
        controller: 'MilightColorController',
        controllerAs: 'milightColor'
      });
  }

})();
