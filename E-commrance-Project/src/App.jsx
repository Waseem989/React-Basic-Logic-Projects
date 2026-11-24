import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginDialog from "./components/LoginDialog";
import Footer from "./components/Footer";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Cart from "./components/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import Userdashboard from "./pages/Userdashboard";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";

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
        <Route path="/" element={<Userdashboard search={search} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route
          path="/UserDashBoard"
          element={<Userdashboard search={search} />}
        />

        {/* Protected Admin Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard search={search} />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
