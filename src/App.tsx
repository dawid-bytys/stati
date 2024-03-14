import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Router } from '@/navigation/Router';
import { AuthContextProvider } from '@/providers/AuthContextProvider';
import { NotificationContextProvider } from '@/providers/NotificationContextProvider';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
    text: '#fff',
  },
};

export function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
          <NavigationContainer theme={MyTheme}>
            <NotificationContextProvider>
              <AuthContextProvider>
                <BottomSheetModalProvider>
                  <Router />
                </BottomSheetModalProvider>
              </AuthContextProvider>
            </NotificationContextProvider>
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
