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
    var that = this;
    var effect = this.effects.shift();

    if(typeof(effect) !== 'undefined') {
      // Gestion des paramètres d'effet
      var color = effect.hue;
      var brightness = effect.brightness;
      var wait = effect.wait;
      var type = effect.type;

      // Ajoute en base l'état actuel de la lampe
      Milight.create({type: type, zone: 'all', brightness: parseInt(brightness), color: color}).exec(function (err, data){
        if (err) {
          sails.log.error(err);
        }
        sails.log.verbose('New Milight entry.');
        sails.log.silly(data);
      });

      switch(type) {
        case 'color':
          MilightService.color(box, 'all', color, function () {
            setTimeout(function () {
              // On exécute de nouveau la fonction
              that.setEffect(box, cb);
            }, wait);
          });
          break;
        case 'brightness':
          MilightService.brightness(box, 'all', brightness, function () {
            setTimeout(function () {
              // On exécute de nouveau la fonction
              that.setEffect(box, cb);
            }, wait);
          });
          break;
        case 'whiteMode':
          MilightService.whiteMode(box, 'all', function () {
            setTimeout(function () {
              // On exécute de nouveau la fonction
              that.setEffect(box, cb);
            }, wait);
          });
          break;
        case 'black':
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
