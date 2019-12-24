/**
 * @format
 * @flow
 */

import * as React from 'react';
import {ScrollView, Text} from 'react-native';
import {useAppContext} from 'App.react';
import ActivityGrid from 'components/ActivityGrid.react';
import ScreenWithMenuToggle from 'ScreenWithMenuToggle.react';
import appStyles from 'styles';

const {useState} = React;

function Home(): React.Element<typeof ScreenWithMenuToggle> {
  const {
    state: {activityTypes},
  } = useAppContext();
  const [currentActivityID, setCurrentActivityID] = useState(null);

  return (
    <ScreenWithMenuToggle
      toolbarContent={<Text style={appStyles.toolbarText}>Timeslice</Text>}>
      <ScrollView>
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
      </ScrollView>
    </ScreenWithMenuToggle>
  );
}

export default Home;
