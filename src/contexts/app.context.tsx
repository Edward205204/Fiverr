import React, { useState, createContext } from 'react';
import { getAccessTokenFromLS, getProfileFromLS } from '@/utils/auth';
import User from '@/@types/user';

export interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  reset: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null
});
const initialState = getInitialAppContext();
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialState);

export const AppProvider = ({
  children,
  defaultValue = initialState
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated);
  const [profile, setProfile] = useState<User | null>(defaultValue.profile);

  const reset = () => {
    setIsAuthenticated(false);
    setProfile(null);
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, reset }}>
      {children}
    </AppContext.Provider>
  );
};
