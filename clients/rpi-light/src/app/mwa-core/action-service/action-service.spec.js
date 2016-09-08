'use strict';

describe('Service: ActionService', function() {

  // instantiate service
  var ActionService,
    init = function() {
      inject(function(_ActionService_) {
        ActionService = _ActionService_;
      });
    };
  var CATEGORY_1 = 'CATEGORY_1', 
      CATEGORY_2 = 'CATEGORY_2';

  // load the service's module
  beforeEach(module('mwaCore'));

  it('ActionService should be there', function() {
    init();

    expect(!!ActionService).toBe(true);
  });

  it('should be configurable', function() {
    module(function(ActionServiceProvider) {
      ActionServiceProvider
        .addActions([{
          'name': 'MENU_2',
          'category': CATEGORY_1,
          'priority': 200
        },  {
          'name': 'MENU_1',
          'category': CATEGORY_1,
          'priority': 400,
          'foo': 'bar',
          'bar': 'unchanged'
        },  {
          'name': 'MENU_4',
          'category': CATEGORY_2
        }])
      
        .addActions([{
          'name': 'MENU_3',
          'category': CATEGORY_1,
          'priority': 300          
        },  {
          'name': 'MENU_1',
          'priority': 100,        // Re-orders MENU_1 in CATEGORY_1
          'foo': 're-ordered'     // Override 'foo' property
        }]);
    });
    init();

    var actionForCategory1 = ActionService.getActions(CATEGORY_1);
    expect(actionForCategory1 instanceof Array).toBe(true);
    expect(actionForCategory1.length).toEqual(3);    
    
    var actionForCategory2 = ActionService.getActions(CATEGORY_2);
    expect(actionForCategory2.length).toEqual(1);
    expect(actionForCategory2[0].name).toEqual('MENU_4');
    
    var action1 = actionForCategory1[0];
    expect(action1.name).toBe('MENU_1');
    expect(action1.foo).toBe('re-ordered');
    expect(action1.bar).toBe('unchanged');
    expect(action1.priority).toBe(100);
    
    var menu1 = ActionService.getAction('MENU_1');
    expect(menu1).toBe(action1);
    
    var action2 = actionForCategory1[1];
    expect(action2.name).toBe('MENU_2');
    
    var action3 = actionForCategory1[2];
    expect(action3.name).toBe('MENU_3');
    
  });

});
