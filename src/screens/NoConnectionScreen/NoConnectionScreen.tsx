import { View, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import LinesDown from '@/assets/svg/lines-down.svg';
import LinesUp from '@/assets/svg/lines-up.svg';
import { styles } from './NoConnectionScreen.styles';

export function NoConnectionScreen() {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
    >
      <LinesUp style={styles.linesUp} />
      <View style={styles.inner}>
        <Text style={styles.heading}>lost internet connection. 😔</Text>
        <Text style={styles.lowerText}>retrying...</Text>
      </View>
      <LinesDown style={styles.linesDown} />
    </Animated.View>
  );
}
