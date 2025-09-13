import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  verifyTokenRequest,
} from "../../../api/auth/auth";
import type { User } from "../../types/user.types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const signup = async (user: User) => {
    try {
      const res = await registerRequest(user);
      const userData = await res?.json();

      if (!res?.ok) {
        let errorMessages;

        if (userData.errors) {
          errorMessages = Object.values(userData.errors).flat();
        } else if (userData.message) {
          errorMessages = [userData.message];
        } else {
          errorMessages = ["Ocurrió un error inesperado al registrarse."];
        }

        setErrors(errorMessages);
        setIsAuthenticated(false);
        return;
      }

      localStorage.setItem("sessionActive", "true");
      localStorage.setItem("accessToken", userData.accessToken);
      setUser(userData.registerUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const signin = async (user: User) => {
    try {
      const res = await loginRequest(user);
      const userData = await res?.json();
      console.log(userData);

      if (!res?.ok) {
        let errorMessages;

        if (userData.errors) {
          errorMessages = Object.values(userData.errors).flat();
        } else if (userData.message) {
          errorMessages = [userData.message];
        } else {
          errorMessages = ["Ocurrió un error inesperado al registrarse."];
        }

        setErrors(errorMessages);
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);
      setLoading(false);
      setUser(userData.userLogged);

      localStorage.setItem("sessionActive", "true");
      localStorage.setItem("accessToken", userData.accessToken);
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
    // TODO: Implement checkLogin function to verify token on mount
    const checkLoginStatus = async () => {
      const sessionActive = localStorage.getItem("sessionActive");

      if (!sessionActive) {
        setUser({} as User);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (!res?.ok) {
          setLoading(false);
          setIsAuthenticated(false);
          setUser({} as User);
          return;
        }

        const data = await res.json();
        setUser(data.userUpdated);
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", data.accessToken);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({} as User);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 4000);
    return () => clearInterval(timer);
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        errors,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
