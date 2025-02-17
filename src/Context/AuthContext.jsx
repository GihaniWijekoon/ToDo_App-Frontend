import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, userId: null });
    //console.log("token ======================",token);

    useEffect(() => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        setAuth({ token, userId });
      }
    }, []);

  const login = async (username, password) => {

    try {
      const response = await axios.post("http://localhost:5164/api/Auth/login", { username, password });

      // Decode the token to extract userId
        const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    localStorage.setItem("token", response.data.token);
    console.log("token from BE in auth=======",response.data.token);
    localStorage.setItem("userId", userId);

      setAuth({ token: response.data.token, userId});
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

  // const logout = () => {
  //   // Clear localStorage
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  
  //   // Clear auth state
  //   setAuth({ token: null, userId: null });
  //   console.log("Auth state after logout:", auth);
    
  //   // Redirect to login page
  //   window.location.href = "/login"; // Or use a router redirect if using React Router
  // };

  const logout = () => {
    setAuth({ token: null, userId: null }); 
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  
    setTimeout(() => {
      window.location.href = "/login"; // Ensure reload after clearing everything
    }, 100); // Small delay to allow state update
  };
  
  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
