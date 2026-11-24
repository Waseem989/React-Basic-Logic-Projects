import React, { useState } from "react";
import {
  FaShoppingCart,
  FaUserShield,
  FaSearch,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../Auth/AuthContext";
import { selectCartCount } from "../redux/CartSlice";

const Navbar = ({ search, setSearch, setIsDialog }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/", { replace: true });
  };

  const handleAdminClick = () => {
    if (isLoggedIn) {
      navigate("/admin");
    } else {
      setIsDialog(true);
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-950 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between gap-5">
          {/* Logo */}
          <button
            className="text-2xl font-extrabold"
            onClick={() => navigate("/")}
          >
            Shop<span className="text-emerald-500">Zone.</span>
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-800 text-white px-5 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            <button
              className="hover:text-emerald-400 transition"
              onClick={() => navigate("/")}
            >
              Home
            </button>

            {isLoggedIn ? (
              <>
                <button
                  className="hover:text-emerald-400 transition"
                  onClick={() => navigate("/admin")}
                >
                  Dashboard
                </button>
                <button
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <button
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition"
                onClick={handleAdminClick}
              >
                <FaUserShield />
                Admin Login
              </button>
            )}

            {/* Cart */}
            {!isLoggedIn && (
              <button className="relative" onClick={() => navigate("/cart")}>
                <FaShoppingCart className="text-2xl hover:text-emerald-400" />
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-5 flex flex-col gap-5 border-t border-gray-700 pt-5">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-800 px-4 py-3 rounded-lg outline-none"
            />

            <a
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
            >
              Home
            </a>

            {isLoggedIn ? (
              <a
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400"
              >
                <FaSignOutAlt />
                Logout
              </a>
            ) : (
              <a onClick={handleAdminClick} className="flex items-center gap-2">
                <FaUserShield />
                Admin Login
              </a>
            )}

            {!isLoggedIn && (
              <a
                onClick={() => {
                  navigate("/cart");
                  setIsOpen(false);
                }}
                className="flex items-center gap-2"
              >
                <FaShoppingCart />
                Cart ({cartCount})
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;