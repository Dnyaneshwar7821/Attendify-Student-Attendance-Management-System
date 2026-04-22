import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout if token expired
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

/* =========================
   USER API
========================= */
export const userAPI = {
  registerUser: (data) => api.post("/user/register-user/", data),

  loginUser: (data) => api.post("/user/login-user/", data),

  getAllUsers: () => api.get("/user/get-all-user/"),

  getUserByUsername: (username) =>
    api.get(`/user/get-user-by-username/${username}/`),

  updateUser: (data) => api.put("/user/update-user/", data),

  deleteUserByUsername: (username) =>
    api.delete(`/user/delete-user-by-username?username=${username}`),

  getAllFaculty: () => api.get("/user/get-all-faculty/"),
};

/* =========================
   STUDENT API
========================= */
export const studentAPI = {
  addStudent: (data) => api.post("/student/add-student/", data),

  getAllStudents: () => api.get("/student/get-all-students/"),

  updateStudent: (data) => api.put("/student/update-student/", data),

  deleteStudent: (id) => api.delete(`/student/delete-student/${id}/`),
};

/* =========================
   SUBJECT API
========================= */
export const subjectAPI = {
  addSubject: (data) => api.post("/subject/add-subject/", data),

  getAllSubjects: () => api.get("/subject/get-all-subjects/"),

  updateSubject: (data) => api.put("/subject/update-subject/", data),

  deleteSubject: (id) => api.delete(`/subject/delete-subject/${id}/`),
};

/* =========================
   ATTENDANCE API
========================= */
export const attendanceAPI = {
  takeAttendance: (data) =>
    api.post("/attendance/take-attendance/", data),

  getAllAttendanceRecords: () =>
    api.get("/attendance/get-all-attendance-records/"),

  getAttendance: (facultyUsername, subjectId, date) =>
    api.get(
      `/attendance/get-attendance/${facultyUsername}/${subjectId}/${date}`
    ),
};

export default api;