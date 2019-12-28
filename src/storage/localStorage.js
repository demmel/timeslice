/*
 * @flow
 * @format
 */

import AsyncStorageFactory from '@react-native-community/async-storage';
import LegacyStorage from '@react-native-community/async-storage-backend-legacy';

const legacyStorage = new LegacyStorage();
const storage = AsyncStorageFactory.create(legacyStorage);

function set(key: string, value: any): Promise<void> {
  return storage.set(key, JSON.stringify(value));
}

function get(key: string): Promise<any> {
  return storage
    .get(key)
    .then(maybe => (maybe != null ? JSON.parse(maybe) : null));
}

function setMap<K, V>(key: string, map: Map<K, V>): Promise<void> {
  return storage.set(key, JSON.stringify([...map.entries()]));
}

function getMap<K, V>(key: string): Promise<?Map<K, V>> {
  return storage
    .get(key)
    .then(maybeMap =>
      maybeMap != null ? new Map(JSON.parse(maybeMap)) : null,
    );
}

function getMaps<K>(keys: Array<string>): Promise<{[string]: ?Map<K, any>}> {
  return storage.getMultiple(keys).then(result => {
    return Object.keys(result).reduce((acc, key) => {
      const cur = result[key];
      acc[key] = cur != null ? new Map(JSON.parse(cur)) : null;
      return acc;
    }, {});
  });
}

export default {
  get,
  getMap,
  getMaps,
  set,
  setMap,
};
