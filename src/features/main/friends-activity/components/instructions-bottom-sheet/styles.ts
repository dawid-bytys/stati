import { platformStyle } from '@/common/platform';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  header: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    overflow: 'hidden',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    backgroundColor: '#f0f0f0',
    width: 40,
  },
  sectionList: {
    paddingHorizontal: 25,
    paddingBottom: platformStyle({ android: 15, ios: 25 }),
    gap: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#f0f0f0',
  },
  sectionItem: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginVertical: 5,
    color: '#f0f0f0',
  },
  link: {
    color: '#1DB954',
  },
});
