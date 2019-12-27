/**
 * @format
 * @flow
 */

import type {Activity, ActivityContext, ActivityType} from 'types';

export type State = {
  activityTypes: Map<number, ActivityType>,
  activityContexts: Map<number, ActivityContext>,
  activities: Map<number, Activity>,
};

export type Action =
  | {type: 'edit_activity_type', activityType: ActivityType}
  | {type: 'remove_activity_type', id: number};

export default function appReducer(state: State, action: Action) {
  switch (action.type) {
    case 'edit_activity_type':
      return {
        ...state,
        activityTypes: new Map<number, ActivityType>([
          ...state.activityTypes.entries(),
          [action.activityType.id, action.activityType],
        ]),
      };
    case 'remove_activity_type':
      return {
        ...state,
        activityTypes: new Map<number, ActivityType>([
          ...[...state.activityTypes.entries()].filter(
            ([id, _]) => action.id !== id,
          ),
        ]),
      };
    default:
      (action.type: empty);
      throw new Error('Unsupported action: ' + action.type);
  }
}
