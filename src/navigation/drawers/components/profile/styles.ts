import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#272727',
    borderRadius: 10,
    alignItems: 'center',
    padding: 8,
    width: '100%',
    height: 46,
  },
  innerWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
});
