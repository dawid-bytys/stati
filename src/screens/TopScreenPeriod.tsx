import { TopContentScreen } from './TopContentScreen/TopContentScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

type TabNavigatorParamList = {
  '4 weeks': { period: 'short_term'; content: 'artists' | 'tracks' };
  '6 months': { period: 'medium_term'; content: 'artists' | 'tracks' };
  'all time': { period: 'long_term'; content: 'artists' | 'tracks' };
};

const ContentTabs = createMaterialTopTabNavigator<TabNavigatorParamList>();

interface TopScreenPeriodProps {
  route: {
    params: {
      content: 'artists' | 'tracks';
    };
  };
}

export function TopScreenPeriod({ route }: TopScreenPeriodProps) {
  const { content } = route.params;

  return (
    <ContentTabs.Navigator
      initialRouteName="4 weeks"
      screenOptions={{
        lazy: true,
        swipeEnabled: false,
        tabBarIconStyle: { display: 'none' },
        tabBarStyle: {
          backgroundColor: '#121212',
          marginHorizontal: 25,
          marginVertical: 20,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          textTransform: 'none',
        },
        tabBarIndicatorStyle: {
          borderRadius: 100,
          backgroundColor: '#2D2D2D',
          height: '100%',
        },
        tabBarItemStyle: {
          alignContent: 'center',
          justifyContent: 'center',
          padding: 0,
          minHeight: 30,
        },
      }}
    >
      <ContentTabs.Screen
        name="4 weeks"
        component={TopContentScreen}
        initialParams={{ content, period: 'short_term' }}
      />
      <ContentTabs.Screen
        name="6 months"
        component={TopContentScreen}
        initialParams={{ content, period: 'medium_term' }}
      />
      <ContentTabs.Screen
        name="all time"
        component={TopContentScreen}
        initialParams={{ content, period: 'long_term' }}
      />
    </ContentTabs.Navigator>
  );
}
