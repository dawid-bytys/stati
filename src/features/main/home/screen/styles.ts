import { BACKGROUND_COLOR, BORDER_COLOR } from '@/common/colors';
import { SCREEN_WIDTH } from '@/common/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  animatedWrapper: {
    flex: 1,
    overflow: 'hidden',
    borderColor: BORDER_COLOR,
  },
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  scrollWrapper: {
    padding: 25,
  },
  message: {
    fontFamily: 'Poppins-SemiBold',
    color: '#666363',
    fontSize: SCREEN_WIDTH / 24,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    //fontSize: 30,
    fontSize: SCREEN_WIDTH / 13,
  },
  greetingsWrapperUpper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
