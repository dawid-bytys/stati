import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
