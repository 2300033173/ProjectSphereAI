package com.projectsphere.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projectsphere.backend.entity.Student;
import com.projectsphere.backend.repository.StudentRepository;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository repository;

    // ==========================
    // Get All Students
    // ==========================

    @GetMapping
    public List<Student> getStudents() {
        return repository.findAll();
    }

    // ==========================
    // Add Student
    // ==========================

    @PostMapping
    public ResponseEntity<?> addStudent(
            @RequestBody Student student) {

        Student existing =
                repository.findByEmail(student.getEmail());

        if (existing != null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email already exists");
        }

        return ResponseEntity.ok(
                repository.save(student));
    }

    // ==========================
    // Get Student By ID
    // ==========================

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(
            @PathVariable Long id) {

        Student student =
                repository.findById(id)
                        .orElse(null);

        if (student == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Student Not Found");
        }

        student.setPassword(null);

        return ResponseEntity.ok(student);
    }

    // ==========================
    // Update Student
    // ==========================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(
            @PathVariable Long id,
            @RequestBody Student updatedStudent) {

        Student student =
                repository.findById(id)
                        .orElse(null);

        if (student == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Student Not Found");
        }

        Student emailOwner =
                repository.findByEmail(updatedStudent.getEmail());

        if (emailOwner != null &&
                !emailOwner.getId().equals(id)) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email already exists");
        }

        // Basic Details
        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());
        student.setDepartment(updatedStudent.getDepartment());

        // Profile
        student.setSkills(updatedStudent.getSkills());
        student.setGithub(updatedStudent.getGithub());
        student.setLinkedin(updatedStudent.getLinkedin());
        student.setResume(updatedStudent.getResume());
        student.setProfileImage(updatedStudent.getProfileImage());

        // Statistics
        student.setProjectsCount(updatedStudent.getProjectsCount());
        student.setCompletedProjects(updatedStudent.getCompletedProjects());
        student.setPortfolioScore(updatedStudent.getPortfolioScore());

        // Project Tracking
        student.setCurrentProject(updatedStudent.getCurrentProject());
        student.setOverallProgress(updatedStudent.getOverallProgress());
        student.setProjectStatus(updatedStudent.getProjectStatus());

        // Profile Completion
        student.setProfileCompleted(updatedStudent.isProfileCompleted());

        Student savedStudent = repository.save(student);

        savedStudent.setPassword(null);

        return ResponseEntity.ok(savedStudent);
    }

    // ==========================
    // Delete Student
    // ==========================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(
            @PathVariable Long id) {

        if (!repository.existsById(id)) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Student Not Found");
        }

        repository.deleteById(id);

        return ResponseEntity.ok(
                "Student Deleted Successfully");
    }

}