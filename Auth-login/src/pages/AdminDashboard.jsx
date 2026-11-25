import { useAuth } from "../Context/AuthContext";

export function AdminDashboard() {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}