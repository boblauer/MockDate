(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object')
    define(definition);
  else this[name] = definition();
})('MockDate', function() {
  'use strict';

  var _Date = Date,
    _getTimezoneOffset = Date.prototype.getTimezoneOffset,
    now = null,
    multiple = [];
  function MockDate(y, m, d, h, M, s, ms) {
    var date;

    switch (arguments.length) {
      case 0:
        if (now !== null) {
          date = new _Date(now);
          shiftMultiple();
        } else {
          date = new _Date();
        }
        break;

      case 1:
        date = new _Date(y);
        break;

      default:
        d = typeof d === 'undefined' ? 1 : d;
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

  function set(date, timezoneOffset) {
    var dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new TypeError('mockdate: The time set is an invalid date: ' + date);
    }

    if (typeof timezoneOffset === 'number') {
      MockDate.prototype.getTimezoneOffset = function() {
        return timezoneOffset;
      };
    }

    Date = MockDate;

    now = dateObj.valueOf();
  }

  function shiftMultiple(timezoneOffset) {
    if (multiple && multiple.length > 0) {
      set(multiple.shift(), timezoneOffset);
    }
  }

  function setMultiple(dates, timezoneOffset) {
    if (!dates || dates.length == 0) {
      throw new TypeError(
        'mockdate: Received an empty array of dates on setMultiple, pass at least one valid date'
      );
    }

    if (isNaN(dates[0].getTime())) {
      throw new TypeError(
        'mockdate: Pass at least one valid date to setMultiple, first elment of array is an invalid date: ' +
          dates[0]
      );
    }

    multiple = dates.slice();

    shiftMultiple(timezoneOffset);
  }

  function reset() {
    multiple = [];
    Date = _Date;
    Date.prototype.getTimezoneOffset = _getTimezoneOffset;
  }

  return {
    set: set,
    setMultiple: setMultiple,
    reset: reset,
  };
});
