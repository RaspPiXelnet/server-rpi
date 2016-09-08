# ActionService

## Description
Service used to populate menus.
The idea is to represent each menu item or user action (buttons, options, etc...) as an Action that is registered into the ActionServiceProvider at config time.
And then get back theses actions at runtime to build menus.

Each module brings its own Actions into the ActionServiceProvider and they are displayed in a menu.
If the module is removed or disabled, then the actions disappears.

An module may overrides another module's action through the ActionServiceProvider.

## Sample of use

### Declaring item in the main menu.

Adds a 'Demo' and a 'Contact' item in the main menu (MAIN_MENU).
As 'Contact' priority is greater the 'Demo', it will be placed after 'Demo'.
As Demo have a 'subCategory' called 'DEMO_MENU', other actions may be added to the 'DEMO_MENU' category to be added to the second level of the menu.

    ActionServiceProvider
        .addActions([{
          'name': 'DEMO',          
          'category': 'MAIN_MENU',
          'subCategory': 'DEMO_MENU',
          'label': 'Demo',
          'priority': 20,
          'url':'/demo'
		  }, {
          'name': 'CONTACT',
          'category': 'MAIN_MENU',
          'label': 'Contact',
          'priority': 30,
          'url':'/contact'
        }]);

* 'name' : Identifies the Action. Must be unique within the application. *MANDATORY*
* 'category' : Regroup actions. *MANDATORY*
* 'subcategory' : Used by the 'navbar' component to regroup second level menu items. *OPTIONAL*
* 'label' : Text to be displayed. *OPTIONAL*
* 'priority' : Order actions within the 'category'.
* 'url' : link destination. *OPTIONAL*
* Any other data may be added in the Action. It is the responsability of the caller (ex: menu) camponent to use them.

### Overriding an Action

Overrides 'CONTACT' action in order to rename its label and to move it at first position (before 'DEMO').

    ActionServiceProvider
        .addActions([{
          'name': 'CONTACT',
          'label': 'Contact support',
          'priority': 1
        }]);

## See also
* action-service.spec.js : unit testing.
* components/navbar : example of ActionService use to build the main menu.
