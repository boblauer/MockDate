(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
}('MockDate', function() {
  "use strict";

  var _Date = Date
    , now   = null
    ;

  function MockDate(date) {
    if (date) return new _Date(date);
    if (now) return new _Date(now);
    return new _Date();
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
