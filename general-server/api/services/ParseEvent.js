var ParseEvent = function(text, cb) {
  switch (text) {
    case 'Réveil':
    case 'Reveil':
    case 'réveil':
    case 'reveil':
      cb(-1, {style: ['fadein-slow']});
      break;
    case 'Coucher':
    case 'coucher':
    case 'Dormir':
    case 'dormir':
      cb(-1, {style: ['fadeout', 'fadeout', 'fadeout']});
    default:
      HueService.getHue('red', function (hue) {
        cb(hue, {style: 'blink'});
      });
      break;
  }
};

module.exports = ParseEvent;
