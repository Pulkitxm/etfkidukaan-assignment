import React, { useCallback, useMemo, useState } from "react";

import { USER } from "@/types/user";
import { AuthContext } from "@/context/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<USER | null>(null);

  const isLoggedIn = useMemo(() => !!user, [user]);

  const login = useCallback(async (user: USER) => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    setUser(user);
  }, []);
  
  const logout = useCallback(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logIn: login,
        logOut: logout,
        isLoggedIn,
        isLoggedOut: !isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
