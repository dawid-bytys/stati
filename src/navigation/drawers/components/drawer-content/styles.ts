import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingRight: 25,
  },
  wrapperContent: {
    justifyContent: 'space-between',
  },
  versionText: {
    fontFamily: 'Poppins-Medium',
    color: '#525252',
    fontSize: 14,
    textAlign: 'center',
    position: 'absolute',
    bottom: 25,
    right: 0,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  actionBtnText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  bottomWrapper: {
    gap: 10,
  },
});
