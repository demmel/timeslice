/**
 * @format
 * @flow
 */

import * as React from 'react';
import EditActivitiesScreen from 'screens/edit_activities/EditActivitiesScreen.react';
import HomeScreen from 'screens/home/HomeScreen.react';
import {SafeAreaView} from 'react-native';
import useRoute from 'useRoute';

const {useReducer, useContext, createContext} = React;

const routes = Object.freeze({
  home: {
    screen: HomeScreen,
  },
  edit_activities: {
    screen: EditActivitiesScreen,
  },
});
export type RouteName = $Keys<typeof routes>;

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

  const {route, navigate} = useRoute<RouteName>(routes, 'home');

  return (
    <SafeAreaView>
      <NavigationContext.Provider
        value={{
          route,
          navigate,
        }}>
        <Context.Provider
          value={{
            state,
            dispatch,
          }}>
          <route.screen />
        </Context.Provider>
      </NavigationContext.Provider>
    </SafeAreaView>
  );
}

const NavigationContext = createContext(null);
const Context = createContext(null);

export function useNavigationContext() {
  const navContext = useContext(NavigationContext);
  if (navContext == null) {
    throw new Error(
      'Cannot use App NavigationContext outside of application rendering tree',
    );
  }
  return navContext;
}

export function useAppContext() {
  const appContext = useContext(Context);
  if (appContext == null) {
    throw new Error(
      'Cannot use App Context outside of application rendering tree',
    );
  }
  return appContext;
}

export default App;
