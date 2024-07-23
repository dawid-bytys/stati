import type { HomeDrawerParamList, HomeDrawerScreens } from '@/navigation/drawers/home/types';
import type { DrawerScreenProps } from '@react-navigation/drawer';

export type HomeScreenNavigationProps = DrawerScreenProps<HomeDrawerParamList, HomeDrawerScreens.Home>;
