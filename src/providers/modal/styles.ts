import { BACKGROUND_COLOR } from '@/common/colors';
import { SCREEN_WIDTH } from '@/common/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: Number.MAX_SAFE_INTEGER,
  },
  pressableWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 40,
    backgroundColor: BACKGROUND_COLOR,
    width: SCREEN_WIDTH * 0.8,
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});
