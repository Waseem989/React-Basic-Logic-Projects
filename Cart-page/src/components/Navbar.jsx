import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const count = useSelector((state) => state.cart.value);
  return (
    <div className="">
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
        <ul className=" flex gap-4 ">
          <li>Products</li>
          <li> Contact </li>
        </ul>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Login As Admin.
        </button>
      </nav>
      <div className="flex justify-between items-center p-4 bg-gray-200 text-black">
        <input
          type="text"
          placeholder="Search Item....."
          className="border border-gray-300 rounded px-2 py-1 mt-2 w-3/6 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

          <link to="/cart" className="flex items-center gap-1">
            <FaCartShopping />
            <span className="bg-red-500 text-white rounded-2xl px-1">{count}</span>
          </link>
       
      </div>
    </div>
  );
};

export default Navbar;
