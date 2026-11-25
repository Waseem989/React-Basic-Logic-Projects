import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginDialog = ({ isDialog, setIsDialog }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const success = await login(email, password);

    setLoading(false);

    if (success) {
      setIsDialog(false);
      setEmail("");
      setPassword("");
      navigate("/admin");
    } else {
      setError("Invalid email or password!");
    }
  };

  if (!isDialog) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={() => setIsDialog(false)}
          className="absolute right-5 top-4 text-2xl text-gray-400 hover:text-red-500"
        >
          &times;
        </button>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <FaUserShield size={30} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>

          <p className="mt-2 text-sm text-gray-500">
            Login to access your dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;
