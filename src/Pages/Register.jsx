import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h2>Welcome Back!</h2>
        <p>Already have an account? Sign in to continue your journey</p>
        <button className="signin-btn" onClick={() => navigate("/login")}>
          Sign In
        </button>
      </div>
      <div className="register-right">
        <h2 className="register-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="register-submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
