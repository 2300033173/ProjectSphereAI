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
    // Register
    // ==========================

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {

        if (student.getEmail() == null ||
            student.getPassword() == null) {

            return ResponseEntity.badRequest()
                    .body("Email and Password are required");
        }

        Student existing = repository.findByEmail(student.getEmail());

        if (existing != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email Already Exists");
        }

        Student saved = repository.save(student);

        saved.setPassword(null);

        return ResponseEntity.ok(saved);
    }

    // ==========================
    // Login
    // ==========================

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student loginData) {

        if (loginData.getEmail() == null ||
            loginData.getPassword() == null) {

            return ResponseEntity.badRequest()
                    .body("Email and Password are required");
        }

        Student student = repository.findByEmail(loginData.getEmail());

        if (student == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Email Not Found");
        }

        if (!student.getPassword().equals(loginData.getPassword())) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Password");
        }

        student.setPassword(null);

        return ResponseEntity.ok(student);
    }

}