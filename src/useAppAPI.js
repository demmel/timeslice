/*
 * @flow
 * @format
 */

import * as React from 'react';
import localStorage from 'storage/localStorage';
import reducer from 'reducer';
import type {Action, State} from 'reducer';
import type {ActivityType} from 'types';

const {useReducer} = React;

export default function useAppAPI(initialState: State) {
  const [state, dispatch] = useReducer<State, Action>(reducer, initialState);

  function addActivityType(activityType: $Diff<ActivityType, {id: number}>) {
    const id = Math.max(0, ...state.activityTypes.keys()) + 1;
    const activityTypeWithId = {...activityType, id};
    localStorage
      .setMap(
        'activityTypes',
        new Map([...state.activityTypes.entries(), [id, activityTypeWithId]]),
      )
      .then(() => {
        dispatch({
          activityType: activityTypeWithId,
          type: 'edit_activity_type',
        });
      });
  }

  function editActivityType(activityType: ActivityType) {
    localStorage
      .setMap(
        'activityTypes',
        new Map([
          ...state.activityTypes.entries(),
          [activityType.id, activityType],
        ]),
      )
      .then(() => {
        dispatch({
          activityType,
          type: 'edit_activity_type',
        });
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
