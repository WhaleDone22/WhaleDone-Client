module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  parser: '@babel/eslint-parser',
  ignorePatterns: ['**/node_modules/**'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ], // https://stackoverflow.com/questions/55614983/jsx-not-allowed-in-files-with-extension-tsxeslintreact-jsx-filename-extensio
    'react/react-in-jsx-scope': 'off', // https://stackoverflow.com/questions/42640636/react-must-be-in-scope-when-using-jsx-react-react-in-jsx-scope
    camelcase: ['error', { allow: ['Inter_*'] }],
    'import/no-unresolved': 'off',
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
  },
  settings: {
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
  },

  plugins: ['prettier'],
};
