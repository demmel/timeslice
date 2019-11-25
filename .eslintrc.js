module.exports = {
  root: true,
  extends: ['@react-native-community'],
  plugins: ['flowtype'],
  rules: {
    'sort-imports': 1,
    'react-native/no-unused-styles': 1,
    'react-native/sort-styles': 1,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
