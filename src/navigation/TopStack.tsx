import { TopArtistsScreen } from '@/screens/TopArtistsScreen';
import { TopTracksScreen } from '@/screens/TopTracksScreen';
import type { TopStackParamList } from '@/types';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<TopStackParamList>();

export function TopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="TopArtists"
    >
      <Stack.Screen
        component={TopArtistsScreen}
        initialParams={{ period: 'short_term' }}
        name="TopArtists"
      />
      <Stack.Screen
        component={TopTracksScreen}
        initialParams={{ period: 'short_term' }}
        name="TopTracks"
      />
    </Stack.Navigator>
  );
}
