/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ScreenWithMenu from 'ScreenWithMenu.react';

function Home(): React.Element<typeof React.Fragment> {
  return (
    <>
      <ScreenWithMenu
        toolbarContent={<Text style={styles.title}>Tineslice</Text>}>
        <View />
      </ScreenWithMenu>
    </>
  );
}

const styles = StyleSheet.create({
  contextSelector: {
    color: '#FFFFFF',
    height: '100%',
    width: '92%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default Home;
