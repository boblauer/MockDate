const should = require('should');
const MockDate = require('../lib/mockdate');

describe('MockDate', function() {
  const mockDate = '1/1/2000';
  const currentYear = new Date().getFullYear();
  const nativeToString = Date.toString();

  beforeEach(function () {
    MockDate.set(new Date(mockDate));
  });

  afterEach(function () {
    MockDate.reset();
  });

  it('should check date constructor name', function() {
    should.equal(Date.name, 'Date');
  });

  it('should throw for bad date', function() {
    should.throws(function () {
      MockDate.set('40/40/2000');
    }, 'mockdate: The time set is an invalid date: 40/40/2000');

    should.throws(function () {
      MockDate.set(NaN);
    }, 'mockdate: The time set is an invalid date: NaN');
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
    var utcMs   = locDate.valueOf()-locDate.getTimezoneOffset()*60*1000;
    var utcDate = new Date(utcMs);
    should.equal('Tue, 01 Aug 1995 00:00:00 GMT', utcDate.toUTCString());
  });

  it('should be able to create a specific date from year, month, date', function() {
    var locDate = new Date(1995, 7, 9);
    var utcMs   = locDate.valueOf()-locDate.getTimezoneOffset()*60*1000;
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

  it('should revert correctly', function() {
    MockDate.reset();
    should.equal(new Date().getFullYear(), currentYear);
    should.ok(Date.toString().indexOf('native'));
  });
});
