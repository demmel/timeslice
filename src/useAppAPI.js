/*
 * @flow
 * @format
 */

import AppStorage from 'storage/AppStorage';
import activityTypesReducer from 'reducers/activityTypesReducer';
import currentActivityReducer from 'reducers/currentActivityReducer';
import useAsyncReducer from 'useAsyncReducer';
import type {ActivityType} from 'types';
import type {
  Action as ActivityTypesAction,
  State as ActivityTypesState,
} from 'reducers/activityTypesReducer';
import type {AppHydrationState} from 'storage/AppStorage';
import type {
  Action as CurrentActivityAction,
  State as CurrentActivityState,
} from 'reducers/currentActivityReducer';

export default function useAppAPI(hydrationState: AppHydrationState) {
  const [activityTypes, dispatchActivityTypes] = useAsyncReducer<
    ActivityTypesState,
    ActivityTypesAction,
  >(
    AppStorage.saveActivityTypes,
    activityTypesReducer,
    hydrationState.activityTypes,
  );
  const [currentActivity, dispatchCurrentActivity] = useAsyncReducer<
    CurrentActivityState,
    CurrentActivityAction,
  >(
    AppStorage.saveCurrentActivity,
    currentActivityReducer,
    hydrationState.currentActivity,
  );

  function addActivityType(activityType: $Diff<ActivityType, {id: number}>) {
    const id = Math.max(0, ...activityTypes.value.keys()) + 1;
    const activityTypeWithId = {...activityType, id};
    dispatchActivityTypes({
      activityType: activityTypeWithId,
      type: 'edit_activity_type',
    });
  }

  function editActivityType(activityType: ActivityType) {
    dispatchActivityTypes({
      activityType,
      type: 'edit_activity_type',
    });
  }

  function removeActivityType(id: number) {
    dispatchActivityTypes({
      id,
      type: 'remove_activity_type',
    });
  }

  function setCurrentActivity(typeID: ?number) {
    dispatchCurrentActivity({
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
    state: {
      activityTypes,
      currentActivity,
    },
  };
}
