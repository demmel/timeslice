/**
 * @format
 * @flow
 */

import * as React from 'react';
import {SafeAreaView} from 'react-native';
import EditActivitiesScreen from 'screens/edit_activities/EditActivitiesScreen.react';
import HomeScreen from 'screens/home/HomeScreen.react';
import MenuNavigator from 'MenuNavigator.react';

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
    activities: new Map<number, Activity>(),
    // new Map<number, ActivityType>(),
    activityContexts: new Map<number, ActivityContext>(),
    activityTypes: new Map([
      [1, {id: 1, name: 'test'}],
      [2, {id: 2, name: 'testa'}],
      [3, {id: 3, name: 'testafd'}],
      [4, {id: 4, name: 'testafdfds'}],
      [5, {id: 5, name: 'testafdfdsfds'}],
      [6, {id: 6, name: 'testafdfdsfdshgfsd'}],
      [7, {id: 7, name: 'testafdfdsfdshgfsdervds'}],
      [8, {id: 8, name: 'testafdfdsfdshgfsdervdsefdafdsfd'}],
      [9, {id: 9, name: 'testafdfdsfdshgfsde'}],
      [10, {id: 10, name: 'test'}],
      [11, {id: 11, name: 'test'}],
      [12, {id: 12, name: 'testfddddsfdsfdsfds'}],
      [13, {id: 13, name: 'testfddddsfdsfdsfds'}],
      [14, {id: 14, name: 'testfddddsfdsfdsfds'}],
    ]),
  });
  console.log(state.activityTypes);
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
