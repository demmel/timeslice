/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type {MaterialIconsGlyphs} from 'react-native-vector-icons/MaterialIcons';

type Props = {children: React.ChildrenArray<React.Element<typeof Item>>};

function ActivityGrid({children}: Props): React.Element<typeof View> {
  return <View style={styles.root}>{children}</View>;
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
      <View style={[styles.item, selected && styles.itemSelected]}>
        {icon != null && (
          <Icon name={icon} color={selected ? 'black' : 'white'} size={48} />
        )}
        <Text style={[styles.itemText, selected && styles.itemTextSelected]}>
          {text}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    height: 128,
    justifyContent: 'center',
    margin: 4,
    padding: 8,
    width: 128,
  },
  itemSelected: {
    backgroundColor: 'white',
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  itemTextSelected: {
    color: 'black',
  },
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
});

ActivityGrid.Item = Item;

export default ActivityGrid;
