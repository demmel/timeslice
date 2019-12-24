/*
 * @flow
 * @format
 */

import {StyleSheet} from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    backgroundColor: theme.backgroundColorModal,
    elevation: 5,
    padding: 8,
    width: '80%',
  },
  emptyScreenText: {
    color: theme.textColorSecondary,
    fontSize: theme.fontSizeNormal,
  },
  emptyScreenTitleText: {
    color: theme.textColorSecondary,
    fontSize: theme.fontSizeTitle,
  },
  fillParent: {
    height: '100%',
    width: '100%',
  },
  primaryText: {
    color: theme.textColorPrimary,
    fontSize: theme.fontSizeNormal,
  },
  toolbarText: {
    color: theme.textColorPrimary,
    fontSize: theme.fontSizeToolbar,
  },
});
