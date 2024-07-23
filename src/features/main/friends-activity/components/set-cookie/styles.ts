import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  input: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 24,
    color: '#fff',
    width: '100%',
    fontSize: 12,
    padding: 10,
  },
  submitBtn: {
    backgroundColor: '#1FDF64',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 24,
    width: '50%',
    padding: 10,
  },
  info: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 12,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    flex: 1,
  },
  btnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  inner: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  linesDown: {
    position: 'absolute',
    bottom: 10,
    right: -1,
  },
  linesUp: {
    position: 'absolute',
    left: -1,
    top: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
