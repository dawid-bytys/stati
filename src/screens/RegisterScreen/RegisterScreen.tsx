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
import { REGISTER_MUTATION } from '@/graphql/mutations/register'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useLoadingContext } from '@/hooks/useLoadingContext'
import { useNotificationContext } from '@/hooks/useNotificationContext'
import { IS_ANDROID, platformStyle } from '@/platform'
import { useBoundStore } from '@/store/boundStore'
import { styles } from './RegisterScreen.styles'
import type { RegisterMutation } from '@/graphql-types/graphql'
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

export function RegisterScreen({ route }: RegisterScreenProps) {
  const { email, access_token, refresh_token } = route.params
  const [password, setPassword] = useState('')
  const { setIsLoading } = useLoadingContext()
  const { setNotification } = useNotificationContext()
  const { setIsAuthenticated } = useAuthContext()
  const setAuthValue = useBoundStore((state) => state.setAuthValue)
  const [register] = useMutation<RegisterMutation>(REGISTER_MUTATION, {
    onError(err) {
      setIsLoading(false)
      setNotification(err.message, 'error')
    },
    onCompleted(data) {
      setAuthValue('accessToken', { value: access_token, createdAt: Date.now() })
      setAuthValue('refreshToken', { refreshToken: refresh_token })
      setAuthValue('gqlAccessToken', data.register.accessToken)
      setAuthValue('gqlRefreshToken', data.register.refreshToken)
      setIsAuthenticated(true)
      setNotification('You have logged in successfully.', 'success')
    },
  })

  function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setPassword(e.nativeEvent.text)
  }

  async function handleSubmit() {
    setIsLoading(true)
    await register({ variables: { email, password: password.trim() } })
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
          behavior={platformStyle({ android: 'height', ios: 'padding' })}
          keyboardVerticalOffset={platformStyle({ android: 20, ios: 0 })}
          enabled={!IS_ANDROID}
        >
          <Text style={styles.info}>Provide a secure password</Text>
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
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
