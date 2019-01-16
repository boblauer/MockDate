// Type definitions for @fintechstudios/mockdate 2.0
// Project: https://github.com/fintechstudios/MockDate
// Definitions by: Bruno Leonardo Michels <https://github.com/brunolm>
//                 austin ce <https://github.com/austince>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export as namespace MockDate;

/**
 * Change the Date implementation to mock a specific date.
 * @param date to be set as current
 * @param timezoneOffset? The value that should be returned by new Date().getTimezoneOffset()
 */
export function set(date: { valueOf(): number; } | number | string, timezoneOffset?: number): void;

/**
 * Restore the original Date object back to the native implementation. Also stops the ticker if set.
 */
export function reset(): void;

/**
 * Starts incrementing the mocked time.
 *
 * @param {number} [intervalMillis=1000] How often to update the date.
 * @throws {Error} If the mock date has not first been set.
 */
export function startTicking(intervalMillis?: number): void;

/**
 * Stops the tick incrementing.
 */
export function stopTicking(): void;
