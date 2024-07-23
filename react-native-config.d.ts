declare module 'react-native-config' {
  export interface NativeConfig {
    SPOTIFY_AUTH_CALLBACK_URL: string;
    SPOTIFY_CLIENT_ID: string;
  }

  export const Config: NativeConfig;
}
