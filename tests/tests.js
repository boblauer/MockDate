
//load tests in the browser or in nodejs
if (typeof(process) === 'undefined') {
  var assert = chai.assert;
} else {
  var assert = require('chai').assert;
  var MockDate = require('..');
}

describe('MockDate', function() {

  var mockDate       = '1/1/2000'
    , currentYear    = new Date().getFullYear()
    , nativeToString = Date.toString()
    , actualOffset   = new Date().getTimezoneOffset();
    ;

  beforeEach(function () {
    MockDate.set(new Date(mockDate));
  });

  afterEach(function () {
    MockDate.reset();
  });

  it('should throw for bad date', function() {
    assert.throws(function () {
      MockDate.set('40/40/2000');
    }, 'mockdate: The time set is an invalid date: 40/40/2000');

    assert.throws(function () {
      MockDate.set(NaN);
    }, 'mockdate: The time set is an invalid date: NaN');
  });

  it('should override new Date()', function() {
    assert.equal(new Date().toString(), new Date(mockDate).toString());
    assert.equal(new Date().getFullYear(), 2000);
  });

  it('should override Date.now()', function() {
    assert.equal(Date.now(), new Date(mockDate).valueOf());
  });

  it('should override Date.parse()', function() {
    assert.equal('807926400000', Date.parse('Wed, 09 Aug 1995 00:00:00 GMT'));
  });

  it('should override Date.prototype.getTimezoneOffset', function() {
    MockDate.set(new Date(mockDate), -1);
    assert.equal(-1, new Date().getTimezoneOffset());
  });

  it('should not override Date.prototype.getTimezoneOffset if the value is not a number', function() {
    MockDate.set(new Date(mockDate), '-1');
    assert.equal(actualOffset, new Date().getTimezoneOffset());
  });

  it('should correctly reset Date.prototype.getTimezoneOffset when mocking is stopped', function() {
    MockDate.set(new Date(mockDate), -1);
    assert.equal(new Date().getTimezoneOffset(), -1);

    MockDate.reset();
    assert.equal((new Date()).getTimezoneOffset(), actualOffset);
  });

  it('should allow mock dates to show up as real dates using instanceof', function() {
    assert.ok(new Date() instanceof Date);
  });

  it('should have the same toString as the native Date object does', function() {
    assert.equal(Date.toString(), nativeToString);
  });

  it('should be able to create a specific date from a timestamp', function() {
    var date = new Date(807926400000);
    assert.equal('Wed, 09 Aug 1995 00:00:00 GMT', date.toUTCString());
  });

  it('should be able to create a specific date from year, month', function() {
    var locDate = new Date(1995, 7);
    var utcMs   = locDate.valueOf()-locDate.getTimezoneOffset()*60*1000;
    var utcDate = new Date(utcMs);
    assert.equal('Tue, 01 Aug 1995 00:00:00 GMT', utcDate.toUTCString());
  });

  it('should be able to create a specific date from year, month, date', function() {
    var locDate = new Date(1995, 7, 9);
    var utcMs   = locDate.valueOf()-locDate.getTimezoneOffset()*60*1000;
    var utcDate = new Date(utcMs);
    assert.equal('Wed, 09 Aug 1995 00:00:00 GMT', utcDate.toUTCString());

    locDate = new Date(1995, 7, 0);
    utcMs   = locDate.valueOf()-locDate.getTimezoneOffset()*60*1000;
    utcDate = new Date(utcMs);
    assert.equal('Mon, 31 Jul 1995 00:00:00 GMT', utcDate.toUTCString());
  });

  it('should be able to create a date correctly from the epoch', function() {
    MockDate.set(0);
    assert.equal('Thu, 01 Jan 1970 00:00:00 GMT', new Date().toUTCString());
  });

  it('should revert correctly', function() {
    MockDate.reset();
    assert.equal(new Date().getFullYear(), currentYear);
    assert.ok(Date.toString().indexOf('native'));
  });
});
