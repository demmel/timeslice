/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {useNavigationContext} from 'MenuNavigator.react';

type ItemProps = {title: string, route: string};

function Item({title, route: routeName}: ItemProps) {
  const {route, navigate} = useNavigationContext();
  const selected = route.name === routeName;
  const content = (
    <View style={[styles.item, selected && styles.itemSelected]}>
      <Text style={[styles.itemText, selected && styles.itemTextSelected]}>
        {title}
      </Text>
    </View>
  );
  return selected ? (
    content
  ) : (
    <TouchableNativeFeedback onPress={() => navigate(routeName)}>
      {content}
    </TouchableNativeFeedback>
  );
}

type Props = {
  children: React.ChildrenArray<React.Element<typeof Item>>,
};

function Menu({children}: Props): React.Element<typeof View> {
  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
  item: {
    paddingBottom: 10,
    paddingEnd: 32,
    paddingStart: 32,
    paddingTop: 10,
  },
  itemSelected: {
    backgroundColor: '#FFFFFF',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  itemTextSelected: {
    color: '#191919',
    fontWeight: 'bold',
  },
  root: {
    backgroundColor: '#191919',
    height: '100%',
    minWidth: 250,
    width: '100%',
  },
});

Menu.Item = Item;

export default Menu;
