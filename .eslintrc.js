module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/node_modules/**'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ], // https://stackoverflow.com/questions/55614983/jsx-not-allowed-in-files-with-extension-tsxeslintreact-jsx-filename-extensio
    'react/react-in-jsx-scope': 'off', // https://stackoverflow.com/questions/42640636/react-must-be-in-scope-when-using-jsx-react-react-in-jsx-scope
    camelcase: ['error', { allow: ['Inter_*'] }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'no-unused-vars': 'warn',
    'react/no-unused-prop-types': 'warn',
    'no-use-before-define': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/prop-types': ['error', { ignore: ['navigation'] }],
  },
  settings: {
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
  },
  globals: {
    NodeJS: true,
    fetch: true,
    FormData: true,
    File: true,
  },
  plugins: ['prettier'],
};
