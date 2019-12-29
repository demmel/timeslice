/**
 * @format
 * @flow
 */

import type {AsyncState} from 'useAsyncReducer';
import type {MaterialIconsGlyphs} from 'react-native-vector-icons/MaterialIcons';

export type ActivityType = {
  id: number,
  name: string,
  icon?: MaterialIconsGlyphs,
};

export type ActivityContext = {
  id: number,
  name: string,
};

export type Activity = {
  id: number,
  type: ActivityType,
  context?: ActivityContext,
  start: Date,
  end: Date,
};

export type ActivityTracker = {
  typeID: number,
  start: Date,
};

export type AppState = {
  currentActivity: AsyncState<?ActivityTracker>,
  activityTypes: AsyncState<Map<number, ActivityType>>,
};
