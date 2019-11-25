/**
 * @format
 * @flow
 */

import * as React from 'react';
import Home from './Home.react';
import Welcome from './Welcome.react';
import {useAppContext} from 'App.react';

function HomeScreen(): React.Element<typeof React.Fragment> {
  const {state} = useAppContext();
  return state.activityTypes.size > 0 ? <Home /> : <Welcome />;
}

export default HomeScreen;
