package com.tka.edutrack.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tka.edutrack.api.entity.Student;
import com.tka.edutrack.api.repository.AttendanceRecordRepository;
import com.tka.edutrack.api.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository repo;
	
	@Autowired
	private AttendanceRecordRepository attendanceRepo;

	public List<Student> getAllStudents() {
		return repo.findAll();
	}

	public Student createStudent(Student student) {
		return repo.save(student);
	}

	public Student getStudentById(long id) {
		return repo.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
	}

	public Student updateStudent(Student student) {
		return repo.save(student);
	}

	public String deleteStudent(long id) {

		Student student = repo.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));

		// remove student from all attendance records
		student.getAttendanceRecords().forEach(ar -> {
		    ar.getStudents().remove(student);
		    attendanceRepo.save(ar);
		});

		repo.delete(student);

		return "Deleted";
	}
}
