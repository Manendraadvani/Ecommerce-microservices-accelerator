// src/context/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authApiService } from "../services/authService";

const defaultAuthContextState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: false,
  error: null,
  loginUser: async () => Promise.reject(new Error("loginUser not implemented")),
  registerUser: async () => Promise.reject(new Error("registerUser not implemented")),
  logoutUser: async () => Promise.reject(new Error("logoutUser not implemented")),
  setError: () => {},
};

const AuthContext = createContext(defaultAuthContextState);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---- Helper: Perform client logout ----
  const performClientLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("bookbazaar_accessToken");
    localStorage.removeItem("bookbazaar_user");
  }, []);

  useEffect(() => {
  const storedToken = localStorage.getItem("bookbazaar_accessToken");
  if (storedToken) {
    setToken(storedToken);
    authApiService
      .fetchUserProfile(storedToken)
      .then((profile) => {
        if (profile) {
          setUser(profile);
        } else {
          performClientLogout();
        }
      })
      .catch((err) => {
        console.error("Profile fetch failed", err);
        performClientLogout();
      })
      .finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
}, [performClientLogout]);


  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const guestCart = JSON.parse(localStorage.getItem("bookbazaar_cart")) || [];

      const tokenData = await authApiService.login(credentials);
      const accessToken = tokenData.accessToken;

      setToken(accessToken);
      localStorage.setItem("bookbazaar_accessToken", accessToken);

      const userProfile = await authApiService.fetchUserProfile(accessToken);
      setUser(userProfile);

      return { user: userProfile, guestCart }; 
    } catch (err) {
      setError(err.message || "Login failed.");
      performClientLogout();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (registrationData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authApiService.register(registrationData);
      return result;
    } catch (err) {
      setError(err.message || "Registration failed.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    performClientLogout(); 
    setLoading(false);
  };

  const contextValue = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role?.toUpperCase() === "ADMIN",
    loading,
    error,
    loginUser,
    registerUser,
    logoutUser,
    setError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === defaultAuthContextState || context === undefined) {
    console.error("useAuth is consuming default/undefined AuthContext. Make sure AuthProvider is used properly.");
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
