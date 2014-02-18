
require('global');

var databuffer = require('./databuffer');
var gasConsole = new console.Console(new databuffer());

function log() {
    return gasConsole.log.apply(this, arguments);
}

function info() {
    return gasConsole.info.apply(this, arguments);
}

function warn() {
    return gasConsole.warn.apply(this, arguments);
}

function error() {
    return gasConsole.error.apply(this, arguments);
}

function dir() {
    return gasConsole.dir.apply(this, arguments);
}

function time() {
    return gasConsole.time.apply(this, arguments);
}

function timeEnd() {
    return gasConsole.timeEnd.apply(this, arguments);
}

function trace() {
    return gasConsole.trace.apply(this, arguments);
}

function assert() {
    return gasConsole.assert.apply(this, arguments);
}

function Console(name) {
    // use original console.Console. NOT gasConsole.Console.
    return new console.Console(databuff.getStdout(name));
}



var gui = require('./gui');

function doGet(e) {
    return gui.doGet(e);
}

function _doTimer(e) {
    return gui._doTimer(e);
}

function _selectTab(e) {
    return gui._selectTab(e);
}
