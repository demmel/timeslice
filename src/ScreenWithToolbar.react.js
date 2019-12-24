/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import appStyles from 'styles';
import theme from 'theme';
import type {MaterialIconsGlyphs} from 'react-native-vector-icons/MaterialIcons';

type Props = {
  children: React.Node,
  toolbarContent: React.Node,
  toolbarButton?: {
    onPress(): void,
    icon: MaterialIconsGlyphs,
  },
};

function ScreenWithToolbar({
  children,
  toolbarContent,
  toolbarButton,
}: Props): React.Element<typeof View> {
  return (
    <View style={appStyles.fillParent}>
      <View style={styles.toolbar}>
        {toolbarButton && (
          <TouchableNativeFeedback
            onPress={toolbarButton.onPress}
            background={TouchableNativeFeedback.Ripple('white')}>
            <View style={styles.menuButton}>
              <Icon name={toolbarButton.icon} size={48} color="white" />
            </View>
          </TouchableNativeFeedback>
        )}
        <View style={styles.toolbarContent}>{toolbarContent}</View>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    ...appStyles.fillParent,
    backgroundColor: theme.backgroundColorContent,
  },
  menuButton: {
    ...appStyles.centerContent,
    height: 64,
    width: 64,
  },
  toolbar: {
    backgroundColor: theme.backgroundColorToolbar,
    flexDirection: 'row',
    height: 64,
  },
  toolbarContent: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingTop: 8,
  },
});

export default ScreenWithToolbar;
