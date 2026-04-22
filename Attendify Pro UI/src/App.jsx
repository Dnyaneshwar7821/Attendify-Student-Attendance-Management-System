import { Route, Routes } from "react-router-dom";

// AUTH
import Login from "./pages/auth/Login";
import Welcome from "./pages/auth/Welcome";

// DASHBOARDS
import AdminDashboard from "./components/admin/AdminDashboard";
import FacultyDashboard from "./components/faculty/FacultyDashboard";

// USER
import AddUser from "./pages/user/AddUser";
import AllUser from "./pages/user/AllUser";
import UpdateUser from "./pages/user/UpdateUser";
import Profile from "./pages/user/Profile";

// STUDENT
import AddStudent from "./pages/student/AddStudent";
import AllStudents from "./pages/student/AllStudents";

// SUBJECT
import AllSubject from "./pages/subject/AllSubject";

// ATTENDANCE
import MarkAttendance from "./pages/attendance/MarkAttendance";
import ViewAttendance from "./pages/attendance/ViewAttendance";

// COMMON
import Footer from "./components/common/Footer";

// SECURITY
import ProtectedRoute from "./routes/ProtectedRoute";

// CSS
import "./App.css";
import AddSubject from "./pages/subject/AddSubject";
import Layout from "./components/common/Layout";

function App() {
  return (
    <>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Layout />}>
          {/* PUBLIC */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />

          {/* ADMIN */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* FACULTY */}
          <Route
            path="/faculty-dashboard"
            element={
              <ProtectedRoute role="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />

          {/* USER */}
          <Route
            path="/add-user"
            element={
              <ProtectedRoute role="admin">
                <AddUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-users"
            element={
              <ProtectedRoute role="admin">
                <AllUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-user/:username"
            element={
              <ProtectedRoute role="admin">
                <UpdateUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* STUDENT */}
          <Route
            path="/add-student"
            element={
              <ProtectedRoute role="faculty">
                <AddStudent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-students"
            element={
              <ProtectedRoute role="faculty">
                <AllStudents />
              </ProtectedRoute>
            }
          />

          {/* SUBJECT */}
          <Route
            path="/add-subject"
            element={
              <ProtectedRoute role="admin">
                {" "}
                <AddSubject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-subject"
            element={
              <ProtectedRoute role="admin">
                <AllSubject />
              </ProtectedRoute>
            }
          />

          {/* ATTENDANCE */}
          <Route
            path="/mark-attendance"
            element={
              <ProtectedRoute role="faculty">
                <MarkAttendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-attendance"
            element={
              <ProtectedRoute>
                <ViewAttendance />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
