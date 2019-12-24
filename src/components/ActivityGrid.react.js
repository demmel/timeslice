/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PrettyGrid from 'components/PrettyGrid.react';
import appStyles from 'styles';
import type {MaterialIconsGlyphs} from 'react-native-vector-icons/MaterialIcons';
type Props = {children: React.ChildrenArray<React.Element<typeof Item>>};

function ActivityGrid({children}: Props): React.Element<typeof View> {
  return (
    <View style={styles.root}>
      <PrettyGrid spacing={8}>{children}</PrettyGrid>
    </View>
  );
}

type ItemProps = {
  icon?: MaterialIconsGlyphs,
  text: string,
  onPress(): void,
  selected?: boolean,
};

function Item({
  icon,
  text,
  onPress,
  selected,
}: ItemProps): React.Element<typeof TouchableNativeFeedback> {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(selected ? 'black' : 'white')}
      onPress={onPress}>
      <View
        style={[
          appStyles.centerContent,
          styles.item,
          selected && styles.itemSelected,
        ]}>
        {icon != null && (
          <Icon name={icon} color={selected ? 'black' : 'white'} size={48} />
        )}
        <Text
          style={[
            appStyles.primaryText,
            styles.itemText,
            selected && styles.itemTextSelected,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    minHeight: 100,
    minWidth: 100,
    padding: 8,
  },
  itemSelected: {
    backgroundColor: 'white',
  },
  itemText: {
    textAlign: 'center',
  },
  itemTextSelected: {
    color: 'black',
  },
  root: {
    padding: 8,
  },
});

ActivityGrid.Item = Item;

export default ActivityGrid;
