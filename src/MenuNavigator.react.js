/**
 * @format
 * @flow
 */

import * as React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Menu from 'Menu.react';
import useConfig from 'useConfig';

const {useEffect, useState} = React;

type RouteProps = {|
  name: string,
  title?: string,
  screen: React.ComponentType<{}>,
|};

function Route(props: RouteProps) {
  const {route} = useNavigationContext();
  return route.name === props.name ? <props.screen /> : null;
}

type Props = {
  children: React.ChildrenArray<React.Element<typeof Route>>,
  initialRoute: string,
};

function MenuNavigator({
  children,
  initialRoute,
}: Props): React.Element<typeof NavigationContext.Provider> {
  const routes = React.Children.map(children, c => c.props);
  const {config: route, setConfig: setRoute} = useConfig<string, RouteProps>(
    routes,
    initialRoute,
  );

  const [showMenu, setShowMenu] = useState(false);

  const menuTargetProgress = showMenu ? 1.0 : 0.0;
  const [menuProgress] = useState(new Animated.Value(menuTargetProgress));
  const [menuWidth, setMenuWidth] = useState(250);

  useEffect(() => {
    Animated.timing(menuProgress, {
      toValue: menuTargetProgress,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [menuProgress, menuTargetProgress]);

  return (
    <NavigationContext.Provider
      value={{
        route,
        navigate(name) {
          setRoute(name);
          setShowMenu(false);
        },
        toggleMenu() {
          setShowMenu(show => !show);
        },
      }}>
      <View style={styles.root}>
        {children}
        <View style={styles.menuLayer}>
          <Animated.View
            style={[
              styles.menu,
              {
                marginStart: Animated.multiply(
                  -menuWidth,
                  Animated.subtract(1, menuProgress),
                ),
              },
            ]}>
            <View
              onLayout={({
                nativeEvent: {
                  layout: {width},
                },
              }) => {
                setMenuWidth(width);
              }}>
              <Menu>
                {React.Children.map(children, item =>
                  item.props.title != null ? (
                    <Menu.Item
                      route={item.props.name}
                      title={item.props.title}
                      selected={route.name === item.props.name}
                    />
                  ) : null,
                )}
              </Menu>
            </View>
          </Animated.View>
          <TouchableNativeFeedback
            onPress={() => setShowMenu(false)}
            background={TouchableNativeFeedback.Ripple('white')}>
            <Animated.View
              pointerEvents={showMenu ? 'auto' : 'none'}
              style={[
                styles.menuOverlay,
                {opacity: Animated.multiply(0.75, menuProgress)},
              ]}
            />
          </TouchableNativeFeedback>
        </View>
      </View>
    </NavigationContext.Provider>
  );
}

const styles = StyleSheet.create({
  menu: {
    height: '100%',
    overflow: 'hidden',
  },
  menuLayer: {
    bottom: 0,
    flexDirection: 'row',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  menuOverlay: {
    backgroundColor: 'black',
    flex: 1,
  },
  root: {},
});

type NavigationContextType = {
  route: RouteProps,
  navigate(string): void,
  toggleMenu(): void,
};
const NavigationContext = React.createContext<?NavigationContextType>(null);
export function useNavigationContext() {
  const navContext = React.useContext(NavigationContext);
  if (navContext == null) {
    throw new Error(
      'Cannot use App NavigationContext outside of MenuNavigator rendering tree',
    );
  }
  return navContext;
}

MenuNavigator.Route = Route;

export default MenuNavigator;
