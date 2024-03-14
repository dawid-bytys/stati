import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TopArtistsScreen } from './TopArtistsScreen/TopArtistsScreen';
import { TopTracksScreen } from './TopTracksScreen/TopTracksScreen';

type TabNavigatorParamList = {
  '4 weeks': { period: 'short_term' };
  '6 months': { period: 'medium_term' };
  'all time': { period: 'long_term' };
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
          shadowColor: 'transparent',
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
        component={content === 'artists' ? TopArtistsScreen : TopTracksScreen}
        initialParams={{ period: 'short_term' }}
      />
      <ContentTabs.Screen
        name="6 months"
        component={content === 'artists' ? TopArtistsScreen : TopTracksScreen}
        initialParams={{ period: 'medium_term' }}
      />
      <ContentTabs.Screen
        name="all time"
        component={content === 'artists' ? TopArtistsScreen : TopTracksScreen}
        initialParams={{ period: 'long_term' }}
      />
    </ContentTabs.Navigator>
  );
}
