package com.projectsphere.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectsphere.backend.entity.Student;

public interface StudentRepository
        extends JpaRepository<Student, Long> {

    Student findByEmail(String email);

    Student findByEmailAndPassword(
            String email,
            String password);
}