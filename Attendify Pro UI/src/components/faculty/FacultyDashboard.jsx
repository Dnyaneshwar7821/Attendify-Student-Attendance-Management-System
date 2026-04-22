import { Link } from "react-router-dom";
import FacultyMenu from "./FacultyMenu";

const facultyFunctions = [
  {
    title: "Add Students",
    description: "Add new students to your class.",
    path: "/add-student",
    icon: "👨‍🎓",
  },
  {
    title: "All Students",
    description: "View and manage all students.",
    path: "/all-students",
    icon: "👥",
  },
  {
    title: "Manage Students",
    description: "Delete and update student information.",
    path: "/all-students",
    icon: "🛠️",
  },
  {
    title: "Mark Attendance",
    description: "Mark attendance for your students.",
    path: "/mark-attendance",
    icon: "✅",
  },
  {
    title: "View Attendance",
    description: "View attendance records.",
    path: "/view-attendance",
    icon: "📊",
  },
  {
    title: "My Profile",
    description: "View and update your profile.",
    path: "/my-profile",
    icon: "🧑‍💼",
  },
];

function FacultyDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200">
      <FacultyMenu />

      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">
          Faculty Functionalities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyFunctions.map((func, idx) => (
            <Link
              key={idx}
              to={func.path}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition transform duration-200 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">
                {func.icon}
              </div>

              <h3 className="text-lg font-bold text-blue-600 mb-2">
                {func.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {func.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;