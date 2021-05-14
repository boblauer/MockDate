module.exports = {
  env: {
    'es2021': true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  overrides: [{
    files: '.eslintrc.cjs',
    env: {node: true}
  }, {
    files: 'test/**',
    env: {mocha: true}
  }],
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  }
};
