/**
 * @format
 * @flow
 */

import * as React from 'react';
import {useAppContext} from 'App.react';
import Home from './Home.react';
import Welcome from './Welcome.react';

function HomeScreen(): React.Element<typeof React.Fragment> {
  const {state} = useAppContext();
  return state.activityTypes.value.size > 0 ? <Home /> : <Welcome />;
}

export default HomeScreen;
