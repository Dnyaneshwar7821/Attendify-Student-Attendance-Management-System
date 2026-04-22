package com.tka.edutrack.api.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tka.edutrack.api.entity.AttendanceRecord;
import com.tka.edutrack.api.entity.Student;
import com.tka.edutrack.api.entity.Subject;
import com.tka.edutrack.api.entity.User;
import com.tka.edutrack.api.model.AttendanceRecordRequest;
import com.tka.edutrack.api.repository.AttendanceRecordRepository;
import com.tka.edutrack.api.repository.StudentRepository;
import com.tka.edutrack.api.repository.SubjectRepository;
import com.tka.edutrack.api.repository.UserRepository;

@Service
public class AttendanceRecordService {

	@Autowired
	private AttendanceRecordRepository repo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private SubjectRepository subjectRepo;

	@Autowired
	private StudentRepository studentRepo;

	public List<AttendanceRecord> getAllAttendanceRecords() {
		return repo.findAll();
	}

	public List<AttendanceRecord> getAttendanceByFaculty(String username) {
		return repo.findByUserUsername(username);
	}

	public List<AttendanceRecord> getAllAttendanceRecords(String date, long subjectId) {
		return repo.findBySubjectIdAndDate(subjectId, date);
	}

	public List<AttendanceRecord> getAttendanceByFacultySubjectDate(String username, long subjectId, String date) {
		return repo.findByUserUsernameAndSubjectIdAndDate(username, subjectId, date);
	}

	public AttendanceRecord takeAttendance(AttendanceRecordRequest request) {

		User user = userRepo.findById(request.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

		Subject subject = subjectRepo.findById(request.getSubjectId())
				.orElseThrow(() -> new RuntimeException("Subject not found"));

		Set<Student> students = request.getStudents().stream()
				.map(s -> studentRepo.findById(s.getId()).orElseThrow(() -> new RuntimeException("Student not found")))
				.collect(Collectors.toSet());

		AttendanceRecord record = new AttendanceRecord();
		record.setUser(user);
		record.setSubject(subject);
		record.setDate(request.getDate());
		record.setTime(request.getTime());
		record.setStudents(students);
		record.setNumberOfStudents(students.size());

		return repo.save(record);
	}
}