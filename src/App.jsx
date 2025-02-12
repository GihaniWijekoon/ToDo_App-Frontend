import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoDashboard from "./Pages/Tododashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { AuthProvider, useAuth } from "./Context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { auth } = useAuth();
  return auth ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute element={<TodoDashboard />} />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
