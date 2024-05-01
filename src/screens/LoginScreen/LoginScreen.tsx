import { useMutation } from '@apollo/client'
import { useState } from 'react'
import {
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import LinesDown from '@/assets/svg/lines-down.svg'
import LinesUp from '@/assets/svg/lines-up.svg'
import { IS_ANDROID } from '@/config'
import { LOGIN_MUTATION } from '@/graphql/mutations/login'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useLoadingContext } from '@/hooks/useLoadingContext'
import { useNotificationContext } from '@/hooks/useNotificationContext'
import { useBoundStore } from '@/store/boundStore'
import { styles } from './LoginScreen.styles'
import type { LoginMutation } from '@/graphql-types/graphql'
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

interface RegisterScreenProps {
  route: {
    params: {
      email: string
      access_token: string
      refresh_token: string
    }
  }
}

export function LoginScreen({ route }: RegisterScreenProps) {
  const { email, access_token, refresh_token } = route.params
  const [password, setPassword] = useState('')
  const { setIsLoading } = useLoadingContext()
  const { setNotification } = useNotificationContext()
  const { setIsAuthenticated } = useAuthContext()
  const setAuthValue = useBoundStore((state) => state.setAuthValue)
  const [login] = useMutation<LoginMutation>(LOGIN_MUTATION, {
    onError(err) {
      setIsLoading(false)
      setNotification(err.message, 'error')
    },
    onCompleted(data) {
      setAuthValue('accessToken', { value: access_token, createdAt: Date.now() })
      setAuthValue('refreshToken', { refreshToken: refresh_token })
      setAuthValue('gqlAccessToken', data.login.accessToken)
      setAuthValue('gqlRefreshToken', data.login.refreshToken)
      setIsAuthenticated(true)
      setNotification('You have logged in successfully.', 'success')
    },
  })

  function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setPassword(e.nativeEvent.text)
  }

  async function handleSubmit() {
    setIsLoading(true)
    await login({ variables: { email, password: password.trim() } })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        entering={FadeIn.duration(300)}
        style={styles.container}
      >
        <LinesUp style={styles.linesUp} />
        <LinesDown style={styles.linesDown} />
        <KeyboardAvoidingView
          style={styles.inner}
          behavior={IS_ANDROID ? 'height' : 'padding'}
          keyboardVerticalOffset={IS_ANDROID ? 20 : 0}
          enabled={!IS_ANDROID}
        >
          <Text style={styles.info}>Provide a password</Text>
          <TextInput
            onChange={handleChange}
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor="#2D2D2D"
            placeholder="password"
            value={password}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
