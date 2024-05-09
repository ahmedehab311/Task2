import React, { createContext, useState } from "react";
import { useContext } from "react";

export const AuthContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState([
    {
      username: "",
      email: "",
    },
  ]);

  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
