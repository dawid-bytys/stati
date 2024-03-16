import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NoConnectionScreen } from '@/screens/NoConnectionScreen/NoConnectionScreen';
import type { NetInfoConfiguration } from '@react-native-community/netinfo';
import type { PropsWithChildren } from 'react';

const configuration: NetInfoConfiguration = {
  reachabilityUrl: 'https://clients3.google.com/generate_204',
  reachabilityTest: async (response) => response.status === 204,
  reachabilityLongTimeout: 60 * 1000,
  reachabilityShortTimeout: 5 * 1000,
  reachabilityRequestTimeout: 15 * 1000,
  reachabilityShouldRun: () => true,
  shouldFetchWiFiSSID: true,
  useNativeReachability: false,
};

export function InternetConnectionProvider({ children }: PropsWithChildren) {
  const { isConnected } = useNetInfo(configuration);

  if (isConnected === false) {
    SplashScreen.hide();
    return <NoConnectionScreen />;
  }

  return <>{children}</>;
}
