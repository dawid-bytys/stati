import { useRefreshTokenMutation } from '@/network/mutations/spotify';
import { useWebAccessTokenQuery } from '@/network/queries/spotify';
import { useStore } from '@/store/store';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
  const store = useStore();

  const { mutate: refreshToken } = useRefreshTokenMutation();
  const { data: webAccessTokenData, error: webAccessTokenError } = useWebAccessTokenQuery(
    store.isAuthenticating && store.spdcCookie !== null,
  );

  useEffect(() => {
    if (!store.accessToken) {
      store.setAuthenticating(false);
      store.setLoading(false);
    } else {
      refreshToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken, store.setAuthenticating, store.setLoading]);

  useEffect(() => {
    if (store.isAuthenticating && store.isAuthenticated && !store.spdcCookie) {
      store.setAuthenticating(false);
    }

    if (store.isAuthenticating && store.isAuthenticated && webAccessTokenError) {
      store.setNotification({
        type: 'error',
        message: 'sp_dc cookie has expired.',
      });
      store.setAuthenticating(false);
    }

    if (store.isAuthenticating && store.isAuthenticated && webAccessTokenData) {
      store.setWebAccessToken({
        value: webAccessTokenData.accessToken,
        expiresAt: Math.floor(webAccessTokenData.accessTokenExpirationTimestampMs / 1000),
      });
      store.setAuthenticating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    webAccessTokenData,
    webAccessTokenError,
    store.isAuthenticating,
    store.isAuthenticated,
    store.setAuthenticating,
    store.setNotification,
    store.setWebAccessToken,
  ]);

  return <>{children}</>;
}
