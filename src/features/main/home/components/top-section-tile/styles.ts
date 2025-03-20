import { SCREEN_WIDTH } from '@/common/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH / 5.6,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: '#fff',
    fontSize: SCREEN_WIDTH / 39,
  },
  titleContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    width: SCREEN_WIDTH / 5.6,
    height: SCREEN_WIDTH / 5.6,
  },
});
