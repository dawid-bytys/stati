import { NotFound } from '@/common/not-found';
import { BottomTabsScreens } from '@/navigation/tabs/main/types';
import { useStore } from '@/store/store';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TopSectionTile } from '../top-section-tile';
import { styles } from './styles';
import type { TopSectionProps } from './types';

export function TopSection({ type, title, data }: TopSectionProps) {
  const navigation = useNavigation();
  const store = useStore();

  const handleNavigation = useCallback(() => {
    store.setTopItemsParams({ type, period: '4 weeks' });
    navigation.navigate(BottomTabsScreens.Top);
  }, [navigation, store, type]);

  const renderData = useCallback(() => {
    if (data.length === 0) {
      return <NotFound iconWidth={100} iconHeight={100} />;
    }

    return data.map(({ id, name, image }) => <TopSectionTile key={id} name={name} image={image} />);
  }, [data]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.innerUpper}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity style={styles.redirectBtn} onPress={handleNavigation}>
          <Text style={styles.redirectBtnText}>see more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerLower}>{renderData()}</View>
    </View>
  );
}
