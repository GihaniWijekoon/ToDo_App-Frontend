import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Hello, Welcome!</h2>
        <p>Don't have an account?</p>
        <button onClick={() => navigate("/register")} className="register-btn">
          Register
        </button>
      </div>
      <div className="login-right">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
