/*
 * @flow
 * @format
 */

import * as React from 'react';
import reducer from 'reducer';
import storage from 'storage';
import type {Action, State} from 'reducer';
import type {ActivityType} from 'types';

const {useReducer} = React;

export default function useAppAPI(initialState: State) {
  const [state, dispatch] = useReducer<State, Action>(reducer, initialState);

  function addActivityType(activityType: $Diff<ActivityType, {id: number}>) {
    const id = Math.max(0, ...state.activityTypes.keys()) + 1;
    const activityTypeWithId = {...activityType, id};
    storage
      .set(
        'activityTypes',
        JSON.stringify([
          ...state.activityTypes.entries(),
          [id, activityTypeWithId],
        ]),
      )
      .then(() => {
        dispatch({
          activityType: activityTypeWithId,
          type: 'edit_activity_type',
        });
      });
  }

  function editActivityType(activityType: ActivityType) {
    storage
      .set('activityTypes', JSON.stringify([
        ...state.activityTypes.entries(),
        [activityType.id, activityType],
      ]))
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
