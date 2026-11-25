import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const BASE_URL = "https://686ce46214219674dcc98cf2.mockapi.io";
const ENDPOINTS = ["admin", "users"];

async function findAccount(path, email, password) {
  const res = await fetch(`${BASE_URL}/${path}?email=${encodeURIComponent(email)}`);
  if (res.status === 404) return null; // MockAPI filter pe kuch na mile to 404 deta hai
  if (!res.ok) throw new Error("Server error, try agian");

  const list = await res.json();
  return (
    list.find(
      (u) =>
        u.email?.toLowerCase() === email.toLowerCase() && u.password === password
    ) || null
  );
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    for (const path of ENDPOINTS) {
      const found = await findAccount(path, email.trim(), password);
      if (found) {
        const { password: _pw, ...safe } = found; // password store nahi karte
        // role record se aayega; na ho to endpoint ke hisaab se fallback
        const role = found.role || (path === "admin" ? "admin" : "user");
        const loggedIn = { ...safe, role };
        localStorage.setItem("user", JSON.stringify(loggedIn));
        setUser(loggedIn);
        return loggedIn;
      }
    }
    throw new Error("Email or password Wrong");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);