import { ApolloProvider } from '@apollo/client'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Router } from '@/navigation/Router'
import { AuthContextProvider } from '@/providers/AuthContextProvider'
import { NotificationContextProvider } from '@/providers/NotificationContextProvider'
import { client } from './apollo'
import { InternetConnectionProvider } from './providers/InternetConnectionProvider'
import { LoadingContextProvider } from './providers/LoadingContextProvider'
import { PushNotificationsProvider } from './providers/PushNotificationsProvider'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
    text: '#fff',
  },
}

export function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <NavigationContainer theme={MyTheme}>
              <NotificationContextProvider>
                <LoadingContextProvider>
                  <AuthContextProvider>
                    <BottomSheetModalProvider>
                      <InternetConnectionProvider>
                        <PushNotificationsProvider>
                          <Router />
                        </PushNotificationsProvider>
                      </InternetConnectionProvider>
                    </BottomSheetModalProvider>
                  </AuthContextProvider>
                </LoadingContextProvider>
              </NotificationContextProvider>
            </NavigationContainer>
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
