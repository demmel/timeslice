/*
 * @flow
 * @format
 */

import * as React from 'react';
import config from 'config';
import reducer from 'reducer';
import testData from 'test_data/root';
import type {Action, State} from 'reducer';
import type {Activity, ActivityContext, ActivityType} from 'types';

const {useReducer} = React;

export default function useAppAPI() {
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

  function addActivityType(activityType: $Diff<ActivityType, {id: number}>) {
    const id = Math.max(0, ...state.activityTypes.keys()) + 1;
    dispatch({
      activityType: {...activityType, id},
      type: 'edit_activity_type',
    });
  }

  function editActivityType(activityType: ActivityType) {
    dispatch({
      activityType,
      type: 'edit_activity_type',
    });
  }

  return {
    api: {
      addActivityType,
      editActivityType,
    },
    state,
  };
}
