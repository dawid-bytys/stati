import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '@/screens/LoginScreen/LoginScreen'
import { RegisterScreen } from '@/screens/RegisterScreen/RegisterScreen'
import { WelcomeScreen } from '@/screens/WelcomeScreen/WelcomeScreen'
import type { AuthStackParamList } from '@/types/types'

const Stack = createNativeStackNavigator<AuthStackParamList>()

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
      <Stack.Screen
        component={RegisterScreen}
        name="Register"
      />
      <Stack.Screen
        component={LoginScreen}
        name="Login"
      />
    </Stack.Navigator>
  )
}
