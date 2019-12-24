/**
 * @format
 * @flow
 */

import * as React from 'react';
import {useNavigationContext} from 'MenuNavigator.react';
import ScreenWithToolbar from 'ScreenWithToolbar.react';

type Props = {
  children: React.Node,
  toolbarContent: React.Node,
};

function ScreenWithMenuToggle({
  children,
  toolbarContent,
}: Props): React.Element<typeof ScreenWithToolbar> {
  const {toggleMenu} = useNavigationContext();
  return (
    <ScreenWithToolbar
      toolbarContent={toolbarContent}
      toolbarButton={{icon: 'menu', onPress: toggleMenu}}>
      {children}
    </ScreenWithToolbar>
  );
}

export default ScreenWithMenuToggle;
