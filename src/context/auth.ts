import { OPERATIONS, USER } from "@/types/user";
import { createContext } from "react";

export const AuthContext = createContext<{
  user: USER | null;
  logIn: (user: USER) => Promise<void>;
  logOut: () => Promise<void>;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  isAuthorizedTo: (operation: OPERATIONS) => boolean;
}>({
  user: null,
  logIn: async () => {},
  logOut: async () => {},
  isLoggedIn: false,
  isLoggedOut: true,
  isAuthorizedTo: () => false,
});
