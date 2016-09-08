(function() {
  /*global angular */
  'use strict';

  /**
   * @ngdoc service
   * @name mwaApp.ActionService
   * @description
   * # ActionService
   * Provider in the mwaApp.
   */
  angular.module('mwaCore')
    .provider('ActionService', function() {

      // Private variables
      var actionByName = {};
      var actionByCategory = {};

      // Private constructor
      function ActionService() {
        var init = function() {
          var actionName, action, actionArray, category;

          // Group actions by category
          for (actionName in actionByName) {
            action = actionByName[actionName];
            actionArray = actionByCategory[action.category];
            if (!actionArray) {
              actionArray = [];
              actionByCategory[action.category] = actionArray;
            }
            actionArray.push(action);
          }

          // Reorders action depending on priority.
          for (category in actionByCategory) {
            actionByCategory[category].sort(sortAction);
          }
        };
        init();

        /**
         * @param {String} aCategory
         * @returns Array of action that belong to aCategory
         */
        this.getActions = function(aCategory) {
          return actionByCategory[aCategory];
        };

        this.getAction = function(anActionName) {
          return actionByName[anActionName];
        };
      }

      // Public API for configuration
      this.addActions = function(actionArray) {
        assert(actionArray !== null,
          'ActionServiceProvider.addActions(actionArray) : actionArray should not be null');
        assert(actionArray.constructor === Array,
          'ActionServiceProvider.addActions(actionArray) : actionArray should be an Array');

        actionArray.forEach(function(actionToRegister) {
          var action = actionByName[actionToRegister.name];
          if(action) {
            angular.merge(action, actionToRegister);
          } else {
            actionByName[actionToRegister.name] = actionToRegister;
          }
        });

        return this;
      };

      // Method for instantiating
      this.$get = function() {
        return new ActionService();
      };

      var assert = function(test, message) {
        if (!test) {
          throw message ? message : "assert failed";
        }
      };

      var sortAction = function(action1, action2) {
        if (!action1.priority && !action2.priority) {
          // no priority defined
          return 0;
        }
        if (!action1.priority) {
          // no priority for action1
          return -1;
        }
        if (!action2.priority) {
          // no priority for action2
          return +1;
        }
        if (action1.priority < action2.priority) {
          return -1;
        }
        if (action1.priority > action2.priority) {
          return +1;
        }
        return 0;  // same priority              
      };
    });
})();