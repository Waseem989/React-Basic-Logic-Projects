import React, { useState } from "react";
import {
  FaShoppingCart,
  FaUserShield,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = ({ search, setSearch, setIsDialog }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-950 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between gap-5">
          {/* Logo */}
          <button className="text-2xl font-extrabold">
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

            <FaSearch className="absolute right-4 top-4 text-gray-400" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            <button className="hover:text-emerald-400 transition">Home</button>

            <button
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition pointer"
              onClick={() => setIsDialog((prv) => !prv)}
            >
              <FaUserShield />
              Admin Login
            </button>

            {/* Cart */}
            <a className="relative">
              <FaShoppingCart className="text-2xl hover:text-emerald-400" />

              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </a>
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

            <a onClick={() => setIsOpen(false)}>Home</a>

            <a
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2"
            >
              <FaUserShield />
              Admin Login
            </a>

            <a
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2"
            >
              <FaShoppingCart />
              Cart ({0})
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
