import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = 

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user-token") as string) || null
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
