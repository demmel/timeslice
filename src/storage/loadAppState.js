/*
 * @flow
 * @format
 */

import localStorage from 'storage/localStorage';
import type {Activity, ActivityContext, ActivityType} from 'types';
import type {State} from 'reducer';

export default async function loadAppState(): Promise<State> {
  const {
    activities,
    activityContexts,
    activityTypes,
  } = await localStorage.getMaps([
    'activityTypes',
    'activityContexts',
    'activities',
  ]);
  const defaultState = {
    activities: new Map<number, Activity>(),
    activityContexts: new Map<number, ActivityContext>(),
    activityTypes: new Map<number, ActivityType>(),
  };
  return {
    activities: activities != null ? activities : defaultState.activities,
    activityContexts:
      activityContexts != null
        ? activityContexts
        : defaultState.activityContexts,
    activityTypes:
      activityTypes != null ? activityTypes : defaultState.activityTypes,
  };
}
