## 3.0.5

- Use Rollup to build a proper UMD package.

## 3.0.4

- Properly exposed window.MockDate when loaded in the browser.

## 3.0.3

- Switched TypeScript build from CommonJS to UMD.

## 3.0.0

### Breaking Changes:

- Support for `timezoneOffset` parameter was removed. It was a foot gun and caused many issues because it was only half-implemented. Implementing full timezone support is outside the scope of this library.
