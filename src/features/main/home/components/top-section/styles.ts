import { PRIMARY_COLOR } from '@/common/colors';
import { SCREEN_WIDTH } from '@/common/constants';
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
    fontSize: SCREEN_WIDTH / 24.5,
  },
  redirectBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  redirectBtnText: {
    fontFamily: 'Poppins-SemiBold',
    color: PRIMARY_COLOR,
    fontSize: SCREEN_WIDTH / 39,
  },
  listContentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
