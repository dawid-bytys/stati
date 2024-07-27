import { Loading } from '@/common/loading';
import { NotFound } from '@/common/not-found';
import { useFriendsActivityQuery } from '@/network/queries/spotify';
import { useStore } from '@/store/store';
import { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FriendActivityRow } from '../components/friend-activity-row';
import { SetCookie } from '../components/set-cookie';
import { styles } from './styles';
import { mapFriendsActivityData } from './utils';
import type { FriendActivityRowProps } from '../components/friend-activity-row/types';
import type { ListRenderItemInfo } from 'react-native';

export function FriendsActivityScreen() {
  const store = useStore();
  const insets = useSafeAreaInsets();

  const { data: friendsActivityData, error: friendsActivityError } = useFriendsActivityQuery(
    store.webAccessToken !== null,
  );

  const renderFriendActivityRow = useCallback(({ item }: ListRenderItemInfo<FriendActivityRowProps['data']>) => {
    return <FriendActivityRow data={item} />;
  }, []);

  useEffect(() => {
    if (friendsActivityError) {
      store.setNotification({
        type: 'error',
        message: 'Failed to fetch friends activity, try restarting the app',
      });
    }
  }, [friendsActivityData, friendsActivityError, store]);

  if (!store.webAccessToken) {
    return <SetCookie />;
  }

  if (!friendsActivityData) {
    return <Loading />;
  }

  if (friendsActivityData.friends.length === 0) {
    return <NotFound iconWidth={200} iconHeight={200} textStyle={styles.notFoundText} />;
  }

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <Animated.FlatList
        contentContainerStyle={styles.listContentWrapper}
        data={mapFriendsActivityData(friendsActivityData)}
        renderItem={renderFriendActivityRow}
        itemLayoutAnimation={LinearTransition}
        keyExtractor={(item) => item.friendUri}
      />
    </View>
  );
}
