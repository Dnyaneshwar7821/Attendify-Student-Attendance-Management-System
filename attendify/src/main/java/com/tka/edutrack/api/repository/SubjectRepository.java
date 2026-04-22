package com.tka.edutrack.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tka.edutrack.api.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

}