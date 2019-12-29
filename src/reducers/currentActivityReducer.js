/**
 * @format
 * @flow
 */

export type State = ?{
  typeID: number,
  start: Date,
};

export type Action = {type: 'set_current_activity', typeID: ?number};

function currentActivityReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set_current_activity':
      return action.typeID != null
        ? {
            start: new Date(),
            typeID: action.typeID,
          }
        : null;
    default:
      (action.type: empty);
      throw new Error('Unsupported action: ' + action.type);
  }
}

export default currentActivityReducer;
