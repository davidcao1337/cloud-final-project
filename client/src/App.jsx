import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index_login";
import Register from "./pages/Login/index_register";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
