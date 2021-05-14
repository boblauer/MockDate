/* eslint @typescript-eslint/ban-ts-comment: ['error', {'ts-ignore': false}]  */
const RealDate = globalThis.Date;
let now: null | number | {valueOf: () => string | number} = null;

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

export function set(date: string | number | Date | (() => string | number)): void {
  const validateDate = (_date : string | number | Date) => {
    const value = _date.valueOf();
    const dateObj = new Date(value);
    if (isNaN(dateObj.getTime())) {
      throw new TypeError('mockdate: The time set is an invalid date: ' + _date);
    }
    return value;
  };
  if (typeof date === 'function') {
    now = {
      valueOf () : string | number {
        const dt = date();
        return validateDate(dt);
      }
    };
  } else {
    now = validateDate(date);
  }

  // @ts-ignore
  globalThis.Date = MockDate;
}

export function reset(): void {
  globalThis.Date = RealDate;
}

export default {
  set,
  reset,
}
