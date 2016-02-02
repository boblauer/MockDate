(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
}('MockDate', function() {
  "use strict";

  var _Date = Date
    , now   = null
    ;

  function MockDate(y, m, d, h, M, s, ms) {
    var date;

    switch (arguments.length) {

      case 0:
        if (now !== null) {
          date = new _Date(now);
        } else {
          date = new _Date();
        }
        break;

      case 1:
        date = new _Date(y);
        break;

      default:
        d = d || 1;
        h = h || 0;
        M = M || 0;
        s = s || 0;
        ms = ms || 0;
        date = new _Date(y, m, d, h, M, s, ms);
        break;
    }

    return date;
  }

  MockDate.UTC = _Date.UTC;

  MockDate.now = function() {
    return new MockDate().valueOf();
  };

  MockDate.parse = function(dateString) {
    return _Date.parse(dateString);
  };

  MockDate.toString = function() {
    return _Date.toString();
  };

  MockDate.prototype = _Date.prototype;

  function set(date) {
    Date = MockDate;

    if (date.valueOf) {
      date = date.valueOf();
    }

    now = new Date(date).valueOf();
  }

  function reset() {
    Date = _Date;
  }

  return {
    set: set,
    reset: reset
  };

}));
