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
import reducer from 'reducer';
import testData from 'test_data/root';
import type {Action, State} from 'reducer';
import type {Activity, ActivityContext, ActivityType} from 'types';

const {useReducer, useContext, createContext} = React;

function App(): React.Element<typeof SafeAreaView> {
  const [state, dispatch] = useReducer<State, Action>(
    reducer,
    config.isDev
      ? testData
      : {
          activities: new Map<number, Activity>(),
          activityContexts: new Map<number, ActivityContext>(),
          activityTypes: new Map<number, ActivityType>(),
        },
  );
  return (
    <SafeAreaView>
      <Context.Provider
        value={{
          dispatch,
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
