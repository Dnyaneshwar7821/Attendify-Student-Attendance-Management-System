package com.tka.edutrack.api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tka.edutrack.api.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

	List<User> findByRole(String role);
	
	List<User> findByActiveTrue();
}