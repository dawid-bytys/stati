import type { TabNavigatorParamList } from '@/types';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FriendsActivityScreen } from '@/screens/FriendsActivityScreen';
import { StyleSheet, View, Text } from 'react-native';
import { SearchScreen } from '@/screens/SearchScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import FriendIcon from '@/assets/svg/friends.svg';
import SearchIcon from '@/assets/svg/search.svg';
import { TopScreen } from '@/screens/TopScreen';
import ChartIcon from '@/assets/svg/chart.svg';
import HomeIcon from '@/assets/svg/home.svg';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

interface TabButtonProps {
  screenName: string;
  isFocused: boolean;
  iconName: string;
}

function TabButton({ screenName, isFocused, iconName }: TabButtonProps) {
  return (
    <View style={styles.container}>
      {getTabIcon(isFocused, iconName)}
      <Text
        style={{
          ...styles.screenNameText,
          color: isFocused ? '#8B8888' : '#2A2A2A',
        }}
      >
        {screenName}
      </Text>
    </View>
  );
}

export function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopColor: '#2A2A2A',
          paddingTop: 10,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabButton
              isFocused={focused}
              screenName="Home"
              iconName="Home"
            />
          ),
        }}
        component={HomeScreen}
        name="Home"
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabButton
              isFocused={focused}
              screenName="Top"
              iconName="Chart"
            />
          ),
        }}
        component={TopScreen}
        name="Top"
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabButton
              screenName="Friends activity"
              isFocused={focused}
              iconName="Friends"
            />
          ),
        }}
        component={FriendsActivityScreen}
        name="Friends"
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabButton
              screenName="Search"
              isFocused={focused}
              iconName="Search"
            />
          ),
        }}
        component={SearchScreen}
        name="Search"
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screenNameText: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: 3,
    fontSize: 8,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function getTabIcon(isFocused: boolean, iconName: string) {
  const color = isFocused ? '#8B8888' : '#2A2A2A';

  switch (iconName) {
    case 'Home':
      return <HomeIcon fill={color} />;
    case 'Chart':
      return <ChartIcon fill={color} />;
    case 'Friends':
      return <FriendIcon fill={color} />;
    case 'Search':
      return <SearchIcon fill={color} />;
    default:
      return null;
  }
}
