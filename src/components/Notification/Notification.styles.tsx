import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    zIndex: Number.MAX_SAFE_INTEGER,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 27,
  },
});
