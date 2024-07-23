import { BACKGROUND_COLOR } from '@/common/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 15,
    height: 60,
    overflow: 'hidden',
  },
  innerLeftWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  innerRightWrapper: {
    flexShrink: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
  },
  innerRightUpperWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  innerRightMiddleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  innerRightLowerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  image: {
    borderRadius: 50,
    height: 60,
    width: 60,
  },
  activityDot: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: BACKGROUND_COLOR,
  },
  friend: {
    flexShrink: 1,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 15,
  },
  track: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    fontSize: 12,
  },
  artist: {
    flexShrink: 1,
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    fontSize: 12,
  },
  context: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    fontSize: 12,
    flexShrink: 1,
  },
  time: {
    fontFamily: 'Poppins-Bold',
    color: '#6A6A6A',
    fontSize: 12,
  },
});
