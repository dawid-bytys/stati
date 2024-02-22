import type { FilteredFriendActivity } from '@/types';
import { fetchFriendsActivity, fetchWebAccessToken } from '@/domain/spotify';
import { SetCookieMain } from '@/components/SetCookieMain';
import { useAuthContext } from '@/hooks/useAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filterFriendsActivity } from '@/utils';
import { Loading } from '@/components/Loading';
import { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, FlatList } from 'react-native';
import { useErrorContext } from '@/hooks/useErrorContext';
import { FriendTile } from '@/components/FriendTile';

export function FriendsActivityScreen() {
  const { setWebAccessToken, webAccessToken, spDcCookie, setSpDcCookie } = useAuthContext();
  const [friendsActivity, setFriendsActivity] = useState<FilteredFriendActivity[] | null>(null);
  const { setErrorMessage } = useErrorContext();

  useEffect(() => {
    async function obtainWebAccessToken() {
      try {
        const response = await fetchWebAccessToken(spDcCookie);

        if (response.isAnonymous) {
          setSpDcCookie('');
          await AsyncStorage.removeItem('spDcCookie');
          setErrorMessage('Invalid sp_dc cookie');
          return;
        }

        const newWebAccessToken = {
          value: response.accessToken,
          expirationTimestamp: response.accessTokenExpirationTimestampMs,
        };

        await AsyncStorage.setItem('webAccessToken', JSON.stringify(newWebAccessToken));
        setWebAccessToken(newWebAccessToken);
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    }

    if (spDcCookie && !webAccessToken) {
      obtainWebAccessToken();
    }
  }, [spDcCookie, webAccessToken]);

  useEffect(() => {
    async function obtainFriendsActivity() {
      try {
        const friendsActivity = await fetchFriendsActivity(webAccessToken);
        const filteredFriendsActivity = filterFriendsActivity(friendsActivity);
        setFriendsActivity(filteredFriendsActivity);
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    }

    if (spDcCookie && webAccessToken && !friendsActivity) {
      obtainFriendsActivity();
    }
  }, [spDcCookie, webAccessToken, friendsActivity]);

  if (!spDcCookie && !webAccessToken) {
    return <SetCookieMain />;
  }

  if (!friendsActivity) {
    return <Loading />;
  }

  return (
    <FlatList
      style={styles.container}
      data={friendsActivity}
      contentContainerStyle={{ gap: 40, paddingBottom: 55 }}
      keyExtractor={({ name }) => name}
      refreshControl={
        <RefreshControl
          refreshing={friendsActivity === null}
          onRefresh={() => {
            setFriendsActivity(null);
          }}
        />
      }
      renderItem={({ item, index }) => (
        <FriendTile
          {...item}
          delay={index * 100}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
});
