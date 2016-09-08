var Milight = {
  box: {}, // Initilisation d'un objet vide
  ip: sails.config.rpiApp.milight.host, // Adresse IP du serveur Milight (par defaut: '10.10.100.254')

  init: function (cb) {
    if (typeof(this.box.command) !== 'undefined') {
      sails.log('BOX ok');
      cb(this.box);
    } else {
      sails.log('init BOX');
      // Récupération des informations de connexion au serveur Milight
      this.box = new MilightWifiboxService(this.ip);
      cb(this.box);
    }
  },

  getZone: function (zone, cb) {
    if (zone == 0 || zone == null || zone == 'all') {
      cb(0);
    } else {
      cb(zone);
    }
  },

  on: function (box, zone, cb) {
    this.getZone(zone, function (z) {
      box.command(MilightCommandsService.rgbw.on(z));
      cb()
    });
  },

  off: function (box, zone, cb) {
    this.getZone(zone, function (z) {
      box.command(MilightCommandsService.rgbw.off(z));
    });
    cb()
  },

  color: function (box, zone, hue, cb) {
    this.getZone(zone, function (z) {
      box.command(MilightCommandsService.rgbw.on(z));
      setTimeout(function () {
        box.command(MilightCommandsService.rgbw.hue(hue));
        cb();
      }, 100);
    });
  },

  whiteMode: function (box, zone, cb) {
    this.getZone(zone, function (z) {
      box.command(MilightCommandsService.rgbw.on(z));
      setTimeout(function () {
        box.command(MilightCommandsService.rgbw.whiteMode());
        cb();
      }, 100);
    });
  },

  brightness: function (box, zone, percent, cb) {
    this.getZone(zone, function (z) {
      box.command(MilightCommandsService.rgbw.on(z));
      setTimeout(function () {
        box.command(MilightCommandsService.rgbw.brightness(percent));
        cb();
      }, 100);
    });
  }

};

module.exports = Milight;
