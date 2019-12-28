/**
 * @format
 * @flow
 */

import type {Activity, ActivityContext, ActivityType} from 'types';

export type State = {
  currentActivity: ?{
    typeID: number,
    start: Date,
  },
  activityTypes: Map<number, ActivityType>,
  activityContexts: Map<number, ActivityContext>,
  activities: Map<number, Activity>,
};

export type Action =
  | {type: 'edit_activity_type', activityType: ActivityType}
  | {type: 'remove_activity_type', id: number}
  | {type: 'set_current_activity', typeID: ?number};

export default function appReducer(state: State, action: Action): State {
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
    case 'set_current_activity':
      return {
        ...state,
        currentActivity:
          action.typeID != null
            ? {
                start: new Date(),
                typeID: action.typeID,
              }
            : null,
      };
    default:
      (action.type: empty);
      throw new Error('Unsupported action: ' + action.type);
  }
}
