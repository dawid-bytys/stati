import { NotFound } from '@/common/not-found';
import { BottomTabsScreens } from '@/navigation/tabs/main/types';
import { useStore } from '@/store/store';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { TopSectionTile } from '../top-section-tile';
import { styles } from './styles';
import type { TopSectionProps } from './types';
import type { ListRenderItemInfo } from 'react-native';

export function TopSection({ type, title, data }: TopSectionProps) {
  const navigation = useNavigation();
  const store = useStore();

  const handleNavigation = useCallback(() => {
    store.setTopItemsParams({ type, period: '4 weeks' });
    navigation.navigate(BottomTabsScreens.Top);
  }, [navigation, store, type]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<{ id: string; name: string; image: string }>) => {
    return <TopSectionTile key={item.id} name={item.name} image={item.image} />;
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.innerUpper}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity style={styles.redirectBtn} onPress={handleNavigation}>
          <Text style={styles.redirectBtnText}>see more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerLower}>
        {data.length === 0 ? (
          <NotFound iconWidth={100} iconHeight={100} />
        ) : (
          <Animated.FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={({ id }) => id}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.listContentWrapper}
            itemLayoutAnimation={LinearTransition}
          />
        )}
      </View>
    </View>
  );
}
