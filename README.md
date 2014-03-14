
# gas-console

console library for Google Apps Script porting from Node.js v0.10.26.

In google apps script, this provides console.log() or other methods. And you can see output on the web.


## Usage

### Using GAS Library

1. Import GAS library 'console' into your gas project.

    project key  : MYBwh3izlQThbSz1-36mOjVJodnbMh4p7
    project name : console

2. Open this URL in other browser window.

    project url  : https://script.google.com/macros/s/AKfycbzZaq3NPqMHYBno7ByxV-bpTbDt6EZ4M_5-kjYXXeQ9HI-k_w8/exec

3. Code and run to output to console.

    or sample project is [here](https://script.google.com/d/1vkI3Uhocx8EocirWBAqPb8ft77R4jTcB-mHy31aTC_XaRz-AFmkfdKAs/edit).

* Using this, google login required.

* Where's my data?

    This library uses cache services only your account context.
    Anyone else can see your data.


### Build your own library.

This project using [Code.gs](https://www.npmjs.org/package/codegs).

1. Go to gas-console project directory.

2. type `npm install`

3. type `./build -o out.js`

* More info, see code.gs


### Using fputs on Node.js

about fputs, see 'About Methods'.

1. type `npm install gas-console`

2. code `require('gas-console');`

then, added `fputs` method into object `console`.



## About Methods

### fputs

Only one method added to original is:

`console.fputs(str)`

This method put string to stdout without '\n' at line end.


### Other methods

See original documentation [here](http://nodejs.org/api/console.html).


