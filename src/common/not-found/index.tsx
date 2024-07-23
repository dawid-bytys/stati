import { Text, View } from 'react-native';
import { getIcon } from '../icons';
import { styles } from './styles';
import type { NotFoundProps } from './types';

export function NotFound({ iconWidth, iconHeight, textStyle }: NotFoundProps) {
  return (
    <View style={styles.wrapper}>
      {getIcon('notFound', undefined, iconWidth, iconHeight)}
      <Text style={[styles.text, textStyle]}>no results. 😔</Text>
    </View>
  );
}
