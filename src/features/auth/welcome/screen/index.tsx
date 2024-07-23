import { Button } from '@/common/button';
import { WelcomeIcon } from '@/common/svgs';
import { useAuthMutation } from '@/network/mutations/spotify';
import { SpotifyService } from '@/network/services/spotify';
import { SafeAreaView, Text, View } from 'react-native';
import { Config } from 'react-native-config';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import pkceChallenge from 'react-native-pkce-challenge';
import { styles } from './styles';
import type { RedirectResult } from 'react-native-inappbrowser-reborn';

export function WelcomeScreen() {
  const { mutate: fetchTokens } = useAuthMutation();

  async function handleLogin() {
    const { codeChallenge, codeVerifier } = pkceChallenge();
    const authUrl = SpotifyService.generateAuthUrl(codeChallenge);
    const { type, url } = (await InAppBrowser.openAuth(authUrl, Config.SPOTIFY_AUTH_CALLBACK_URL)) as RedirectResult;

    if (type !== 'success') {
      return;
    }

    const code = new URL(url).searchParams.get('code');

    if (!code) {
      return;
    }

    fetchTokens({
      code,
      codeVerifier,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <WelcomeIcon />
        <View style={styles.innerWrapper}>
          <Text style={styles.title}>Hello. 😊</Text>
          <Text style={styles.subtitle}>Explore your music taste in one place</Text>
          <Button title="Login with Spotify" onPress={handleLogin} style={styles.loginBtn} />
        </View>
      </View>
    </SafeAreaView>
  );
}
