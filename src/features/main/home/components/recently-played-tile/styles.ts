import { SCREEN_WIDTH } from '@/common/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  timeWrapper: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    marginLeft: 10,
  },
  wrapper: {
    borderColor: '#2D2D2D',
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Poppins-Medium',
    color: '#6A6A6A',
    marginRight: 10,
    fontSize: SCREEN_WIDTH / 33,
  },
  artistText: {
    fontFamily: 'Poppins-Medium',
    color: '#6A6A6A',
    fontSize: SCREEN_WIDTH / 39,
  },
  trackText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: SCREEN_WIDTH / 33,
  },
  innerWrapper: {
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
  },
  image: {
    borderRadius: 7,
    width: SCREEN_WIDTH / 12,
    height: SCREEN_WIDTH / 12,
  },
});
