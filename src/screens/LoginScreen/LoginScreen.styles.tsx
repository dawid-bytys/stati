import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  input: {
    fontFamily: 'Poppins-SemiBold',
    borderColor: '#2D2D2D',
    textAlign: 'center',
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 24,
    color: '#fff',
    width: '100%',
    fontSize: 12,
    padding: 10,
  },
  btn: {
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
})
