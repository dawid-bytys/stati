import { WebAccessToken } from '@/types';
import { createContext } from 'react';

interface AuthContext {
  tokens: {
    accessToken: {
      token: string;
      expiresIn: number;
      creationTimestamp: number;
    };
    refreshToken: string;
  } | null;
  setWebAccessToken: (webAccessToken: WebAccessToken) => void;
  setSpDcCookie: (cookie: string | null) => void;
  obtainAccessToken: () => Promise<void>;
  webAccessToken: WebAccessToken | null;
  logout: () => Promise<void>;
  isAuthenticating: boolean;
  spDcCookie: string | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
