import typescript from 'rollup-plugin-typescript2';

export default [{
  input: 'src/mockdate.ts',
  output: {
    exports: 'named',
    file: 'lib/mockdate.cjs',
    format: 'umd',
    name: 'MockDate',
  },
  plugins: [typescript()],
}, {
  input: 'src/mockdate.ts',
  output: {
    file: 'lib/mockdate.js',
    format: 'esm',
    name: 'MockDate',
  },
  plugins: [typescript()],
}];
