
require('global');

var databuffer = require('./databuffer');
var gasConsole = new console.Console(new databuffer());

function log() {
    return gasConsole.log.apply(gasConsole, arguments);
}

function info() {
    return gasConsole.info.apply(gasConsole, arguments);
}

function warn() {
    return gasConsole.warn.apply(gasConsole, arguments);
}

function error() {
    return gasConsole.error.apply(gasConsole, arguments);
}

function dir() {
    return gasConsole.dir.apply(gasConsole, arguments);
}

function time() {
    return gasConsole.time.apply(gasConsole, arguments);
}

function timeEnd() {
    return gasConsole.timeEnd.apply(gasConsole, arguments);
}

function trace() {
    return gasConsole.trace.apply(gasConsole, arguments);
}

function assert() {
    return gasConsole.assert.apply(gasConsole, arguments);
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
