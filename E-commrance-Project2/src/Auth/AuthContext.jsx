
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const API = "https://6aea1a473d3dd3d37be624cd.mockapi.io/admin";

export const AuthProvider = ({ children }) => {

  const [admin, setAdmin] = useState(() => {
    const saved = sessionStorage.getItem("adminUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!admin;

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Unable to fetch admin data");
      }

      const admins = await response.json();

      const matchedAdmin = admins.find(
        (user) =>
          user.email === email &&
          user.password === password
      );

      if (matchedAdmin) {
        const adminData = {
          id: matchedAdmin.id,
          name: matchedAdmin.name,
          email: matchedAdmin.email,
          profile: matchedAdmin.profile,
        };

        setAdmin(adminData);

        sessionStorage.setItem(
          "adminUser",
          JSON.stringify(adminData)
        );

        return true;
      }

      return false;

    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setAdmin(null);
    sessionStorage.removeItem("adminUser");
  };

  return (
    <AuthContext.Provider
      value={{ admin, isLoggedIn, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
