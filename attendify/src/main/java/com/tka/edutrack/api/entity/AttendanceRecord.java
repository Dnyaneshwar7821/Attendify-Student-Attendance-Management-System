package com.tka.edutrack.api.entity;

import java.util.Set;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AttendanceRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "faculty")
	private User user;

	private int numberOfStudents;

	@ManyToOne
	@JoinColumn(name = "subject_id")
	private Subject subject;

	private String date;
	private String time;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name = "attendance_students",
		joinColumns = @JoinColumn(name = "attendance_record_id"),
		inverseJoinColumns = @JoinColumn(name = "student_id")
	)
	private Set<Student> students;
}