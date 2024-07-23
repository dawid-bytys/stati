import { HomeScreen } from '@/features/main/home/screen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../components/drawer-content';
import { HomeDrawerScreens } from './types';
import type { HomeDrawerParamList } from './types';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export function HomeDrawer() {
  return (
    <Drawer.Navigator
      detachInactiveScreens={true}
      drawerContent={() => <DrawerContent />} // eslint-disable-line react/no-unstable-nested-components
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: '50%',
          backgroundColor: 'transparent',
        },
        overlayColor: 'transparent',
      }}>
      <Drawer.Screen name={HomeDrawerScreens.Home} component={HomeScreen} />
    </Drawer.Navigator>
  );
}
