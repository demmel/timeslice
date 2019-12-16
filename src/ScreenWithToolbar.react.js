/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    <View style={styles.root}>
      <View style={styles.screen}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#303030',
    height: '100%',
    width: '100%',
  },
  menuButton: {
    alignItems: 'center',
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  root: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  screen: {
    height: '100%',
    width: '100%',
  },
  toolbar: {
    backgroundColor: '#212121',
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
