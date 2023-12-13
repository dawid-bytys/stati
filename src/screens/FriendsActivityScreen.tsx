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

export function FriendsActivityScreen() {
  const { setWebAccessToken, webAccessToken, spDcCookie, setSpDcCookie } = useAuthContext();
  const [friendsActivity, setFriendsActivity] = useState<FilteredFriendActivity[] | null>(null);

  useEffect(() => {
    async function obtainWebAccessToken(spDcCookie: string) {
      try {
        const { accessToken, isAnonymous } = await getWebAccessToken(spDcCookie);

        if (isAnonymous) {
          setSpDcCookie(null);
        }

        await AsyncStorage.setItem('webAccessToken', accessToken);
        setWebAccessToken(accessToken);
      } catch (err) {
        console.log(err);
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
        console.log(err);
      }
    }

    if (webAccessToken && !friendsActivity) {
      obtainFriendsActivity(webAccessToken);
    }
  }, [webAccessToken, friendsActivity]);

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
