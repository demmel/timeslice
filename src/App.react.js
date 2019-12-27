/**
 * @format
 * @flow
 */

import * as React from 'react';
import {SafeAreaView} from 'react-native';
import EditActivitiesScreen from 'screens/edit_activities/EditActivitiesScreen.react';
import HomeScreen from 'screens/home/HomeScreen.react';
import MenuNavigator from 'MenuNavigator.react';
import loadAppState from 'storage/loadAppState';
import useAppAPI from 'useAppAPI';
import type {State} from 'reducer';

const {useEffect, useContext, createContext, useState} = React;

function App(): React.Element<typeof LoadedApp | typeof SafeAreaView> {
  const [initialState, setInitialState] = useState<?State>(null);

  useEffect(() => {
    loadAppState().then(state => setInitialState(state));
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
