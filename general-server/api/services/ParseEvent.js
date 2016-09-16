var ParseEvent = function (text, cb) {
  switch (text) {
    case 'Réveil':
    case 'Reveil':
    case 'réveil':
    case 'reveil':
      cb(-1, {type: 'awakening'});
      break;

    case 'Coucher':
    case 'coucher':
    case 'Couché':
    case 'couché':
    case 'Dormir':
    case 'dormir':
      cb(-1, {type: 'bedDown'});
      break;

    default:
      cb(-1, {type: 'alarm'});
      break;

  }
};

module.exports = ParseEvent;
