import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from "./components/Navbar";
import Login from "./pages/Login/index_login";
import Register from "./pages/Login/index_register";
import Dashboard from "./pages/Dashboard";
import DataPull from "./pages/DataPull";
import Profile from "./pages/Profile";
import "./index.css";

function App() {
  const { user } = useAuthContext();
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app">
        {hideNavbar ? null : <Navbar />}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/datapull" element={user ? <DataPull /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
    </div>
  )
}

export default App
