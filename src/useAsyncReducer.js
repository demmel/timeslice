/*
 * @flow
 * @format
 */

import * as React from 'react';
const {useReducer, useCallback, useEffect} = React;

export type AsyncError = 'unknown';

export type AsyncState<S> =
  | {
      status: 'ready',
      value: S,
      prevValue: null,
    }
  | {
      status: 'busy',
      value: S,
      prevValue: S,
    }
  | {
      status: 'error',
      value: S,
      error: AsyncError,
      prevValue: null,
    };

type AsyncAction<S, A> =
  | {
      type: 'start',
      action: A,
    }
  | {
      type: 'finish',
    }
  | {
      type: 'fail',
      prevValue: S,
      error: AsyncError,
    };

function useAysncReducer<S, A>(
  asyncAction: S => Promise<void>,
  reducer: (S, A) => S,
  initialState: S,
): [AsyncState<S>, (A) => void] {
  const persistReducer = useCallback(
    function(state: AsyncState<S>, action: AsyncAction<S, A>): AsyncState<S> {
      switch (action.type) {
        case 'start':
          return {
            prevValue: state.value,
            status: 'busy',
            value: reducer(state.value, action.action),
          };
        case 'finish':
          return {
            prevValue: null,
            status: 'ready',
            value: state.value,
          };
        case 'fail':
          return {
            error: action.error,
            prevValue: null,
            status: 'error',
            value: action.prevValue,
          };
        default:
          (action.type: empty);
          throw new Error('Unsupported action: ' + action.type);
      }
    },
    [reducer],
  );

  const [state, persistDispatch] = useReducer(persistReducer, {
    prevValue: null,
    status: 'ready',
    value: initialState,
  });

  useEffect(() => {
    if (state.status === 'busy') {
      asyncAction(state.value)
        .then(() => {
          persistDispatch({
            type: 'finish',
          });
        })
        .catch(_ => {
          persistDispatch({
            error: 'unknown',
            prevValue: state.prevValue,
            type: 'fail',
          });
        });
    }
  }, [asyncAction, state.prevValue, state.status, state.value]);

  function dispatch(action: A) {
    persistDispatch({
      action: action,
      type: 'start',
    });
  }

  return [state, dispatch];
}

export default useAysncReducer;
