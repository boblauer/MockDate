(function (name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
}('MockDate', function () {
  "use strict";

  var _Date = Date;
  var _getTimezoneOffset = Date.prototype.getTimezoneOffset;
  var now = null;
  var intervalId = null;

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

  MockDate.now = function () {
    return new MockDate().valueOf();
  };

  MockDate.parse = function (dateString) {
    return _Date.parse(dateString);
  };

  MockDate.toString = function () {
    return _Date.toString();
  };

  MockDate.prototype = _Date.prototype;

  function set(date, timezoneOffset) {
    var dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new TypeError('mockdate: The time set is an invalid date: ' + date);
    }

    if (typeof timezoneOffset === 'number') {
      MockDate.prototype.getTimezoneOffset = function () {
        return timezoneOffset;
      };
    }

    Date = MockDate;
    if (date.valueOf) {
      date = date.valueOf();
    }

    now = dateObj.valueOf();
  }

  function reset() {
    Date = _Date;
    Date.prototype.getTimezoneOffset = _getTimezoneOffset;
    stopTickInterval();
    now = null;
  }

  /**
   * Starts incrementing the mocked time.
   *
   * @param {number} [intervalMillis=1000] How often to update the date.
   * @throws {Error} If the mock date has not first been set.
   */
  function startTickInterval(intervalMillis = 1000) {
    if (now == null){
      throw new Error('mockdate: must `set` date before starting tick.');
    }
    intervalId = setInterval(() => {
      now += intervalMillis;
    }, intervalMillis);
  }

  /**
   * Stops the tick incrementing.
   */
  function stopTickInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  return {
    set: set,
    startTicking: startTickInterval,
    stopTicking: stopTickInterval,
    reset: reset
  };
}));
