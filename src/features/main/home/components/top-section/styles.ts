import { PRIMARY_COLOR } from '@/common/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40,
  },
  innerUpper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  innerLower: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  redirectBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  redirectBtnText: {
    fontFamily: 'Poppins-SemiBold',
    color: PRIMARY_COLOR,
    fontSize: 10,
  },
});
