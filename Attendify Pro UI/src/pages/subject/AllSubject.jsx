import { useEffect, useState } from "react";
import { subjectAPI } from "../../api/apiService";
import AdminMenu from "../../components/admin/AdminMenu";

function AllSubject() {
  const [subjects, setSubjects] = useState([]);

  // Fetch all subjects
  const fetchSubjects = () => {
    subjectAPI.getAllSubjects()
      .then((response) => setSubjects(response.data))
      .catch((err) => console.error("Error fetching subjects:", err));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Add subject
  const handleAddSubject = () => {
    const subjectName = prompt("Enter Subject Name:");
    if (!subjectName || subjectName.trim() === "") {
      alert("Subject name cannot be empty!");
      return;
    }

    subjectAPI.addSubject({ name: subjectName })
      .then(() => {
        alert("Subject added successfully!");
        fetchSubjects();
      })
      .catch((err) => {
        console.error("Error adding subject:", err);
        alert("Failed to add subject.");
      });
  };

  // Edit subject
  const handleEditSubject = (id, name) => {
    const newName = prompt("Enter new subject name:", name);
    if (!newName || newName.trim() === "") {
      alert("Subject name cannot be empty!");
      return;
    }

    subjectAPI.updateSubject({ id: id, name: newName })
      .then(() => {
        alert("Subject updated successfully!");
        fetchSubjects();
      })
      .catch((err) => {
        console.error("Error updating subject:", err);
        alert("Failed to update subject.");
      });
  };

  // Delete subject
  const handleDeleteSubject = (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) {
      return;
    }

    subjectAPI.deleteSubject(id)
      .then(() => {
        alert("Subject deleted successfully!");
        fetchSubjects();
      })
      .catch((err) => {
        console.error("Error deleting subject:", err);
        alert("Failed to delete subject.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <AdminMenu />

      <div className="flex justify-between items-center m-4">
        <h1 className="text-2xl font-bold">All Subjects</h1>
        <button
          onClick={handleAddSubject}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Subject
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-4 py-2 border text-center">#</th>
              <th className="px-4 py-2 border text-center">ID</th>
              <th className="px-4 py-2 border text-center">Subject Name</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <tr
                  key={subject.id || index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="px-4 py-2 border text-center">
                    {index + 1}
                  </td>

                  <td className="px-4 py-2 border text-center">
                    {subject.id}
                  </td>

                  <td className="px-4 py-2 border text-center">
                    {subject.name}
                  </td>

                  <td className="px-4 py-2 border text-center space-x-2">
                    <button
                      onClick={() =>
                        handleEditSubject(subject.id, subject.name)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteSubject(subject.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No subjects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllSubject;