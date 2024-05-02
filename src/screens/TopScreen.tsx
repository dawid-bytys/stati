import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { TopScreenPeriod } from './TopScreenPeriod'

type ContentTabsParamList = {
  artists: { content: 'artists' }
  tracks: { content: 'tracks' }
}

const ContentTabs = createMaterialTopTabNavigator<ContentTabsParamList>()

export function TopScreen() {
  return (
    <ContentTabs.Navigator
      initialRouteName="artists"
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
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
          borderRadius: 50,
          backgroundColor: '#2D2D2D',
          height: '100%',
          width: '50%',
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
        name="artists"
        component={TopScreenPeriod}
        initialParams={{ content: 'artists' }}
      />
      <ContentTabs.Screen
        name="tracks"
        component={TopScreenPeriod}
        initialParams={{ content: 'tracks' }}
      />
    </ContentTabs.Navigator>
  )
}
