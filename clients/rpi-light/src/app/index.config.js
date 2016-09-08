(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider, ActionServiceProvider, $sailsProvider) {
    ActionServiceProvider
        .addActions([{
          'name': 'HOME',
          'category': 'MAIN_MENU',
          'label': 'Home',
          'priority': 10,
          'url':'/'
        }]);

    $sailsProvider.url = 'http://localhost:1337';
  }

})();
