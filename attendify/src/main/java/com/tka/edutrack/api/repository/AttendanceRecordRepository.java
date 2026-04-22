package com.tka.edutrack.api.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tka.edutrack.api.entity.AttendanceRecord;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {

	List<AttendanceRecord> findByUserUsername(String username);

	List<AttendanceRecord> findBySubjectIdAndDate(Long subjectId, String date);

	List<AttendanceRecord> findByUserUsernameAndSubjectIdAndDate(String username, Long subjectId, String date);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM AttendanceRecord a WHERE a.subject.id = :id")
	void deleteBySubjectId(@Param("id") long id);
}