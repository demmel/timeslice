/**
 * @format
 * @flow
 */

import * as React from 'react';

const {useState} = React;

type RouteConfig<TRouteName> = {|
  name: TRouteName,
  screen: React.ComponentType<{}>,
|};

function useRoute<TRouteName: string>(
  routes: {[TRouteName]: $Diff<RouteConfig<TRouteName>, {name: TRouteName}>},
  initialRoute: TRouteName,
): {
  route: RouteConfig<TRouteName>,
  navigate(TRouteName): void,
} {
  const [route, setRoute] = useState<TRouteName>(initialRoute);
  const routeConfigs: {[TRouteName]: RouteConfig<TRouteName>} = Object.keys(
    routes,
  ).reduce((configs, name) => {
    configs[name] = {...routes[name], name};
    return configs;
  }, {});
  const routeConfig = routeConfigs[route];
  if (routeConfig == null) {
    throw new Error('Route "' + route + '" does not exist');
  }
  return {
    route: {...routeConfig, name: route},
    navigate: setRoute,
  };
}

export default useRoute;
