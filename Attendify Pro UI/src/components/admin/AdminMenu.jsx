import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear(); // clear token + role + username
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow flex items-center justify-between px-6 py-4">
      {/* Brand */}
      <div className="text-lg font-bold text-blue-600">
        Attendify Pro UI
      </div>

      {/* Center Menu */}
      <div className="flex items-center gap-3">
        {/* Dashboard */}
        <Link
          to="/admin-dashboard"
          className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition"
        >
          Dashboard
        </Link>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition flex items-center gap-1"
          >
            User ▼
          </button>

          {userMenuOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              <Link
                to="/add-user"
                className="block px-4 py-2 hover:bg-blue-100 transition"
                onClick={() => setUserMenuOpen(false)}
              >
                Add User
              </Link>

              <Link
                to="/all-users"
                className="block px-4 py-2 hover:bg-blue-100 transition"
                onClick={() => setUserMenuOpen(false)}
              >
                All User
              </Link>
            </div>
          )}
        </div>

        {/* Subject */}
        <Link
          to="/all-subject"
          className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition"
        >
          All Subject
        </Link>

        {/* Attendance */}
        <Link
          to="/view-attendance"
          className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition"
        >
          View Attendance
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Link
          to="/my-profile"
          className="font-semibold text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition"
        >
          My Profile
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminMenu;