package com.projectsphere.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projectsphere.backend.entity.Student;
import com.projectsphere.backend.repository.StudentRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private StudentRepository repository;

    // ==========================
    // Student/Admin Login
    // ==========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student loginData) {

        // Validate Input
        if (loginData.getEmail() == null ||
            loginData.getEmail().trim().isEmpty() ||
            loginData.getPassword() == null ||
            loginData.getPassword().trim().isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email and Password are required");
        }

        // Find user by email
        Student student = repository.findByEmail(loginData.getEmail());

        if (student == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Email Not Found");
        }

        // Check password
        if (!student.getPassword().equals(loginData.getPassword())) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Password");
        }

        // Do not return password
        student.setPassword(null);

        return ResponseEntity.ok(student);
    }

}