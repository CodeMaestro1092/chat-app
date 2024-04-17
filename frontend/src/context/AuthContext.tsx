import React, { createContext, useContext, useState } from "react";
import { AuthContextT } from "../types/auth";

export const AuthContext = createContext<AuthContextT | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<string | null>(() => {
    const storedUser = localStorage.getItem("chat-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
