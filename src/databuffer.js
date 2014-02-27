
module.exports = function (name, ignoreColor) {

  this.igColor = !! ignoreColor;

  if ((typeof ignoreColor === 'undefined') && (typeof name === 'boolean')) {
    this.igColor = name;
    this.name = 'default';
  } else {
    this.name = name || 'default';
  }

  this.cache = require('CacheService').getPrivateCache();
  this.clearCode = "";
};



module.exports.prototype.write = function (message) {
  var str, clearCode = this.clearCode;

  message = message.replace(/\n/g, "<br/>");

  str = message.match(/\033\[32m|\033\[31m|\033\[33m|\033\[0m/);
  while (str !== null) {
    switch (str[0]) {
      case ('\033[32m'): // green
        message = igColor ? message.replace(/\033\[32m/, '') : message.replace(/\033\[32m/, clearCode + '<span style="color: #00aa00">');
        clearCode = '</span>';
        break;
      case ('\033[31m'): // red
        message = igColor ? message.replace(/\033\[31m/, '') : message.replace(/\033\[31m/, clearCode + '<span style="color: #ff0000">');
        clearCode = '</span>';
        break;
      case ('\033[33m'): // yellow
        message = igColor ? message.replace(/\033\[33m/, '') : message.replace(/\033\[33m/, clearCode + '<span style="color: #dddd00">');
        clearCode = '</span>';
        break;
      case ('\033[0m'):  // none
        message = igColor ? message.replace(/\033\[0m/, '') : message.replace(/\033\[0m/, clearCode);
        clearCode = "";
        break;
      default:
        break;
    }
    this.clearCode = clearCode;
    str = message.match(/\033\[32m|\033\[31m|\033\[33m|\033\[0m/);
  }

  str = this.cache.get(this.name) + message;
  this.cache.put(this.name, str, 15*60);
};

module.exports.prototype.read = function () {
  return this.cache.get(this.name);
};
