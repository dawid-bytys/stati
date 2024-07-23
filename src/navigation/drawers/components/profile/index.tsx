import { useStore } from '@/store/store';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';

export function Profile() {
  const store = useStore();

  return (
    <View style={styles.wrapper}>
      <FastImage style={styles.image} source={{ uri: store.user?.image || '' }} resizeMode="contain" />
      <View style={styles.innerWrapper}>
        <Text style={styles.name} numberOfLines={1}>
          {store.user?.displayName || 'Unknown'}
        </Text>
      </View>
    </View>
  );
}
