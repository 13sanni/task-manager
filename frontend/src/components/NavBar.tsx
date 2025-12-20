import { Link } from "react-router-dom";
import { useLogout } from "../auth/auth.mutations";

export default function Navbar() {
  const logout = useLogout();

  return (
    <nav className="bg-white border-b px-6 py-3 flex justify-between">
      <div className="flex gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
      </div>

      <button
        onClick={() => logout.mutate()}
        className="text-red-600"
      >
        Logout
      </button>
    </nav>
  );
}
