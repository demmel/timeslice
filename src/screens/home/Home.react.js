/**
 * @format
 * @flow
 */

import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useAppContext} from 'App.react';
import ActivityGrid from 'components/ActivityGrid.react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenWithMenuToggle from 'ScreenWithMenuToggle.react';
import appStyles from 'styles';
import theme from 'theme';
import type {ActivityType} from 'types';

const {useState, useEffect} = React;

const UntrackedActivity = Object.freeze({
  icon: 'block',
  name: 'Untracked',
});

function Home(): React.Element<typeof ScreenWithMenuToggle> {
  const {
    state: {currentActivity, activityTypes},
    api: {setCurrentActivity},
  } = useAppContext();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handle = setTimeout(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearTimeout(handle);
    };
  });

  const currentActivityTypeID = currentActivity.value?.typeID;
  const currentActivityTypeStart = currentActivity.value?.start;
  const currentActivityType =
    currentActivityTypeID != null
      ? ((activityTypes.value.get(currentActivityTypeID): any): ActivityType)
      : UntrackedActivity;

  return (
    <ScreenWithMenuToggle
      toolbarContent={<Text style={appStyles.toolbarText}>Timeslice</Text>}>
      <View style={styles.currentActivity}>
        {currentActivityType.icon && (
          <Icon size={48} color="white" name={currentActivityType.icon} />
        )}
        <View>
          <Text style={styles.currentActivityText}>
            {currentActivityType.name}
          </Text>
          {currentActivityTypeStart != null && (
            <Text style={styles.currentActivityTimer}>
              {millisToString(Math.max(0, time - currentActivityTypeStart))} (
              {percentOfToday(time, currentActivityTypeStart)}% of today)
            </Text>
          )}
        </View>
      </View>
      <ScrollView>
        <ActivityGrid>
          <ActivityGrid.Item
            onPress={() => {
              setCurrentActivity(null);
            }}
            icon={UntrackedActivity.icon}
            text={UntrackedActivity.name}
            selected={currentActivityTypeID == null}
          />
          {[...activityTypes.value.values()].map(activityType => (
            <ActivityGrid.Item
              onPress={() => {
                setCurrentActivity(activityType.id);
              }}
              key={activityType.id}
              text={activityType.name}
              selected={currentActivityTypeID === activityType.id}
            />
          ))}
        </ActivityGrid>
      </ScrollView>
    </ScreenWithMenuToggle>
  );
}

const MILLIS_PER_SEC = 1000;
const SECS_PER_MIN = 60;
const MINS_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

function millisToString(millis) {
  const secs = millis / MILLIS_PER_SEC;
  const mins = secs / SECS_PER_MIN;
  const hours = mins / MINS_PER_HOUR;

  const hSecs = Math.floor(secs) % SECS_PER_MIN;
  const hMins = Math.floor(mins) % MINS_PER_HOUR;
  const hHours = Math.floor(hours);

  return (
    (hHours < 10 ? '0' : '') +
    hHours +
    ':' +
    (hMins < 10 ? '0' : '') +
    hMins +
    ':' +
    (hSecs < 10 ? '0' : '') +
    hSecs
  );
}

function percentOfToday(time, start) {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  const compareTo = start > midnight ? start : midnight;
  return (
    Math.floor(
      ((time - compareTo) /
        (HOURS_PER_DAY * MINS_PER_HOUR * SECS_PER_MIN * MILLIS_PER_SEC)) *
        10000,
    ) / 100
  );
}

const styles = StyleSheet.create({
  currentActivity: {
    alignItems: 'center',
    backgroundColor: '#111111',
    elevation: 5,
    flexDirection: 'row',
    minHeight: 72,
    padding: 8,
  },
  currentActivityText: {
    color: theme.textColorPrimary,
    fontSize: theme.fontSizeTitle,
    paddingStart: 8,
  },
  currentActivityTimer: {
    color: theme.textColorPrimary,
    fontSize: theme.fontSizeNormal,
    paddingStart: 8,
  },
});

export default Home;
