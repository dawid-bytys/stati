import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  time: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    marginLeft: 10,
  },
  container: {
    borderColor: '#2D2D2D',
    flexDirection: 'row',
    borderRadius: 15,
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
  titleText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 12,
  },
  song: {
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
