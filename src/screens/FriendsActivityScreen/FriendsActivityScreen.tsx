import type { FilteredFriendActivity } from '@/types';
import { fetchFriendsActivity, fetchWebAccessToken } from '@/domain/spotify';
import { SetCookieMain } from '@/components/SetCookieMain/SetCookieMain';
import { filterFriendsActivity } from '@/utils';
import { Loading } from '@/components/Loading/Loading';
import { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, FlatList } from 'react-native';
import { useNotificationContext } from '@/hooks/useNotificationContext';
import { FriendTile } from '@/components/FriendTile/FriendTile';
import { useAuthStore } from '@/store/auth';
import { styles } from './FriendsActivityScreen.styles';

export function FriendsActivityScreen() {
  const { webAccessToken, spDcCookie, setValue } = useAuthStore();
  const [friendsActivity, setFriendsActivity] = useState<FilteredFriendActivity[] | null>(null);
  const { setNotification } = useNotificationContext();

  useEffect(() => {
    async function getWebAccessToken() {
      try {
        const response = await fetchWebAccessToken(spDcCookie);

        setValue('webAccessToken', {
          value: response.accessToken,
          expiresAt: response.accessTokenExpirationTimestampMs,
        });
      } catch (_err) {
        setNotification('Something went wrong, try reloading the app.', true);
      }
    }

    if (spDcCookie && !webAccessToken.value) {
      getWebAccessToken();
    }
  }, [spDcCookie, webAccessToken]);

  useEffect(() => {
    async function getFriendsActivity() {
      try {
        const friendsActivity = await fetchFriendsActivity(webAccessToken.value);
        const filteredFriendsActivity = filterFriendsActivity(friendsActivity);
        setFriendsActivity(filteredFriendsActivity);
      } catch (_err) {
        setNotification('Something went wrong, try reloading the app.', true);
      }
    }

    if (spDcCookie && webAccessToken.value && !friendsActivity) {
      getFriendsActivity();
    }
  }, [spDcCookie, webAccessToken, friendsActivity]);

  if (!spDcCookie && !webAccessToken.value) {
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
