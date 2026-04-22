package com.tka.edutrack.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tka.edutrack.api.entity.Subject;
import com.tka.edutrack.api.service.SubjectService;

@RestController
@RequestMapping("/subject")
@CrossOrigin("http://localhost:5173")
public class SubjectController {

	@Autowired
	private SubjectService subjectService;

	@GetMapping("/get-all-subjects")
	public List<Subject> getAllSubjects() {
		return subjectService.getAllSubjects();
	}

	@PostMapping("/add-subject")
	public Subject createSubject(@Valid @RequestBody Subject subject) {
		return subjectService.createSubject(subject);
	}

	@GetMapping("/get-subject-by-id/{id}")
	public Subject getSubjectById(@PathVariable long id) {
		return subjectService.getSubjectById(id);
	}

	@PutMapping("/update-subject")
	public Subject updateSubject(@Valid @RequestBody Subject subjectDetails) {
		return subjectService.updateSubject(subjectDetails);
	}

	@DeleteMapping("/delete-subject/{id}")
	public String deleteSubject(@PathVariable long id) {
		return subjectService.deleteSubject(id);
	}
}