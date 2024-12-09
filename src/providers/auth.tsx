import React, { useCallback, useMemo, useState } from "react";

import { USER, validateUser } from "@/types/user";
import { AuthContext } from "@/context/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

let localUser = null;
try {
  const localData = localStorage.getItem("user");
  const validatedUser = validateUser.safeParse(JSON.parse(localData ?? ""));
  if (validatedUser.success) localUser = validatedUser.data;
} catch (e) {
  console.log(e);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<USER | null>(localUser);

  const isLoggedIn = useMemo(() => !!user, [user]);

  const login = useCallback(async (user: USER) => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  const logout = useCallback(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    setUser(null);
    localStorage.removeItem("user");
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
