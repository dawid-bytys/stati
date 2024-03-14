import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View } from 'react-native';
import ChartIcon from '@/assets/svg/chart.svg';
import FriendIcon from '@/assets/svg/friends.svg';
import HomeIcon from '@/assets/svg/home.svg';
import { FriendsActivityScreen } from '@/screens/FriendsActivityScreen/FriendsActivityScreen';
import { HomeScreen } from '@/screens/HomeScreen/HomeScreen';
import { TopScreen } from '@/screens/TopScreen';
import type { TabNavigatorParamList } from '@/types/types';
import type { PropsWithChildren } from 'react';

const Tab = createMaterialTopTabNavigator<TabNavigatorParamList>();

export function Tabs() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      backBehavior="history"
      screenOptions={{
        lazy: true,
        swipeEnabled: false,
        tabBarStyle: {
          padding: 0,
          backgroundColor: '#121212',
          borderTopColor: '#2A2A2A',
          borderTopWidth: 1,
          height: 65,
        },
        tabBarLabelStyle: {
          textTransform: 'none',
          fontFamily: 'Poppins-Medium',
          fontSize: 10,
          width: '100%',
          alignSelf: 'center',
        },
        tabBarInactiveTintColor: '#2A2A2A',
        tabBarActiveTintColor: '#8B8888',
        tabBarIndicatorStyle: {
          display: 'none',
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <IconContainer>
              <HomeIcon fill={color} />
            </IconContainer>
          ),
        }}
        component={HomeScreen}
        name="Home"
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <IconContainer>
              <ChartIcon fill={color} />
            </IconContainer>
          ),
        }}
        component={TopScreen}
        name="Top"
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <IconContainer>
              <FriendIcon fill={color} />
            </IconContainer>
          ),
        }}
        component={FriendsActivityScreen}
        name="Friends' activity"
      />
    </Tab.Navigator>
  );
}

function IconContainer({ children }: PropsWithChildren) {
  return <View style={styles.iconContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
