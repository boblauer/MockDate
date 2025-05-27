import assert from "node:assert/strict";
import { describe, it, beforeEach, afterEach } from "node:test";
import * as MockDate from "../src/mockdate";

describe("MockDate", () => {
  const mockDate = "1/1/2000";
  const currentYear = new Date().getFullYear();
  const nativeToString = Date.toString();

  beforeEach(() => {
    MockDate.set(new Date(mockDate));
  });

  afterEach(() => {
    MockDate.reset();
  });

  it("should check date constructor name", () => {
    assert.equal(Date.name, "Date");
  });

  it("should throw for bad date", () => {
    assert.throws(
      () => {
        MockDate.set("40/40/2000");
      },
      {
        name: "TypeError",
        message: "mockdate: The time set is an invalid date: 40/40/2000",
      }
    );

    assert.throws(
      () => {
        MockDate.set(NaN);
      },
      {
        name: "TypeError",
        message: "mockdate: The time set is an invalid date: NaN",
      }
    );
  });

  it("should override new Date()", () => {
    assert.equal(new Date().toString(), new Date(mockDate).toString());
    assert.equal(new Date().getFullYear(), 2000);
  });

  it("should override Date.now()", () => {
    assert.equal(Date.now(), new Date(mockDate).valueOf());
  });

  it("should override Date.parse()", () => {
    assert.equal(807926400000, Date.parse("Wed, 09 Aug 1995 00:00:00 GMT"));
  });

  it("should allow mock dates to show up as real dates using instanceof", () => {
    assert.ok(new Date() instanceof Date);
  });

  it("should have the same toString as the native Date object does", () => {
    assert.equal(Date.toString(), nativeToString);
  });

  it("should be able to create a specific date from a timestamp", () => {
    var date = new Date(807926400000);
    assert.equal("Wed, 09 Aug 1995 00:00:00 GMT", date.toUTCString());
  });

  it("should be able to create a specific date from year, month", () => {
    var locDate = new Date(1995, 7);
    var utcMs = locDate.valueOf() - locDate.getTimezoneOffset() * 60 * 1000;
    var utcDate = new Date(utcMs);
    assert.equal("Tue, 01 Aug 1995 00:00:00 GMT", utcDate.toUTCString());
  });

  it("should be able to create a specific date from year, month, date", () => {
    var locDate = new Date(1995, 7, 9);
    var utcMs = locDate.valueOf() - locDate.getTimezoneOffset() * 60 * 1000;
    var utcDate = new Date(utcMs);
    assert.equal("Wed, 09 Aug 1995 00:00:00 GMT", utcDate.toUTCString());
  });

  it("should respect a date of 0", () => {
    var locDate = new Date(1995, 7, 0);
    assert.equal(locDate.getDate(), 31);
  });

  it("should be able to create a date correctly from the epoch", () => {
    MockDate.set(0);
    assert.equal("Thu, 01 Jan 1970 00:00:00 GMT", new Date().toUTCString());
  });

  it("should revert correctly", () => {
    MockDate.reset();
    assert.equal(new Date().getFullYear(), currentYear);
    assert.ok(Date.toString().indexOf("native"));
  });

  it("should overwrite instanceof", () => {
    const realDate = new Date();
    MockDate.set(0);
    const mockDate = new Date();

    assert(realDate instanceof Date);
    assert(mockDate instanceof Date);
  });
});
