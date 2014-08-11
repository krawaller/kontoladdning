var UAParser = require('ua-parser-js');
var parser = new UAParser();
var result = parser.setUA(navigator.userAgent).getResult();
if (result.os.name == 'iOS' && result.os.version && parseInt(result.os.version.split('.')[0], 10) >= 7) {
  document.body.classList.add('platform-ios7');
  document.body.classList.add('platform-cordova');
}
