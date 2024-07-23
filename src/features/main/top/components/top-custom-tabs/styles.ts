import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    height: 30,
    flexDirection: 'row',
    marginHorizontal: 25,
  },
  tabBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  tabBtnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 13,
  },
  animatedBackground: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#2D2D2D',
    borderRadius: 100,
  },
});
