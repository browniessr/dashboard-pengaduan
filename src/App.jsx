import { useState } from "react";
import "./App.css";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogout() {
    setIsLoggedIn(false); // ini yang bikin balik ke halaman Login
  }

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
