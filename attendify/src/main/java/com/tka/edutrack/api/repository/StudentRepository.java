package com.tka.edutrack.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tka.edutrack.api.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}