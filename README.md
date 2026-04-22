# 📘 Attendify – Attendance Management System

## 🚀 Overview

Attendify is a full-stack Attendance Management System designed to manage students, faculty, subjects, and attendance records efficiently.
The application supports role-based dashboards (Admin & Faculty) and ensures data integrity using modern backend practices like JWT authentication and soft delete.

---

## 🛠️ Tech Stack

### 🔹 Backend

* Java (Spring Boot)
* Spring Security (JWT Authentication)
* Spring Data JPA (Hibernate)
* MySQL Database

### 🔹 Frontend

* React.js (Vite)
* Tailwind CSS
* Axios (API communication)

---

## 🔐 Features

### 👨‍💼 Admin

* Add / Update / Delete Users (Admin & Faculty)
* Manage Subjects (Add, Update, Delete)
* View all attendance records
* Role-based access control

### 👨‍🏫 Faculty

* Add / Update Students
* Mark Attendance
* View attendance reports

### 👤 Common

* Login with JWT Authentication
* Profile management
* Secure API communication

---

## ⚙️ Key Functionalities

* ✅ JWT-based Authentication & Authorization
* ✅ Role-based dashboards (Admin / Faculty)
* ✅ CRUD operations for Users, Students, Subjects
* ✅ Attendance marking & tracking
* ✅ Soft Delete implementation (User, Student, Subject)
* ✅ Data integrity maintained with relational mapping
* ✅ Responsive UI with Tailwind CSS

---

## 🧠 Design Highlights

* Used **RESTful APIs** for clean backend architecture
* Managed **Many-to-Many relationships** (Attendance ↔ Students)
* Applied **CORS configuration** for frontend-backend communication
* Structured project with modular components and services

---

## 📂 Project Structure

### Backend (Spring Boot)

```
controller/
service/
repository/
entity/
config/
util/
```

### Frontend (React)

```
components/
pages/
api/
routes/

```

---

## ▶️ Getting Started

### 🔹 Backend Setup

1. Clone repository
2. Configure MySQL in `application.properties`
3. Run Spring Boot application

```bash
mvn spring-boot:run
```

---

### 🔹 Frontend Setup

1. Navigate to frontend folder
2. Install dependencies

```bash
npm install
```

3. Start application

```bash
npm run dev
```

---

## 🌐 Environment Variables

Create `.env` in frontend:

```env
VITE_API_URL=http://localhost:8091
```

---

## 📸 Screens (Optional)

* Admin Dashboard
* Faculty Dashboard
* Attendance Module

---

## 📈 Future Improvements

* Role-based API authorization (strict enforcement)
* Pagination & search filters
* Export attendance reports (PDF/Excel)
* Email notifications
* Deployment (AWS / Render / Netlify)

---

## 👨‍💻 Author

**Dnyaneshwar Algule**
BE Computer Engineering (2025)
Aspiring Software Engineer

---

## ⭐ Notes

This project demonstrates full-stack development skills including backend architecture, frontend UI, API integration, and real-world data handling strategies.

---
