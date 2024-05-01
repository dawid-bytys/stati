import { useLazyQuery } from '@apollo/client'
import { useEffect, useState, useCallback } from 'react'
import { Config } from 'react-native-config'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import pkceChallenge from 'react-native-pkce-challenge'
import { URL } from 'react-native-url-polyfill'
import { useShallow } from 'zustand/react/shallow'
import { AuthContext } from '@/context/AuthContext'
import { getAuthState } from '@/domain/auth'
import { generateSpotifyAuthURL, fetchTokens, fetchProfile } from '@/domain/spotify'
import { CustomError, ServiceUnavailableError } from '@/errors'
import { DOES_USER_EXIST_QUERY } from '@/graphql/queries/doesUserExist'
import { useAuthHydration } from '@/hooks/useAuthHydration'
import { useLoadingContext } from '@/hooks/useLoadingContext'
import { useNotificationContext } from '@/hooks/useNotificationContext'
import { useBoundStore } from '@/store/boundStore'
import type { DoesUserExistQuery } from '@/graphql-types/graphql'
import type { AuthStackParamList } from '@/types/types'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { PropsWithChildren } from 'react'
import type { RedirectResult } from 'react-native-inappbrowser-reborn'

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { setNotification } = useNotificationContext()
  const { setIsLoading } = useLoadingContext()
  const {
    accessToken,
    refreshToken,
    spdcCookie,
    webAccessToken,
    gqlAccessToken,
    gqlRefreshToken,
    setAuthValue,
  } = useBoundStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      spdcCookie: state.spdcCookie,
      webAccessToken: state.webAccessToken,
      gqlAccessToken: state.gqlAccessToken,
      gqlRefreshToken: state.gqlRefreshToken,

      setAuthValue: state.setAuthValue,
    })),
  )
  const hasHydrated = useAuthHydration()
  const [checkIfUserExists] = useLazyQuery<DoesUserExistQuery>(DOES_USER_EXIST_QUERY)

  useEffect(() => {
    async function authenticate() {
      try {
        const authState = await getAuthState(
          accessToken,
          refreshToken,
          webAccessToken,
          spdcCookie,
          gqlAccessToken,
          gqlRefreshToken,
        )

        setAuthValue('accessToken', authState.accessToken)
        setAuthValue('refreshToken', authState.refreshToken)
        setAuthValue('spdcCookie', authState.spdcCookie)
        setAuthValue('webAccessToken', authState.webAccessToken)
        setAuthValue('gqlAccessToken', authState.gqlAccessToken)
        setAuthValue('gqlRefreshToken', authState.gqlRefreshToken)
        setIsAuthenticated(authState.isAuthenticated)

        if (!authState.isAuthenticated) {
          setIsLoading(false)
        }

        if (authState.notification) {
          setNotification(authState.notification, 'warning')
        }
      } catch (err) {
        if (err instanceof CustomError) {
          setNotification(err.message, 'error')
        } else {
          setNotification('Something went wrong, try reloading the app.', 'error')
        }

        logout()
      } finally {
        setIsAuthenticating(false)
      }
    }

    if (hasHydrated) {
      authenticate()
    }
  }, [hasHydrated])

  const getTokens = useCallback(
    async (navigationRef: NativeStackNavigationProp<AuthStackParamList>) => {
      try {
        const { codeChallenge, codeVerifier } = pkceChallenge()
        const spotifyAuthUrl = generateSpotifyAuthURL(codeChallenge)

        const isBrowserAvailable = await InAppBrowser.isAvailable()
        if (!isBrowserAvailable) {
          throw new Error('InAppBrowser is not available')
        }

        const { type, url } = (await InAppBrowser.openAuth(
          spotifyAuthUrl,
          Config.SPOTIFY_AUTH_CALLBACK_URL,
        )) as RedirectResult

        if (type === 'success') {
          const code = new URL(url).searchParams.get('code')

          if (!code) {
            throw new Error('No code in callback URL')
          }

          setIsLoading(true)

          const { access_token, refresh_token } = await fetchTokens(code, codeVerifier)
          const { email } = await fetchProfile(access_token)
          const { data: doesUserExistData } = await checkIfUserExists({ variables: { email } })

          if (!doesUserExistData) {
            throw new ServiceUnavailableError()
          }

          if (!doesUserExistData.doesUserExist) {
            navigationRef.push('Register', { email, access_token, refresh_token })
          } else {
            navigationRef.push('Login', { email, access_token, refresh_token })
          }

          setIsLoading(false)
        }
      } catch (err) {
        console.error(err)
        if (err instanceof CustomError) {
          setNotification(err.message, 'error')
        } else {
          setNotification('Something went wrong, try reloading the app.', 'error')
        }

        logout()
      }
    },
    [setAuthValue, setNotification],
  )

  const logout = useCallback(() => {
    setAuthValue('accessToken', { value: '', createdAt: 0 })
    setAuthValue('webAccessToken', { value: '', expiresAt: 0 })
    setAuthValue('refreshToken', '')
    setAuthValue('spdcCookie', '')
    setAuthValue('gqlAccessToken', '')
    setAuthValue('gqlRefreshToken', '')
    setIsAuthenticated(false)
    setNotification('You have logged out successfully.', 'success')
  }, [setAuthValue, setNotification])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        getTokens,
        logout,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
