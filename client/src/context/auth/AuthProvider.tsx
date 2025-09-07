import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
} from "../../../api/auth/auth";
import type { User } from "../../types/user.types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (user: User) => {
    try {
      const res = await registerRequest(user);
      const userData = await res.json();
      console.log(userData);
      
      if (userData.registerUser) {
        setUser(userData.registerUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signin = async (user: User) => {
    try {
      const res = await loginRequest(user);
      if (res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser({} as User);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
