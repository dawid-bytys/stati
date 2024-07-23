import { WelcomeScreen } from '@/features/auth/welcome/screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackScreens } from './types';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AuthStackScreens.Welcome} component={WelcomeScreen} options={{ animation: 'fade' }} />
    </Stack.Navigator>
  );
}
