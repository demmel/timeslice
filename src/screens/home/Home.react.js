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

function Home(): React.Element<typeof ScreenWithMenuToggle> {
  const {
    state: {currentActivity, activityTypes},
    api: {setCurrentActivity},
  } = useAppContext();

  return (
    <ScreenWithMenuToggle
      toolbarContent={<Text style={appStyles.toolbarText}>Timeslice</Text>}>
      <ScrollView>
        <ActivityGrid>
          <ActivityGrid.Item
            onPress={() => {
              setCurrentActivity(null);
            }}
            icon="block"
            text="Untracked"
            selected={currentActivity?.typeID == null}
          />
          {[...activityTypes.values()].map(activityType => (
            <ActivityGrid.Item
              onPress={() => {
                setCurrentActivity(activityType.id);
              }}
              key={activityType.id}
              text={activityType.name}
              selected={currentActivity?.typeID === activityType.id}
            />
          ))}
        </ActivityGrid>
      </ScrollView>
    </ScreenWithMenuToggle>
  );
}

export default Home;
