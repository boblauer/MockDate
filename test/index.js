const should = require('should');
const MockDate = require('..');

describe('MockDate', function() {
  var mockDate = '1/1/2000';
  var currentYear = new Date().getFullYear();
  var nativeToString = Date.toString();
  var mockDateRealOffset = new Date(mockDate).getTimezoneOffset();
  var currentDateRealOffset = new Date().getTimezoneOffset();

  beforeEach(function() {
    MockDate.set(new Date(mockDate));
  });

  afterEach(function() {
    MockDate.reset();
  });

  it('should throw for bad date', function() {
    should.throws(function() {
      MockDate.set('40/40/2000');
    }, 'mockdate: Received an empty array of dates on setMultiple, pass at least one valid date');

    should.throws(function() {
      MockDate.set(NaN);
    }, 'mockdate: Pass at least one valid date to setMultiple, first elment of array is an invalid date: NaN');
  });

  it('should throw for bad dates', function() {
    should.throws(function() {
      MockDate.setMultiple(NaN);
    }, 'mockdate: The time set is an invalid date: NaN');

    should.throws(function() {
      MockDate.setMultiple(['40/40/2000']);
    }, 'mockdate: The time set is an invalid date: 40/40/2000');
  });

  it('should override new Date()', function() {
    should.equal(new Date().toString(), new Date(mockDate).toString());
    should.equal(new Date().getFullYear(), 2000);
  });

  it('should override Date.now()', function() {
    should.equal(Date.now(), new Date(mockDate).valueOf());
  });

  it('should override Date.parse()', function() {
    should.equal('807926400000', Date.parse('Wed, 09 Aug 1995 00:00:00 GMT'));
  });

  it('should override Date.prototype.getTimezoneOffset', function() {
    MockDate.set(new Date(mockDate), -1);
    should.equal(-1, new Date().getTimezoneOffset());
  });

  it('should not override Date.prototype.getTimezoneOffset if the value is not a number', function() {
    MockDate.set(new Date(mockDate), '-1');
    should.equal(mockDateRealOffset, new Date(mockDate).getTimezoneOffset());
  });

  it('should correctly reset Date.prototype.getTimezoneOffset when mocking is stopped', function() {
    MockDate.set(new Date(mockDate), -1);
    should.equal(new Date().getTimezoneOffset(), -1);

    MockDate.reset();
    should.equal(new Date().getTimezoneOffset(), currentDateRealOffset);
  });

  it('should allow mock dates to show up as real dates using instanceof', function() {
    should.ok(new Date() instanceof Date);
  });

  it('should have the same toString as the native Date object does', function() {
    should.equal(Date.toString(), nativeToString);
  });

  it('should be able to create a specific date from a timestamp', function() {
    var date = new Date(807926400000);
    should.equal('Wed, 09 Aug 1995 00:00:00 GMT', date.toUTCString());
  });

  it('should be able to create a specific date from year, month', function() {
    var locDate = new Date(1995, 7);
    var utcMs = locDate.valueOf() - locDate.getTimezoneOffset() * 60 * 1000;
    var utcDate = new Date(utcMs);
    should.equal('Tue, 01 Aug 1995 00:00:00 GMT', utcDate.toUTCString());
  });

  it('should be able to create a specific date from year, month, date', function() {
    var locDate = new Date(1995, 7, 9);
    var utcMs = locDate.valueOf() - locDate.getTimezoneOffset() * 60 * 1000;
    var utcDate = new Date(utcMs);
    should.equal('Wed, 09 Aug 1995 00:00:00 GMT', utcDate.toUTCString());
  });

  it('should respect a date of 0', function() {
    var locDate = new Date(1995, 7, 0);
    should.equal(locDate.getDate(), 31);
  });

  it('should be able to create a date correctly from the epoch', function() {
    MockDate.set(0);
    should.equal('Thu, 01 Jan 1970 00:00:00 GMT', new Date().toUTCString());
  });

  it('should set multiple dates and use it in cycles', function() {
    const dates = [
      new Date(2020, 0, 19),
      new Date(2020, 0, 20),
      new Date(1991, 0, 10),
    ];
    const timezoneOffset = 0;

    MockDate.setMultiple(dates, timezoneOffset);
    const firstDate = new Date();
    const secondDate = new Date();
    const thirdDate = new Date();
    const fourthDate = new Date();

    should.equal(timezoneOffset, firstDate.getTimezoneOffset());
    should.equal(dates[0].toString(), firstDate.toString());
    should.equal(dates[1].toString(), secondDate.toString());
    should.equal(dates[2].toString(), thirdDate.toString());
    should.equal(dates[2].toString(), fourthDate.toString());
  });

  it('should revert correctly', function() {
    MockDate.reset();
    should.equal(new Date().getFullYear(), currentYear);
    should.ok(Date.toString().indexOf('native'));
  });
});
