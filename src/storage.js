/*
 * @flow
 * @format
 */

import AsyncStorageFactory from '@react-native-community/async-storage';
import LegacyStorage from '@react-native-community/async-storage-backend-legacy';
import type {Activity, ActivityContext, ActivityType} from 'types';

type MyModel = {
  activityTypes: Map<number, ActivityType>,
  activityContexts: Map<number, ActivityContext>,
  activities: Map<number, Activity>,
};

const legacyStorage = new LegacyStorage();

const storage = AsyncStorageFactory.create<MyModel>(legacyStorage);

export default storage;
