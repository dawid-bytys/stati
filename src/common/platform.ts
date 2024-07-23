import { Platform } from 'react-native';

interface PlatformStyle<T> {
  android: T;
  ios: T;
}

export const IS_ANDROID = Platform.OS === 'android';

export function platformStyle<T>({ android, ios }: PlatformStyle<T>): T {
  return IS_ANDROID ? android : ios;
}
