import { createContext } from 'react';

interface AuthContext {
  tokens: {
    refreshToken: string;
    accessToken: string;
    creationDate: number;
    expiresIn: number;
  } | null;
  setWebAccessToken: (token: string | null) => void;
  setSpDcCookie: (cookie: string | null) => void;
  obtainAccessToken: () => Promise<void>;
  webAccessToken: string | null;
  logout: () => Promise<void>;
  isAuthenticating: boolean;
  spDcCookie: string | null;
  isAuthenticated: boolean;
}

export const authContext = createContext<AuthContext | undefined>(undefined);
