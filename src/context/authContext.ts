import { createContext } from 'react';

interface AuthContext {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  getTokens: () => Promise<void>;
  logout: (withNotification: boolean) => void;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
