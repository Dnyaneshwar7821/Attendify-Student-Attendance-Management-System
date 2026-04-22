package com.tka.edutrack.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tka.edutrack.api.entity.Student;
import com.tka.edutrack.api.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin("http://localhost:5173")
public class StudentController {

	@Autowired
	private StudentService service;

	@GetMapping("/get-all-students")
	public List<Student> getAll() {
		return service.getAllStudents();
	}

	@PostMapping("/add-student")
	public Student create(@Valid @RequestBody Student student) {
		return service.createStudent(student);
	}

	@GetMapping("/get-student-by-id/{id}")
	public Student getById(@PathVariable Long id) {
		return service.getStudentById(id);
	}

	@PutMapping("/update-student")
	public Student update(@RequestBody Student student) {
		return service.updateStudent(student);
	}

	@DeleteMapping("/delete-student/{id}")
	public String delete(@PathVariable Long id) {
		return service.deleteStudent(id);
	}
}
