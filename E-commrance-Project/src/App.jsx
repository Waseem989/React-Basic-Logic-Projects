import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginDialog from "./components/LoginDialog";

import ProtectedRoute from "./Auth/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";
import Userdashboard from "./pages/Userdashboard";

function App() {
  const [search, setSearch] = useState("");
  const [isDialog, setIsDialog] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar search={search} setSearch={setSearch} setIsDialog={setIsDialog} />

      {/* Login Popup */}
      <LoginDialog isDialog={isDialog} setIsDialog={setIsDialog} />

      {/* Routes */}
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Userdashboard />} />

        <Route path="/UserDashBoard" element={<Userdashboard />} />

        {/* Protected Admin Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
