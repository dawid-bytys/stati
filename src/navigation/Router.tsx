import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useAuthContext } from '@/hooks/useAuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { AuthStack } from './AuthStack';
import { Tabs } from './Tabs';
import { useEffect } from 'react';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
    text: '#fff',
  },
};

export function Router() {
  const { isAuthenticated, isAuthenticating } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticating) {
      SplashScreen.hide();
    }
  }, [isAuthenticating]);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={MyTheme}>
        {isAuthenticated ? <Tabs /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
});
