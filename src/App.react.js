/**
 * @format
 * @flow
 */

import * as React from 'react';
import EditActivitiesScreen from 'screens/edit_activities/EditActivitiesScreen.react';
import HomeScreen from 'screens/home/HomeScreen.react';
import MenuNavigator from 'MenuNavigator.react';
import {SafeAreaView} from 'react-native';

const {useReducer, useContext, createContext} = React;

export type ActivityType = {
  id: number,
  name: string,
};

type ActivityContext = {
  id: number,
  name: string,
};

type Activity = {
  id: number,
  type: ActivityType,
  context?: ActivityContext,
  start: Date,
  end: Date,
};

type State = {
  activityTypes: Map<number, ActivityType>,
  activityContexts: Map<number, ActivityContext>,
  activities: Map<number, Activity>,
};

type Action = {type: 'edit_activity_type', activityType: ActivityType};

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case 'edit_activity_type':
      return {
        ...state,
        activityTypes: new Map([
          ...state.activityTypes.entries(),
          [action.activityType.id, action.activityType],
        ]),
      };
  }
  throw new Error('Unsupported action: ' + action.type);
}

function App(): React.Element<typeof SafeAreaView> {
  const [state, dispatch] = useReducer<State, Action>(appReducer, {
    activityTypes: new Map<number, ActivityType>(),
    activityContexts: new Map<number, ActivityContext>(),
    activities: new Map<number, Activity>(),
  });
  return (
    <SafeAreaView>
      <Context.Provider
        value={{
          state,
          dispatch,
        }}>
        <MenuNavigator initialRoute="edit_activities">
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
