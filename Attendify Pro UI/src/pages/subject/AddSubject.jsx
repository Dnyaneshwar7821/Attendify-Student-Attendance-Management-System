import { useState } from "react";
import AdminMenu from "../../components/admin/AdminMenu";
import { subjectAPI } from "../../api/apiService";

function AddSubject() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Subject name required");
      return;
    }

    setLoading(true);

    try {
      await subjectAPI.addSubject({ name });
      alert("Subject added successfully!");
      setName("");
    } catch (err) {
      console.error(err);
      alert("Error adding subject");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <AdminMenu />

      <div className="flex justify-center items-center py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-blue-600 text-center">
            Add Subject
          </h2>

          <input
            type="text"
            placeholder="Enter subject name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Subject"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSubject;