import { SCREEN_WIDTH } from '@/common/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: SCREEN_WIDTH / 24.5,
  },
  wrapper: {
    flexDirection: 'column',
    marginTop: 40,
  },
  innerWrapper: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 14,
  },
});
