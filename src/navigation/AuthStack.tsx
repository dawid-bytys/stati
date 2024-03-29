import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '@/screens/WelcomeScreen/WelcomeScreen';
import type { AuthStackParamList } from '@/types/types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen
        component={WelcomeScreen}
        name="Welcome"
      />
    </Stack.Navigator>
  );
}
