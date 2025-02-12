import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5164/api/Auth/login", { username, password });
      localStorage.setItem("token", response.data.token);
      setAuth(response.data.token);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post("http://localhost:5164/api/Auth/register", { username, password });
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
