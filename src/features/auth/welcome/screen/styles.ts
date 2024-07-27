import { BACKGROUND_COLOR } from '@/common/colors';
import { aspectRatio } from '@/common/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  flex: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  innerWrapper: {
    marginTop: 30,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  wrapperInnerUpper: {
    alignItems: 'center',
  },
  wrapperInnerLower: {
    alignItems: 'center',
    gap: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#666363',
  },
  loginBtn: {
    marginTop: 40,
    paddingVertical: 20,
  },
  powered: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  spotifyLogo: {
    width: 150,
    aspectRatio: aspectRatio(2362, 708),
  },
});
