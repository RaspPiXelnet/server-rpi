(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config(ActionServiceProvider) {
    // Menu principal
    ActionServiceProvider
      .addActions([{
        'name': 'MILIGHT',
        'category': 'MAIN_MENU',
        'subCategory': 'MILIGHT_MENU',
        'label': 'Milight',
        'priority': 20
      }]);

    // Sous menu
    ActionServiceProvider
      .addActions([{
        'name': 'MILIGHT_COLOR',
        'category': 'MILIGHT_MENU',
        'label': 'Color',
        'priority': 1,
        'url': '/milight/color'
      }])
      .addActions([{
        'name': 'MILIGHT_ALERT',
        'category': 'MILIGHT_MENU',
        'label': 'Alert',
        'priority': 8,
        'url': '/milight/alert'
      }])
    ;
  }

})();
