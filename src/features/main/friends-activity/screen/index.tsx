import { Loading } from '@/common/loading';
import { NotFound } from '@/common/not-found';
import { useFriendsActivityQuery } from '@/network/queries/spotify';
import { useStore } from '@/store/store';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { enableLayoutAnimations, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FriendActivityRow } from '../components/friend-activity-row';
import { SetCookie } from '../components/set-cookie';
import { styles } from './styles';
import { mapFriendsActivityData } from './utils';

enableLayoutAnimations(true);
const transition = LinearTransition.springify().duration(500);

export function FriendsActivityScreen() {
  const store = useStore();
  const insets = useSafeAreaInsets();

  const { data: friendsActivityData, error: friendsActivityError } = useFriendsActivityQuery(
    store.webAccessToken !== null,
  );

  useEffect(() => {
    if (friendsActivityError) {
      console.error(friendsActivityError);
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
        renderItem={({ item }) => <FriendActivityRow data={item} />}
        itemLayoutAnimation={transition}
      />
    </View>
  );
}
