(function() {
  'use strict';

  angular
    .module('app')
    .directive('navbar', mwaNavbar);

  /** @ngInject */
  function mwaNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',      
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($location, ActionService) {
      var vm = this;
      vm.actions = ActionService.getActions('MAIN_MENU');
      vm.secondaryActions = ActionService.getActions('SECONDARY_MENU');
      
      /**
       * Displays action's label
       * @param {type} action
       * @returns String
       */
      vm.label = function(action) {
        return action.label ? action.label : action.name ;
      };
      
      /**
       * Executes action
       * @param {type} action
       * @returns void
       */
      vm.exec = function(action) {
        if(action.action) {
          action.action(action);
        
        } else if(action.url) {
          $location.url(action.url);
        }
      };
      
      /**
       * Returns true if action has children actions.
       * @param {type} action
       * @returns {undefined}
       */
      vm.hasSubMenu = function(action) {
        return action.subCategory != null;
      };
      
      /**
       * Returns subActions of action
       * @param {type} action
       * @returns {undefined}
       */
      vm.subActions = function(action) {
        var subActions = [];
        if(action.subCategory) {
          subActions = ActionService.getActions(action.subCategory);
        }
        return subActions;
      };
    }
  }

})();
