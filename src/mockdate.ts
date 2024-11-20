/* eslint @typescript-eslint/ban-ts-comment: ['error', {'ts-ignore': false}]  */
const RealDate = Date;
let now: null | number = null;

export const MockDate = class Date extends RealDate {
  constructor();
  constructor(value: number | string);
  constructor(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);

  constructor(y?: number, m?: number, d?: number, h?: number, M?: number, s?: number, ms?: number) {
    // When converted to ESM, `super` gets a conditional branch, so we ignore
    /* c8 ignore next */
    super();

    let date;

    switch (arguments.length) {
      case 0:
        if (now !== null) {
          date = new RealDate(now.valueOf());
        } else {
          date = new RealDate();
        }
        break;

      case 1:
        date = new RealDate(y);
        break;

      default:
        d = typeof d === 'undefined' ? 1 : d;
        h = h || 0;
        M = M || 0;
        s = s || 0;
        ms = ms || 0;
        date = new RealDate(y, m, d, h, M, s, ms);
        break;
    }

    return date;
  }
}

MockDate.prototype = RealDate.prototype;

MockDate.UTC = RealDate.UTC;

MockDate.now = function() {
  return new MockDate().valueOf();
};

MockDate.parse = function(dateString) {
  return RealDate.parse(dateString);
};

MockDate.toString = function() {
  return RealDate.toString();
};

export function set(date: string | number | Date): void {
  const dateObj = new Date(date.valueOf())
  if (isNaN(dateObj.getTime())) {
    throw new TypeError('mockdate: The time set is an invalid date: ' + date)
  }

  // @ts-ignore
  Date = MockDate; // eslint-disable-line no-global-assign -- Needed for Mock

  now = dateObj.valueOf();
}

export function reset(): void {
  // eslint-disable-next-line no-global-assign -- Needed for Mock
  Date = RealDate;
}

export default {
  set,
  reset,
}
