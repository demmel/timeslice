/**
 * @format
 * @flow
 */

import * as React from 'react';

const {useState} = React;

function useConfig<TName: string, TConfig: {name: TName}>(
  configs: Array<TConfig>,
  initialConfig: TName,
): {
  config: TConfig,
  setConfig(TName): void,
} {
  const [configName, setConfigName] = useState<TName>(initialConfig);
  const configMap: {[TName]: TConfig} = configs.reduce((cs, c) => {
    cs[c.name] = {...c};
    return cs;
  }, {});
  const config = configMap[configName];
  if (config == null) {
    throw new Error('Config "' + configName + '" does not exist');
  }
  return {
    config,
    setConfig: setConfigName,
  };
}

export default useConfig;
