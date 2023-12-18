import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthContext } from '@/hooks/useAuthContext';
import { StyleSheet, View } from 'react-native';

import { AuthStack } from './AuthStack';
import { Tabs } from './Tabs';
import { useErrorContext } from '@/hooks/useErrorContext';
import { ErrorAlert } from '@/components/ErrorAlert';
import { Loading } from '@/components/Loading';

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
  const { errorMessage } = useErrorContext();
  const insets = useSafeAreaInsets();

  if (isAuthenticating) {
    return <Loading />;
  }

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
      }}
    >
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <NavigationContainer theme={MyTheme}>
        {isAuthenticated ? <Tabs /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
});
