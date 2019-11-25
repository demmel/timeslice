/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenWithMenu from 'ScreenWithMenu.react';

function WelcomeScreen(): React.Element<typeof ScreenWithMenu> {
  return (
    <ScreenWithMenu
      toolbarContent={<Text style={styles.title}>Timeslice</Text>}>
      <View style={styles.root}>
        <Text style={styles.welcomeTitle}>Welcome to Timeslice</Text>
        <Text style={styles.welcomeText}>
          To get started, let's define some activities you'd like to track by
          tapping (
          <Icon style={styles.bold} name="menu" />) and then tapping (
          <Text style={styles.bold}>Edit Activities</Text>).
        </Text>
      </View>
    </ScreenWithMenu>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  welcomeText: {
    color: '#BBBBBB',
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
    width: 250,
  },
  welcomeTitle: {
    color: '#BBBBBB',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
