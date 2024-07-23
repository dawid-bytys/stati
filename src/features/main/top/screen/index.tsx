import { useStore } from '@/store/store';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TopItems } from '../../top-items/screen';
import { TopCustomTabs } from '../components/top-custom-tabs';
import { styles } from './styles';
import { mapLabelToPeriod } from './utils';

export function TopScreen() {
  const insets = useSafeAreaInsets();
  const store = useStore();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 25 }]}>
      <TopCustomTabs
        tabs={['4 weeks', '6 months', 'all time']}
        currentTab={store.topItemsParams.period}
        onTabPress={(period) => store.setTopItemsParams({ period })}
        style={styles.periodTabs}
      />
      <TopItems type={store.topItemsParams.type} period={mapLabelToPeriod(store.topItemsParams.period)} />
      <TopCustomTabs
        tabs={['artists', 'tracks']}
        currentTab={store.topItemsParams.type}
        onTabPress={(type) => store.setTopItemsParams({ type })}
        style={styles.typeTabs}
      />
    </View>
  );
}
