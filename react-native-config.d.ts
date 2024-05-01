declare module 'react-native-config' {
  export interface NativeConfig {
    SPOTIFY_AUTH_CALLBACK_URL: string
    SPOTIFY_CLIENT_ID: string
    GRAPHQL_URL: string
  }

  export const Config: NativeConfig
}
