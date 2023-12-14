import type { FilteredFriendActivity } from '@/types';

import { FriendsActivityMain } from '@/components/FriendActivityMain/FriendsActivityMain';
import { getFriendsActivity, getWebAccessToken } from '@/domain/spotify';
import { SetCookieMain } from '@/components/SetCookieMain';
import { useAuthContext } from '@/hooks/useAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filterFriendsActivity } from '@/utils';
import { Loading } from '@/components/Loading';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { useErrorContext } from '@/hooks/useErrorContext';

export function FriendsActivityScreen() {
  const { setWebAccessToken, webAccessToken, spDcCookie, setSpDcCookie } = useAuthContext();
  const [friendsActivity, setFriendsActivity] = useState<FilteredFriendActivity[] | null>(null);
  const { setErrorMessage } = useErrorContext();

  useEffect(() => {
    async function obtainWebAccessToken(spDcCookie: string) {
      try {
        const { accessToken, isAnonymous } = await getWebAccessToken(spDcCookie);

        if (isAnonymous) {
          setSpDcCookie(null);
          await AsyncStorage.removeItem('spDcCookie');
          setErrorMessage('Invalid sp_dc cookie');
          return;
        }

        await AsyncStorage.setItem('webAccessToken', accessToken);
        setWebAccessToken(accessToken);
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    }

    if (spDcCookie && !webAccessToken && !friendsActivity) {
      obtainWebAccessToken(spDcCookie);
    }
  }, [spDcCookie, webAccessToken, friendsActivity]);

  useEffect(() => {
    async function obtainFriendsActivity(webAccessToken: string) {
      try {
        const friendsActivity = await getFriendsActivity(webAccessToken);
        const filteredFriendsActivity = filterFriendsActivity(friendsActivity);
        setFriendsActivity(filteredFriendsActivity);
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    }

    if (spDcCookie && webAccessToken && !friendsActivity) {
      obtainFriendsActivity(webAccessToken);
    }
  }, [spDcCookie, webAccessToken, friendsActivity]);

  if (!spDcCookie && !webAccessToken) {
    return <SetCookieMain />;
  }

  if (!friendsActivity) {
    return <Loading />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={!friendsActivity}
          onRefresh={() => setFriendsActivity(null)}
        />
      }
    >
      <FriendsActivityMain data={friendsActivity} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
});
