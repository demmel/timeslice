/**
 * @format
 * @flow
 */

export type ActivityType = {
  id: number,
  name: string,
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
