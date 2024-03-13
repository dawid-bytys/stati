import { View, Text } from 'react-native';
import LinesDown from '@/assets/svg/lines-down.svg';
import LinesUp from '@/assets/svg/lines-up.svg';
import { styles } from './NoConnectionScreen.styles';

export function NoConnectionScreen() {
  return (
    <View style={styles.container}>
      <LinesUp style={styles.linesUp} />
      <View style={styles.inner}>
        <Text style={styles.heading}>lost internet connection. 😔</Text>
        <Text style={styles.lowerText}>retrying in 5 seconds...</Text>
      </View>
      <LinesDown style={styles.linesDown} />
    </View>
  );
}
