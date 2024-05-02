import { StyleSheet } from 'react-native'
import { hasNotch } from 'react-native-device-info'
import { platformStyle } from '@/platform'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: platformStyle({ android: 100, ios: 120 }),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    zIndex: Number.MAX_SAFE_INTEGER,
    justifyContent: hasNotch() ? 'flex-end' : 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: hasNotch() ? 27 : 0,
  },
})
