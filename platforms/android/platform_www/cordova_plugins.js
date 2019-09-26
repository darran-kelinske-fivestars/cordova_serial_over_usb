cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordovarduino.Serial",
      "file": "plugins/cordovarduino/www/serial.js",
      "pluginId": "cordovarduino",
      "clobbers": [
        "window.serial"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordovarduino": "0.0.10"
  };
});