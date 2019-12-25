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

export type Action = {type: 'edit_activity_type', activityType: ActivityType};

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
  }
  throw new Error('Unsupported action: ' + action.type);
}
