/**
 * @format
 * @flow
 */

import * as React from 'react';
import {SafeAreaView} from 'react-native';
import EditActivitiesScreen from 'screens/edit_activities/EditActivitiesScreen.react';
import HomeScreen from 'screens/home/HomeScreen.react';
import MenuNavigator from 'MenuNavigator.react';
import useAppAPI from 'useAppAPI';

const {useContext, createContext} = React;

function App(): React.Element<typeof SafeAreaView> {
  const {state, api} = useAppAPI();
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
