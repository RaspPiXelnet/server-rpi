var MilightEffect = {

  effects: {},

  init: function (effects, cb) {
    var that = this;
    this.effects = effects;

    MilightService.init(function (box) {
      setTimeout(function() {
        that.setEffect(box, cb);
      }, 100);
    });
  },

  setEffect: function (box, cb) {
    sails.log(1);
    var that = this;
    var effect = this.effects.shift();
    sails.log(effect);
    sails.log(effect.type);
    if(typeof(effect.type) !== 'undefined') {
      sails.log(2);
      // Gestion des paramètres d'effet
      var color = effect.hue;
      var brightness = effect.brightness;
      var wait = effect.wait;
      var type = effect.type;
      switch(type) {
        case 'color':
          sails.log(3);
          MilightService.color(box, 'all', color, function () {
            setTimeout(function () {
              // On exécute de nouveau la fonction
              that.setEffect(box, cb);
            }, wait);
          });
          break;
        case 'brightness':
          sails.log(4);
          MilightService.brightness(box, 'all', brightness, function () {
            setTimeout(function () {
              // On exécute de nouveau la fonction
              that.setEffect(box, cb);
            }, wait);
          });
          break;
        case 'whiteMode':
          sails.log(5);
          MilightService.whiteMode(box, 'all', function () {
            setTimeout(function () {
              // On exécute de nouveau la fonction
              that.setEffect(box, cb);
            }, wait);
          });
          break;
        case 'black':
          sails.log(6);
          MilightService.off(box, 'all', function () {
            setTimeout(function () {
              // On exécute de nouveau la fonction
              that.setEffect(box, cb);
            }, wait);
          });
          break;
      }
    } else {
      cb();
    }
  }

};

module.exports = MilightEffect;
