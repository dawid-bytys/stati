import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, FlatList } from 'react-native';
import { FriendTile } from '@/components/FriendTile/FriendTile';
import { Loading } from '@/components/Loading/Loading';
import { SetCookieMain } from '@/components/SetCookieMain/SetCookieMain';
import { fetchFriendsActivity, fetchWebAccessToken } from '@/domain/spotify';
import { useNotificationContext } from '@/hooks/useNotificationContext';
import { useAuthStore } from '@/store/auth';
import { filterFriendsActivity } from '@/utils';
import { styles } from './FriendsActivityScreen.styles';
import type { FilteredFriendActivity } from '@/types/types';
import type { ListRenderItemInfo } from 'react-native';

export function FriendsActivityScreen() {
  const { webAccessToken, spDcCookie, setValue } = useAuthStore();
  const [friendsActivity, setFriendsActivity] = useState<FilteredFriendActivity[] | null>(null);
  const { setNotification } = useNotificationContext();

  useEffect(() => {
    async function getWebAccessToken() {
      try {
        const response = await fetchWebAccessToken(spDcCookie);

        if (response.isAnonymous) {
          setValue('spDcCookie', '');
          setNotification('Invalid sp_dc cookie, try logging in again.', true);
          return;
        }

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

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<FilteredFriendActivity>) => (
      <FriendTile
        {...item}
        delay={index * 100}
      />
    ),
    [],
  );

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
          onRefresh={() => setFriendsActivity(null)}
        />
      }
      renderItem={renderItem}
    />
  );
}
