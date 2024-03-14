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
    paddingBottom: 25,
    gap: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#f0f0f0',
    paddingBottom: 10,
  },
  sectionItem: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginVertical: 5,
    color: '#f0f0f0',
    textAlign: 'justify',
  },
  link: {
    color: '#1DB954',
  },
});
