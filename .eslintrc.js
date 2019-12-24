module.exports = {
  root: true,
  extends: ['@react-native-community'],
  plugins: ['flowtype', 'sort-keys-fix', 'sort-imports-es6-autofix'],
  rules: {
    'sort-imports-es6-autofix/sort-imports-es6': 1,
    'sort-keys-fix/sort-keys-fix': 1,
    'react-native/no-unused-styles': 1,
    'react-native/sort-styles': 1,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
