import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, FlatList } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { FriendTile } from '@/components/FriendTile/FriendTile';
import { Loading } from '@/components/Loading/Loading';
import { SetCookieMain } from '@/components/SetCookieMain/SetCookieMain';
import { fetchFriendsActivity, fetchWebAccessToken } from '@/domain/spotify';
import { CustomError } from '@/errors';
import { useNotificationContext } from '@/hooks/useNotificationContext';
import { useAuthStore } from '@/store/auth';
import { filterFriendsActivity } from '@/utils';
import { styles } from './FriendsActivityScreen.styles';
import type { FilteredFriendActivity } from '@/types/types';
import type { ListRenderItemInfo } from 'react-native';

export function FriendsActivityScreen() {
  const { spDcCookie, webAccessToken, setValue } = useAuthStore(
    useShallow((state) => ({
      spDcCookie: state.spDcCookie,
      webAccessToken: state.webAccessToken,
      setValue: state.setValue,
    })),
  );
  const [friendsActivity, setFriendsActivity] = useState<FilteredFriendActivity[] | null>(null);
  const { setNotification } = useNotificationContext();

  useEffect(() => {
    async function handleWebAccessToken() {
      try {
        const response = await fetchWebAccessToken(spDcCookie);

        setValue('webAccessToken', {
          value: response.accessToken,
          expiresAt: response.accessTokenExpirationTimestampMs,
        });
      } catch (err) {
        if (err instanceof CustomError) {
          setNotification(err.message, 'error');
          setValue('spDcCookie', '');
        } else {
          setNotification('Something went wrong, try reloading the app.', 'error');
        }
      }
    }

    if (spDcCookie && !webAccessToken.value) {
      handleWebAccessToken();
    }
  }, [spDcCookie, webAccessToken]);

  useEffect(() => {
    async function handleFriendsActivity() {
      try {
        const friendsActivity = await fetchFriendsActivity(webAccessToken.value);
        const filteredFriendsActivity = filterFriendsActivity(friendsActivity);
        setFriendsActivity(filteredFriendsActivity);
      } catch (err) {
        if (err instanceof CustomError) {
          setNotification(err.message, 'error');
        } else {
          setNotification('Something went wrong, try reloading the app.', 'error');
        }
      }
    }

    if (spDcCookie && webAccessToken.value && !friendsActivity) {
      handleFriendsActivity();
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
