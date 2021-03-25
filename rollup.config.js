import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/mockdate.ts',
  output: [
    {
      file: 'lib/mockdate.js',
      format: 'umd',
      name: 'MockDate',
    },
  ],
  plugins: [typescript()],
};
