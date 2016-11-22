MockDate
========

A JavaScript Mock Date object that can be used to change when "now" is.

[![Build Status](https://travis-ci.org/boblauer/MockDate.png)](https://travis-ci.org/boblauer/MockDate)

## Installation ##
`npm install mockdate`

## Environment Support ##
MockDate has been tested in Node, IE9+, Chrome, Firefox, and Opera.

## Usage ##
```javascript
// CommonJS
var MockDate = require('mockdate');
```
```javascript
// AMD
require(['MockDate'], function(MockDate) { ... });
```
```javascript
// Script Tag
var MockDate = window.MockDate;
```

## API ##
```javascript;
MockDate.set(date, [timezoneOffset])
```

#### __date__

__date__: __`Object`__

The `Date` to be returned when no parameters are passed to `new Date()`.  Supports any object that has a `.valueOf` method that returns a value that can be passed to `new Date()`.

__date__: __`String`__

The string representation of the `Date` to be returned when no parameters are passed to `new Date()`.

__date__: __`Number`__

The millisecond representation of the `Date` to be returned when no parameters are passed to `new Date()`.

### __timezoneOffset

__timezoneOffset__: __`Number`__

The value that should be returned by new Date().getTimezoneOffset()

```javascript
MockDate.reset();
```

Will restore the original `Date` object back to the native implementation.

## Example ##
```javascript
MockDate.set('1/1/2000');

new Date().toString() // "Sat Jan 01 2000 00:00:00 GMT-0600 (CST)"

MockDate.set('1/1/2000', 120);

new Date().getTimezoneOffset() // 120

MockDate.set(new Date('2/2/2000'));

new Date().toString() // "Wed Feb 02 2000 00:00:00 GMT-0600 (CST)"

MockDate.set(moment('3/3/2000')); // using momentjs

new Date().toString() // "Fri Mar 03 2000 00:00:00 GMT-0600 (CST)"

MockDate.reset();

new Date().toString() // "Mon Mar 17 2014 18:08:44 GMT-0500 (CDT)"
new Date().getTimezoneOffset() // 360
```

## Test ##
```javascript
npm test
```
