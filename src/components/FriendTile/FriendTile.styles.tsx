import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  innerRight: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexShrink: 1,
    width: '100%',
  },
  artistName: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    flexShrink: 1,
    fontSize: 12,
  },
  username: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    flexShrink: 1,
    fontSize: 15,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    columnGap: 15,
    height: 60,
  },
  innerRightMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  innerRightLower: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  trackName: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    fontSize: 12,
  },
  fromText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    fontSize: 12,
    flexShrink: 1,
  },
  innerLeft: {
    justifyContent: 'center',
    alignContent: 'center',
    width: 60,
  },
  whenText: {
    fontFamily: 'Poppins-Bold',
    color: '#6A6A6A',
    fontSize: 12,
  },
  innerRightUpper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  activityDot: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#121212',
  },
  image: {
    borderRadius: 50,
    height: 60,
    width: 60,
  },
});
