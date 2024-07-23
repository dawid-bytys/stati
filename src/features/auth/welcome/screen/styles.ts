import { BACKGROUND_COLOR } from '@/common/colors';
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
    alignItems: 'center',
  },
  innerWrapper: {
    marginTop: 30,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
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
});
