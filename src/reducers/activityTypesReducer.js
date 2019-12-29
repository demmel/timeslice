/**
 * @format
 * @flow
 */

import type {ActivityType} from 'types';

export type State = Map<number, ActivityType>;

export type Action =
  | {type: 'edit_activity_type', activityType: ActivityType}
  | {type: 'remove_activity_type', id: number};

function activityTypesReducer(activityTypes: State, action: Action): State {
  switch (action.type) {
    case 'edit_activity_type':
      return new Map<number, ActivityType>([
        ...activityTypes.entries(),
        [action.activityType.id, action.activityType],
      ]);
    case 'remove_activity_type':
      const out = new Map<number, ActivityType>([
        ...[...activityTypes.entries()].filter(([id, _]) => {
          console.log(action.id, id);
          return action.id !== id;
        }),
      ]);
      console.log(out);
      return out;
    default:
      (action.type: empty);
      throw new Error('Unsupported action: ' + action.type);
  }
}

export default activityTypesReducer;
