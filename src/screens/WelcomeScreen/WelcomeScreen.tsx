import { useNavigation } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'
import WelcomeImage from '@/assets/svg/welcome.svg'
import { useAuthContext } from '@/hooks/useAuthContext'
import { styles } from './WelcomeScreen.styles'
import type { AuthStackParamList } from '@/types/types'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export function WelcomeScreen() {
  const { getTokens } = useAuthContext()
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>()

  return (
    <View style={styles.container}>
      <View style={styles.innerUpper}>
        <WelcomeImage
          height="100%"
          width="100%"
        />
      </View>
      <View style={styles.innerLower}>
        <Text style={styles.heading}>Hello. 😊</Text>
        <Text style={styles.message}>Explore your music taste in one place</Text>
        <TouchableOpacity
          onPress={() => getTokens(navigation)}
          style={styles.loginBtn}
        >
          <Text style={styles.loginBtnText}>Login with Spotify</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
