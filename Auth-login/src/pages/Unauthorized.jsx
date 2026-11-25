import { useAuth } from "../Context/AuthContext";

export function Unauthorized() {
  const { logout } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h2>403 - not access</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}