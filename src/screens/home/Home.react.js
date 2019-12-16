/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import ActivityGrid from 'components/ActivityGrid.react';
import ScreenWithMenuToggle from 'ScreenWithMenuToggle.react';
import {useAppContext} from 'App.react';

const {useState} = React;

function Home(): React.Element<typeof ScreenWithMenuToggle> {
  const {
    state: {activityTypes},
  } = useAppContext();
  const [currentActivityID, setCurrentActivityID] = useState(null);

  return (
    <ScreenWithMenuToggle
      toolbarContent={<Text style={styles.title}>Timeslice</Text>}>
      <ActivityGrid>
        <ActivityGrid.Item
          onPress={() => {
            setCurrentActivityID(null);
          }}
          icon="block"
          text="Untracked"
          selected={currentActivityID === null}
        />
        {[...activityTypes.values()].map(activityType => (
          <ActivityGrid.Item
            onPress={() => {
              setCurrentActivityID(activityType.id);
            }}
            key={activityType.id}
            text={activityType.name}
            selected={currentActivityID === activityType.id}
          />
        ))}
      </ActivityGrid>
    </ScreenWithMenuToggle>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default Home;
