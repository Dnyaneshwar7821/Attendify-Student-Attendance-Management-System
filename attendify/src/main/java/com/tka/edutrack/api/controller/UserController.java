package com.tka.edutrack.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tka.edutrack.api.entity.User;
import com.tka.edutrack.api.model.LoginRequest;
import com.tka.edutrack.api.service.UserService;
import com.tka.edutrack.api.util.JwtUtil;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

	@Autowired
	private UserService service;

	@Autowired
	private JwtUtil jwtUtil;

	// http://localhost:8091/user/login-user
	@PostMapping("/login-user")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {

		User user = service.loginUser(request);

		if (user != null) {
			String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
			return ResponseEntity.ok().body(java.util.Map.of("token", token));
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	}

	@PostMapping("/register-user")
	public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {

		User registerUser = service.registerUser(user);

		if (registerUser != null) {
			return new ResponseEntity<>("Registered", HttpStatus.CREATED);
		}

		return new ResponseEntity<>("Something Went Wrong", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/get-user-by-username/{username}")
	public User getUserById(@PathVariable String username) {
		return service.getUserByName(username);
	}

	@GetMapping("/get-all-user")
	public List<User> getAllUser() {
		return service.getAllUser();
	}

	@GetMapping("/get-all-admin")
	public List<User> getAllAdmins() {
		return service.getAllAdmins();
	}

	@GetMapping("/get-all-faculty")
	public List<User> getAllFaculties() {
		return service.getAllFaculties();
	}

	@DeleteMapping("/delete-user-by-username")
	public String deleteUserById(@RequestParam String username) {
		return service.deleteUserById(username);
	}

	@PutMapping("/update-user")
	public User updateUser(@Valid @RequestBody User user) {
		return service.updateUser(user);
	}
}