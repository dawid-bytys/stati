import { BACKGROUND_COLOR } from '@/common/colors';
import { Navigation } from '@/navigation';
import { clientPersister, queryClient } from '@/network/react-query-client';
import { AuthProvider } from '@/providers/auth';
import { InAppNotificationProvider } from '@/providers/in-app-notification';
import { InternetConnectionProvider } from '@/providers/internet-connection';
import { LoadingOverlayProvider } from '@/providers/loading-overlay';
import { ModalProvider } from '@/providers/modal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import React from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { EventProvider } from 'react-native-outside-press';
import { SafeAreaProvider } from 'react-native-safe-area-context';

LogBox.ignoreAllLogs();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: BACKGROUND_COLOR,
  },
};

export function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: clientPersister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => !query.queryKey.includes('webAccessToken'),
        },
      }}>
      <EventProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <SafeAreaProvider style={{ backgroundColor: BACKGROUND_COLOR }}>
              <NavigationContainer theme={theme}>
                <LoadingOverlayProvider>
                  <InternetConnectionProvider>
                    <InAppNotificationProvider>
                      <AuthProvider>
                        <ModalProvider>
                          <Navigation />
                        </ModalProvider>
                      </AuthProvider>
                    </InAppNotificationProvider>
                  </InternetConnectionProvider>
                </LoadingOverlayProvider>
              </NavigationContainer>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </EventProvider>
    </PersistQueryClientProvider>
  );
}
