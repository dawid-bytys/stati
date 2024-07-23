import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  absoluteWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    zIndex: Number.MAX_SAFE_INTEGER,
  },
  flexWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    zIndex: Number.MAX_SAFE_INTEGER,
  },
  loading: {
    width: 64,
    height: 64,
  },
});
