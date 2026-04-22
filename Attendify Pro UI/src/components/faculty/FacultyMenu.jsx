import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function FacultyMenu() {
  const [studentMenuOpen, setStudentMenuOpen] = useState(false);
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
      <div className="flex items-center gap-6">
        {/* Dashboard */}
        <Link
          to="/faculty-dashboard"
          className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition"
        >
          Dashboard
        </Link>

        {/* Students Dropdown */}
        <div className="relative">
          <button
            onClick={() => setStudentMenuOpen(!studentMenuOpen)}
            className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition flex items-center gap-1"
          >
            Students ▼
          </button>

          {studentMenuOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              <Link
                to="/add-student"
                className="block px-4 py-2 hover:bg-blue-100 transition"
                onClick={() => setStudentMenuOpen(false)}
              >
                Add Students
              </Link>

              <Link
                to="/all-students"
                className="block px-4 py-2 hover:bg-blue-100 transition"
                onClick={() => setStudentMenuOpen(false)}
              >
                All Students
              </Link>
            </div>
          )}
        </div>

        {/* Attendance */}
        <Link
          to="/mark-attendance"
          className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition"
        >
          Mark Attendance
        </Link>

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

export default FacultyMenu;