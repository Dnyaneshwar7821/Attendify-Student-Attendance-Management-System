package com.tka.edutrack.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tka.edutrack.api.entity.Subject;
import com.tka.edutrack.api.repository.AttendanceRecordRepository;
import com.tka.edutrack.api.repository.SubjectRepository;

@Service
public class SubjectService {
	@Autowired
	private SubjectRepository repo;

	@Autowired
	private AttendanceRecordRepository attendanceRepo;

	public Subject getSubjectById(long id) {
		return repo.findById(id).orElseThrow(() -> new RuntimeException("Subject not found"));
	}

	public List<Subject> getAllSubjects() {
		return repo.findAll();
	}

	public Subject createSubject(Subject subject) {
		return repo.save(subject);
	}

	public Subject updateSubject(Subject subject) {
		return repo.save(subject);
	}

	public String deleteSubject(long id) {

		attendanceRepo.deleteBySubjectId(id);

		repo.deleteById(id);

		return "Deleted";
	}
}
