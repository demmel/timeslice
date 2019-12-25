/**
 * @format
 * @flow
 */

import type {Activity, ActivityContext, ActivityType} from 'types';

export default {
  activities: new Map<number, Activity>(),
  activityContexts: new Map<number, ActivityContext>(),
  activityTypes: new Map<number, ActivityType>([
    [1, {id: 1, name: 'Code'}],
    [2, {id: 2, name: 'Watch TV'}],
    [3, {id: 3, name: 'Play Game'}],
    [4, {id: 4, name: 'Make Food'}],
    [5, {id: 5, name: 'Eat'}],
    [6, {id: 6, name: 'Sleep'}],
    [7, {id: 7, name: 'Have Sex'}],
    [8, {id: 8, name: 'Masturbate'}],
    [9, {id: 9, name: 'Work Out'}],
    [10, {id: 10, name: 'Meet'}],
    [11, {id: 11, name: 'Plan'}],
    [12, {id: 12, name: 'Organize'}],
  ]),
};
