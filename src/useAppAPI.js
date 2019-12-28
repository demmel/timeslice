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

  async function addActivityType(
    activityType: $Diff<ActivityType, {id: number}>,
  ) {
    const id = Math.max(0, ...state.activityTypes.keys()) + 1;
    const activityTypeWithId = {...activityType, id};
    await localStorage.setMap(
      'activityTypes',
      new Map([...state.activityTypes.entries(), [id, activityTypeWithId]]),
    );
    dispatch({
      activityType: activityTypeWithId,
      type: 'edit_activity_type',
    });
  }

  async function editActivityType(activityType: ActivityType) {
    await localStorage.setMap(
      'activityTypes',
      new Map([
        ...state.activityTypes.entries(),
        [activityType.id, activityType],
      ]),
    );
    dispatch({
      activityType,
      type: 'edit_activity_type',
    });
  }

  async function removeActivityType(id: number) {
    await localStorage.setMap(
      'activityTypes',
      new Map([
        ...[...state.activityTypes.entries()].filter(
          ([savedID, _]) => id !== savedID,
        ),
      ]),
    );
    dispatch({
      id,
      type: 'remove_activity_type',
    });
  }

  async function setCurrentActivity(typeID: ?number) {
    await localStorage.set(
      'currentActivity',
      typeID != null
        ? {
            start: new Date(),
            typeID,
          }
        : null,
    );
    dispatch({
      type: 'set_current_activity',
      typeID,
    });
  }

  return {
    api: {
      addActivityType,
      editActivityType,
      removeActivityType,
      setCurrentActivity,
    },
    state,
  };
}
