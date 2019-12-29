/*
 * @flow
 * @format
 */

import localStorage from 'storage/localStorage';
import type {State as ActivityTypesState} from 'reducers/activityTypesReducer';
import type {State as CurrentActivityState} from 'reducers/currentActivityReducer';

export type AppHydrationState = {
  activityTypes: ActivityTypesState,
  currentActivity: CurrentActivityState,
};

async function loadState(): Promise<AppHydrationState> {
  const {activityTypes, currentActivity} = await localStorage.getMultiple([
    'activityTypes',
    'currentActivity',
  ]);
  return {
    activityTypes:
      activityTypes != null
        ? deserializeActivityTypes(JSON.parse(activityTypes))
        : new Map(),
    currentActivity:
      currentActivity != null
        ? deserializeCurrentActivity(JSON.parse(currentActivity))
        : null,
  };
}

async function saveActivityTypes(
  activityTypes: ActivityTypesState,
): Promise<void> {
  localStorage.set(
    'activityTypes',
    JSON.stringify(serializeActivityTypes(activityTypes)),
  );
}

async function saveCurrentActivity(
  currentActivity: CurrentActivityState,
): Promise<void> {
  localStorage.set(
    'currentActivity',
    JSON.stringify(serializeCurrentActivity(currentActivity)),
  );
}

type StorageModel = {
  version: 0,
  activityTypes: ActivityTypesStorage,
  currentActivity: CurrentActivityStorage,
};

type ActivityTypesStorage = {
  [string]: {
    id: number,
    name: string,
  },
};

type CurrentActivityStorage = ?{
  typeID: number,
  start: number,
};

function serializeActivityTypes(
  activityTypes: ActivityTypesState,
): ActivityTypesStorage {
  return [...activityTypes.entries()].reduce((out, [id, activityType]) => {
    out[id] = activityType;
    return out;
  }, {});
}

function deserializeActivityTypes(
  activityTypes: ActivityTypesStorage,
): ActivityTypesState {
  return new Map(([...Object.entries(activityTypes).map(([id, data]) => [Number(id), data])]: any));
}

function serializeCurrentActivity(
  currentActivity: CurrentActivityState,
): CurrentActivityStorage {
  return currentActivity != null
    ? {start: currentActivity.start.getTime(), typeID: currentActivity.typeID}
    : null;
}

function deserializeCurrentActivity(
  currentActivity: CurrentActivityStorage,
): CurrentActivityState {
  return currentActivity != null
    ? {start: new Date(currentActivity.start), typeID: currentActivity.typeID}
    : null;
}

export default {
  loadState,
  saveActivityTypes,
  saveCurrentActivity,
};
