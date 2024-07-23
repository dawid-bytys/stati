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
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    height: 50,
  },
  timeText: {
    fontFamily: 'Poppins-Medium',
    color: '#6A6A6A',
    marginRight: 10,
    fontSize: 12,
  },
  artistText: {
    fontFamily: 'Poppins-Medium',
    color: '#6A6A6A',
    fontSize: 10,
  },
  trackText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 12,
  },
  innerWrapper: {
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
  },
  image: {
    borderRadius: 5,
    height: 30,
    width: 30,
  },
});
