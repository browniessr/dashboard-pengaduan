// src/App.jsx
import { useState } from "react";
import "./App.css";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return !isLoggedIn ? (
    <Login onLoginSuccess={() => setIsLoggedIn(true)} />
  ) : (
    <Dashboard onLogout={() => setIsLoggedIn(false)} />
  );
}
