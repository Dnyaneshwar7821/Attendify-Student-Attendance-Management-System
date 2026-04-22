import { useState } from "react";
import FacultyMenu from "../../components/faculty/FacultyMenu";
import { studentAPI } from "../../api/apiService";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    studentAPI
      .addStudent(formData)
      .then(() => {
        alert("Student added successfully!"); 
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong!");
      });
  };


  return (
    <>
      <FacultyMenu />

      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Add Student
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Save Student
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddStudent;
