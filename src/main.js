
require('global');

var gui = require('gui');
var databuff = require('databuffer');

var gasConsole = new console.Console(databuff.getStdout());

function doGet(e) {
    return gui.doGet(e);
}

function log(data) {
    return console.log(data);
}
