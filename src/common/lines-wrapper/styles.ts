import { BACKGROUND_COLOR } from '@/common/colors';
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
    paddingHorizontal: 40,
    backgroundColor: BACKGROUND_COLOR,
    zIndex: Number.MAX_SAFE_INTEGER,
  },
  flexWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 40,
  },
  linesDown: {
    position: 'absolute',
    bottom: 10,
    right: -1,
  },
  linesUp: {
    position: 'absolute',
    left: -1,
    top: 100,
  },
});
