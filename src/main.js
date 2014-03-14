
var gasConsole_;

if (typeof this.global === 'undefined') {
    //  Google Apps Script
    require('global');

    var databuff_ = require('./databuffer');
    var buff_ = new databuff_();

    gasConsole_ = new console.Console(buff_);
    gasConsole_.buff = buff_;

} else {
    // Node.js
    gasConsole_ = console;
    console.fputs = fputs;
}

/**
 *  console.log([data], [...])
 *  Prints to stdout with newline.
 *  This function can take multiple arguments in a printf()-like way.
 *
 *  @example
 *  console.log('count: %d', count);
 */
function log() {
    return gasConsole_.log.apply(gasConsole_, arguments);
}

function info() {
    return gasConsole_.info.apply(gasConsole_, arguments);
}

function warn() {
    return gasConsole_.warn.apply(gasConsole_, arguments);
}

function error() {
    return gasConsole_.error.apply(gasConsole_, arguments);
}

function dir() {
    return gasConsole_.dir.apply(gasConsole_, arguments);
}

function time() {
    return gasConsole_.time.apply(gasConsole_, arguments);
}

function timeEnd() {
    return gasConsole_.timeEnd.apply(gasConsole_, arguments);
}

function trace() {
    return gasConsole_.trace.apply(gasConsole_, arguments);
}

function assert() {
    return gasConsole_.assert.apply(gasConsole_, arguments);
}

function Console(name) {
    // use original console.Console. NOT gasConsole_.Console.
    return new console.Console(databuff_.getStdout(name));
}

function fputs() {
    return gasConsole_._stdout.write.apply(gasConsole_._stdout, arguments);
}


function doGet(e) {
    return require('./gui')(e);
}
