import React from "react";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

import { IoClose } from "react-icons/io5";
const Togle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [close, setClose] = useState(false);
   const onSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-200 p-4">
        <ul className="flex gap-4">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <input
          type="search"
          placeholder="Search..."
          className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add <FaUserPlus />
        </button>
      </nav>

      {isOpen && (
        <div
          className="flex flex-col items-center justify-center mt-8 border-2 border-gray-300 p-4 rounded-md
      w-1/2 mx-auto bg-gray-400"
        >
          <form action="submit">
            <div>
              <label htmlFor="name">Name: </label>
              <br />
              <input
                type="text"
                placeholder="Enter your name"
                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="confirm_password">Confirm Password: </label>
              <input
                type="confirm_password"
                placeholder=" Re password"
                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                type="submit"
                onClick={onSubmit}
              >
                Submit
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                onClick={() => setIsOpen(false)}
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Togle;
