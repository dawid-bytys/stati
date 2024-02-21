import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FriendsActivityScreen } from '@/screens/FriendsActivityScreen';
import { StyleSheet, View, Text } from 'react-native';
import { SearchScreen } from '@/screens/SearchScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import FriendIcon from '@/assets/svg/friends.svg';
import SearchIcon from '@/assets/svg/search.svg';
import { TopScreen } from '@/screens/TopScreen';
import ChartIcon from '@/assets/svg/chart.svg';
import HomeIcon from '@/assets/svg/home.svg';
import { TabNavigatorParamList } from '@/types';

const Tab = createMaterialTopTabNavigator<TabNavigatorParamList>();

export function Tabs() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        lazy: true,
        swipeEnabled: false,
        tabBarStyle: {
          padding: 0,
          backgroundColor: '#121212',
          borderTopColor: '#2A2A2A',
          borderTopWidth: 1,
          height: 60,
        },
        tabBarLabelStyle: {
          textTransform: 'none',
          fontFamily: 'Poppins-Medium',
          fontSize: 10,
          marginTop: 5,
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
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <IconContainer>
              <SearchIcon fill={color} />
            </IconContainer>
          ),
        }}
        component={SearchScreen}
        name="Search"
      />
    </Tab.Navigator>
  );
}

function IconContainer({ children }: { children: React.ReactNode }) {
  return <View style={styles.iconContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
