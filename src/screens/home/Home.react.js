/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ScreenWithMenuToggle from 'ScreenWithMenuToggle.react';

function Home(): React.Element<typeof React.Fragment> {
  return (
    <>
      <ScreenWithMenuToggle
        toolbarContent={<Text style={styles.title}>Tineslice</Text>}>
        <View />
      </ScreenWithMenuToggle>
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
