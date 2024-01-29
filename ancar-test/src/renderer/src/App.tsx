// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Quiz from "./components/quiz";
import SignUp from "./pages/signup";
import ProtectedRoutes from "./pages/private";


const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp  />} />
        <Route path="/" element={<ProtectedRoutes component={Dashboard} />}   />
        <Route path="/quiz" element={<ProtectedRoutes component={Quiz} />} />
      </Routes>
    </Router>
  );
};

export default App;
