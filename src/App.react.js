/**
 * @format
 * @flow
 */

import * as React from 'react';
import {SafeAreaView} from 'react-native';
import EditActivitiesScreen from 'screens/edit_activities/EditActivitiesScreen.react';
import HomeScreen from 'screens/home/HomeScreen.react';
import MenuNavigator from 'MenuNavigator.react';
import config from 'config';
import storage from 'storage';
import testData from 'test_data/root';
import useAppAPI from 'useAppAPI';
import type {Activity, ActivityContext, ActivityType} from 'types';
import type {State} from 'reducer';

const {useEffect, useContext, createContext, useState} = React;

function App(): React.Element<typeof LoadedApp | typeof SafeAreaView> {
  const [initialState, setInitialState] = useState<?State>(null);

  useEffect(() => {
    storage
      .getMultiple(['activityTypes', 'activityContexts', 'activities'])
      .then(({activities, activityContexts, activityTypes}) => {
        const defaultState = config.isDev
          ? testData
          : {
              activities: new Map<number, Activity>(),
              activityContexts: new Map<number, ActivityContext>(),
              activityTypes: new Map<number, ActivityType>(),
            };
        setInitialState({
          activities:
            activities != null
              ? new Map(JSON.parse(activities))
              : defaultState.activities,
          activityContexts:
            activityContexts != null
              ? new Map(JSON.parse(activityContexts))
              : defaultState.activityContexts,
          activityTypes:
            activityTypes != null
              ? new Map(JSON.parse(activityTypes))
              : defaultState.activityTypes,
        });
      })
      .catch(e => console.warn(e));
  }, []);

  if (initialState == null) {
    return <SafeAreaView />;
  }

  return <LoadedApp initialState={initialState} />;
}

function LoadedApp({initialState}: {initialState: State}) {
  const {state, api} = useAppAPI(initialState);
  return (
    <SafeAreaView>
      <Context.Provider
        value={{
          api,
          state,
        }}>
        <MenuNavigator initialRoute="home">
          <MenuNavigator.Route name="home" screen={HomeScreen} title="Home" />
          <MenuNavigator.Route
            name="edit_activities"
            screen={EditActivitiesScreen}
            title="Edit Activities"
          />
        </MenuNavigator>
      </Context.Provider>
    </SafeAreaView>
  );
}

const Context = createContext(null);
export function useAppContext() {
  const appContext = useContext(Context);
  if (appContext == null) {
    throw new Error('Cannot use App Context outside of App rendering tree');
  }
  return appContext;
}

export default App;
