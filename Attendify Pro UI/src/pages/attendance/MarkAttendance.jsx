import { useEffect, useState } from "react";
import { studentAPI, subjectAPI, attendanceAPI } from "../../api/apiService";
import FacultyMenu from "../../components/faculty/FacultyMenu";

function MarkAttendance() {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [attendance, setAttendance] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const username = localStorage.getItem("username");

  // Fetch subjects
  useEffect(() => {
    subjectAPI
      .getAllSubjects()
      .then((response) => {
        const data = response.data;
        setSubjects(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch students
  useEffect(() => {
    studentAPI
      .getAllStudents()
      .then((response) => {
        const data = response.data;

        const safeData = Array.isArray(data) ? data : [];

        setStudents(safeData);

        const initialAttendance = {};
        safeData.forEach((stu) => {
          initialAttendance[stu.id] = false;
        });

        setAttendance(initialAttendance);
      })
      .catch((err) => console.error(err));
  }, []);

  // Select all toggle
  const handleSelectAll = () => {
    const newStatus = !selectAll;
    const updated = {};

    students.forEach((stu) => {
      updated[stu.id] = newStatus;
    });

    setAttendance(updated);
    setSelectAll(newStatus);
  };

  // Individual checkbox
  const handleCheckboxChange = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Submit attendance
  const handleSubmit = async () => {
    if (!selectedSubject || !date || !time) {
      alert("Please fill all fields: Subject, Date, and Time.");
      return;
    }

    const selectedStudents = students
      .filter((stu) => attendance[stu.id])
      .map((stu) => ({ id: stu.id }));

    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    const payload = {
      username: username,
      subjectId: Number(selectedSubject),
      date: date,
      time: time,
      students: selectedStudents,
    };

    try {
      await attendanceAPI.takeAttendance(payload);
      alert("Attendance marked successfully!");
    } catch (err) {
      console.error(err);
      alert("Error while marking attendance");
    }
  };

  return (
    <>
      <FacultyMenu />

      <div className="p-6 max-w-5xl mx-auto">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            className="border p-2 rounded w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-2 rounded w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            className="border p-2 rounded w-full"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Students List */}
        <div className="border rounded p-4 shadow bg-white">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="mr-2"
            />
            <label className="font-semibold">Select / Deselect All</label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Array.isArray(students) &&
              students.map((stu) => (
                <div
                  key={stu.id}
                  className="flex items-center border rounded p-2 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={attendance[stu.id] || false}
                    onChange={() => handleCheckboxChange(stu.id)}
                    className="mr-2"
                  />
                  <span>
                    {stu.id} - {stu.name}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </>
  );
}

export default MarkAttendance;
