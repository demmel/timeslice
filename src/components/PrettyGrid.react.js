/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, View} from 'react-native';

const {useState} = React;

type Props = {
  children: React.Node,
  spacing: number,
};

function usePrettyGridMeasure() {
  const [preferredSizes, setPreferredSizes] = useState(new Map());
  const [rootWidth, setRootWidth] = useState(0);

  return {
    MeasureComponent: ({children}) => (
      <View
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          setRootWidth(width);
        }}
        style={styles.root}>
        {React.Children.map(children, (child, i) => (
          <View
            onLayout={({
              nativeEvent: {
                layout: {width, height},
              },
            }) => {
              if (!preferredSizes.has(i)) {
                setPreferredSizes(old => old.set(i, {height, width}));
              }
            }}>
            {child}
          </View>
        ))}
      </View>
    ),
    preferredSizes,
    rootWidth,
  };
}

function PrettyGrid({children, spacing}: Props): React.MixedElement {
  const {preferredSizes, rootWidth, MeasureComponent} = usePrettyGridMeasure();

  if (preferredSizes.size !== React.Children.count(children)) {
    return <MeasureComponent>{children}</MeasureComponent>;
  }

  const childSets = [];
  let currenSet = [];
  let currenSetWidth = 0;
  React.Children.forEach(children, (child, i) => {
    const width = preferredSizes.get(i)?.width;
    if (currenSetWidth + width > rootWidth) {
      childSets.push(currenSet);
      currenSet = [];
      currenSetWidth = 0;
    }
    if (currenSet.length !== 0) {
      currenSetWidth += spacing;
    }
    currenSet.push({e: child, i});
    currenSetWidth += preferredSizes.get(i)?.width;
  });
  childSets.push(currenSet);

  let uniformHeight = 0;
  React.Children.forEach(children, (_, i) => {
    const height = preferredSizes.get(i)?.height ?? 0;
    if (height > uniformHeight) {
      uniformHeight = height;
    }
  });

  return (
    <View>
      {childSets.map((set, setI) => {
        const setWidth = set.reduce(
          (acc, cur) => acc + preferredSizes.get(cur.i)?.width,
          0,
        );
        return (
          <View
            key={setI}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles.row,
              paddingBottom: setI !== childSets.length - 1 ? spacing : 0,
            }}>
            {set.map((child, childI) => {
              const style = {
                height: uniformHeight,
                paddingEnd: childI !== set.length - 1 ? spacing : 0,
                width:
                  rootWidth *
                  ((preferredSizes.get(child.i)?.width ?? 0) / setWidth),
              };
              return (
                <View key={childI} style={style}>
                  {child.e}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default PrettyGrid;
