var assert = chai.assert;


describe('MockDate', function() {

  var mockDate       = '1/1/2000'
    , currentYear    = new Date().getFullYear()
    , nativeToString = Date.toString()
    ;

  MockDate.set(new Date(mockDate));

  it('should override new Date()', function() {
    assert.equal(new Date().toString(), new Date(mockDate).toString());
    assert.equal(new Date().getFullYear(), 2000);
  });

  it('should override Date.now()', function() {
    assert.equal(Date.now(), new Date(mockDate).valueOf());
  });

  it('should allow mock dates to show up as real dates using instanceof', function() {
    assert.ok(new Date() instanceof Date);
  });

  it('should have the same toString as the native Date object does', function() {
    assert.equal(Date.toString(), nativeToString);
  });

  it('should revert correctly', function() {
    MockDate.reset();
    assert.equal(new Date().getFullYear(), currentYear);
    assert.ok(Date.toString().indexOf('native'));
  });
});
