package com.tka.edutrack.api.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.tka.edutrack.api.entity.User;
import com.tka.edutrack.api.model.LoginRequest;
import com.tka.edutrack.api.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository repo;

	@Autowired
	private BCryptPasswordEncoder encoder;

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

	public User loginUser(LoginRequest request) {

		User user = repo.findById(request.getUsername()).orElse(null);

		if (user != null) {
			System.out.println("Entered: " + request.getPassword());
			System.out.println("DB: " + user.getPassword());
			System.out.println("Match: " + encoder.matches(request.getPassword(), user.getPassword()));
		}

		if (user != null && encoder.matches(request.getPassword(), user.getPassword())) {
			return user;
		}

		return null;
	}

	public User registerUser(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		return repo.save(user);
	}

	public List<User> getAllUser() {
		logger.info("Fetching all users");
		return repo.findByActiveTrue();
	}

	public User getUserByName(String username) {
		logger.info("Fetching user: {}", username);
		return repo.findById(username).orElseThrow(() -> new RuntimeException("User not found"));
	}

	public String deleteUserById(String username) {
		logger.info("Deleting user: {}", username);

		User user = repo.findById(username).orElseThrow(() -> new RuntimeException("User not found"));

		// ❗ protect main admin
		if (username.equalsIgnoreCase("admin")) {
			throw new RuntimeException("Main admin cannot be deleted");
		}

		// ✅ soft delete
		user.setActive(false);
		repo.save(user);

		return "User deactivated";
	}

	public User updateUser(User user) {
		logger.info("Updating user: {}", user.getUsername());
		return repo.save(user);
	}

	public List<User> getAllAdmins() {
		logger.info("Fetching all admins");
		return repo.findByRole("admin");
	}

	public List<User> getAllFaculties() {
		logger.info("Fetching all faculties");
		return repo.findByRole("faculty");
	}

	public String restoreUser(String username) {
		User user = repo.findById(username).orElseThrow();
		user.setActive(true);
		repo.save(user);
		return "Restored";
	}
}