import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userAPI } from "../../api/apiService";
import AdminMenu from "../../components/admin/AdminMenu";

function UpdateUser() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    firstName: "",
    lastName: "",
  });

  // Fetch user details
  useEffect(() => {
    userAPI.getUserByUsername(username)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [username]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    userAPI.updateUser(user)
      .then(() => {
        alert("User updated successfully!");
        navigate("/all-users");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        alert("Failed to update user!");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <AdminMenu />

      <div className="flex justify-center items-center py-12 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-green-600 text-center mb-2">
            Update User
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                disabled
                className="border rounded px-3 py-2 bg-gray-100 w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Role</label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;