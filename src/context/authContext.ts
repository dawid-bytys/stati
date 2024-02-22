import { WebAccessToken } from '@/types';
import { createContext } from 'react';

interface AuthContext {
  accessToken: string;
  setWebAccessToken: (webAccessToken: WebAccessToken) => void;
  setSpDcCookie: (cookie: string) => void;
  obtainAccessToken: () => Promise<void>;
  webAccessToken: string;
  logout: () => Promise<void>;
  isAuthenticating: boolean;
  spDcCookie: string;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
