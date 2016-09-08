var Rtorrent = require('node-rtorrent');

var RTorrent = {

  rtorrent: null,

  init: function (cb) {
    if (this.server == null) {
      var rtorrent = new Rtorrent(sails.config.rtorrent);
      cb(rtorrent);
    } else {
      cb(this.rtorrent)
    }
  },

  getTorrents: function (cb) {
    this.init(function (rtorrent) {
      rtorrent.getAll(function (err, data) {
        if (err) {
          cb({err: err, data:false});
        } else {
          cb({err: false, data: data});
        }
      });
    });
  },

  addTorrentFile: function (filePath, cb) {
    this.init(function(rtorrent) {
        rtorrent.loadFile(filePath, function (err, data) {
          if (err) {
            cb({err: err, data:false});
          } else {
            cb({err: false, data: data});
          }
        });
    });
  },

  addTorrentMagnet: function (magnet, cb) {
    this.init(function(rtorrent) {
      rtorrent.loadLink(magnet, function (err, data) {
        if (err) {
          cb({err: err, data:false});
        } else {
          cb({err: false, data: data});
        }
      });
    });
  },

  startTorrent: function (hash, cb) {
    this.init(function (rtorrent) {
      rtorrent.start(hash, function (err, data) {
        if (err) {
          cb({err: err, data:false});
        } else {
          cb({err: false, data: data});
        }
      });
    });
  }

};

module.exports = RTorrent;
