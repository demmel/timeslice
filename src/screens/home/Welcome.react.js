/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenWithMenuToggle from 'ScreenWithMenuToggle.react';
import appStyles from 'styles';

function WelcomeScreen(): React.Element<typeof ScreenWithMenuToggle> {
  return (
    <ScreenWithMenuToggle
      toolbarContent={<Text style={appStyles.toolbarText}>Timeslice</Text>}>
      <View style={styles.root}>
        <Text style={[appStyles.emptyScreenTitleText, styles.welcomeTitle]}>
          Welcome to Timeslice
        </Text>
        <Text style={[appStyles.emptyScreenText, styles.welcomeText]}>
          To get started, let's define some activities you'd like to track by
          tapping (
          <Icon style={styles.bold} name="menu" />) and then tapping (
          <Text style={styles.bold}>Edit Activities</Text>).
        </Text>
      </View>
    </ScreenWithMenuToggle>
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
  welcomeText: {
    marginTop: 8,
    textAlign: 'center',
  },
  welcomeTitle: {
    textAlign: 'center',
  },
});

export default WelcomeScreen;
