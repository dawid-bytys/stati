import { StyleSheet, View, Text } from 'react-native';
import LinesDown from '@/assets/svg/lines-down.svg';
import LinesUp from '@/assets/svg/lines-up.svg';

export function NoConnectionMain() {
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

const styles = StyleSheet.create({
  lowerText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#666363',
    fontSize: 16,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 20,
  },
  linesDown: {
    position: 'absolute',
    bottom: 10,
    right: -1,
  },
  linesUp: {
    position: 'absolute',
    left: -1,
    top: 10,
  },
  inner: {
    flexDirection: 'column',
  },
});
