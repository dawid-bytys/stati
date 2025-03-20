import { getIcon } from '@/common/icons';
import { FriendsActivityScreen } from '@/features/main/friends-activity/screen';
import { TopScreen } from '@/features/main/top/screen';
import { HomeDrawer } from '@/navigation/drawers/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabsScreens } from './types';
import type { BottomTabsParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={BottomTabsScreens.HomeDrawer}
      screenOptions={{
        animation: 'shift',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121212',
          height: 65 + insets.bottom,
          borderTopColor: '#2A2A2A',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
        },
        tabBarIconStyle: {
          marginTop: 5,
          marginBottom: 2,
        },
        tabBarInactiveTintColor: '#2A2A2A',
        tabBarActiveTintColor: '#8B8888',
      }}>
      <Tab.Screen
        name={BottomTabsScreens.HomeDrawer}
        component={HomeDrawer}
        options={{
          tabBarIcon: ({ color }) => getIcon('home', color),
        }}
      />
      <Tab.Screen
        name={BottomTabsScreens.Top}
        component={TopScreen}
        options={{
          tabBarIcon: ({ color }) => getIcon('chart', color),
        }}
      />
      <Tab.Screen
        name={BottomTabsScreens.FriendsActivity}
        component={FriendsActivityScreen}
        options={{
          tabBarIcon: ({ color }) => getIcon('friends', color),
        }}
      />
    </Tab.Navigator>
  );
}
