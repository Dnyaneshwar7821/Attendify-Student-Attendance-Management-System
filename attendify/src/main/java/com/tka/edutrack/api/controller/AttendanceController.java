package com.tka.edutrack.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tka.edutrack.api.entity.AttendanceRecord;
import com.tka.edutrack.api.model.AttendanceRecordRequest;
import com.tka.edutrack.api.service.AttendanceRecordService;

@RestController
@RequestMapping("/attendance")
@CrossOrigin("http://localhost:5173")
public class AttendanceController {

	@Autowired
	private AttendanceRecordService attendanceRecordService;

	@GetMapping("/get-all-attendance-records")
	public List<AttendanceRecord> getAllAttendanceRecords() {
		return attendanceRecordService.getAllAttendanceRecords();
	}

	@GetMapping("/get-attendance-by-faculty/{facultyUsername}")
	public List<AttendanceRecord> getAttendanceByFaculty(@PathVariable String facultyUsername) {
		return attendanceRecordService.getAttendanceByFaculty(facultyUsername);
	}

	@GetMapping("/get-attendance-by-date-subjet/{date}/{subjectId}")
	public List<AttendanceRecord> getByDateSubject(
			@PathVariable String date,
			@PathVariable long subjectId) {
		return attendanceRecordService.getAllAttendanceRecords(date, subjectId);
	}

	@GetMapping("/get-attendance/{faculty}/{subjectId}/{date}")
	public List<AttendanceRecord> getByAll(
			@PathVariable String faculty,
			@PathVariable long subjectId,
			@PathVariable String date) {
		return attendanceRecordService.getAttendanceByFacultySubjectDate(faculty, subjectId, date);
	}

	@PostMapping("/take-attendance")
	public AttendanceRecord takeAttendance(@RequestBody AttendanceRecordRequest request) {
		return attendanceRecordService.takeAttendance(request);
	}
}