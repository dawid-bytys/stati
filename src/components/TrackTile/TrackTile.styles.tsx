import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    borderColor: '#2D2D2D',
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    columnGap: 10,
    padding: 10,
    height: 60,
  },
  innerRight: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  artist: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    fontSize: 12,
  },
  rank: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'right',
    fontSize: 16,
  },
  innerMiddle: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexShrink: 1,
    flexGrow: 1,
  },
  track: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 14,
  },
  image: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },
  innerLeft: {
    height: 40,
    width: 40,
  },
})
