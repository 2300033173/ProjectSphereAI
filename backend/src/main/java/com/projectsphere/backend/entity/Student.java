package com.projectsphere.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "students")
public class Student {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

// Basic Details
private String name;
private String email;
private String department;
private String password;
private String role;

// Profile Details
private String skills;
private String github;
private String linkedin;
private String profileImage;
private String resume;

// Project Statistics
private int projectsCount;
private int completedProjects;
private int portfolioScore;

// Professional Tracking Fields
private String currentProject;
private int overallProgress;
private String projectStatus;

// Profile Lock
private boolean profileCompleted = false;

public Student() {
}

public Student(
        Long id,
        String name,
        String email,
        String department,
        String password,
        String role) {

    this.id = id;
    this.name = name;
    this.email = email;
    this.department = department;
    this.password = password;
    this.role = role;
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

public String getDepartment() {
    return department;
}

public void setDepartment(String department) {
    this.department = department;
}

public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}

public String getRole() {
    return role;
}

public void setRole(String role) {
    this.role = role;
}

public String getSkills() {
    return skills;
}

public void setSkills(String skills) {
    this.skills = skills;
}

public String getGithub() {
    return github;
}

public void setGithub(String github) {
    this.github = github;
}

public String getLinkedin() {
    return linkedin;
}

public void setLinkedin(String linkedin) {
    this.linkedin = linkedin;
}

public String getProfileImage() {
    return profileImage;
}

public void setProfileImage(String profileImage) {
    this.profileImage = profileImage;
}

public String getResume() {
    return resume;
}

public void setResume(String resume) {
    this.resume = resume;
}

public int getProjectsCount() {
    return projectsCount;
}

public void setProjectsCount(int projectsCount) {
    this.projectsCount = projectsCount;
}

public int getCompletedProjects() {
    return completedProjects;
}

public void setCompletedProjects(int completedProjects) {
    this.completedProjects = completedProjects;
}

public int getPortfolioScore() {
    return portfolioScore;
}

public void setPortfolioScore(int portfolioScore) {
    this.portfolioScore = portfolioScore;
}

public String getCurrentProject() {
    return currentProject;
}

public void setCurrentProject(String currentProject) {
    this.currentProject = currentProject;
}

public int getOverallProgress() {
    return overallProgress;
}

public void setOverallProgress(int overallProgress) {
    this.overallProgress = overallProgress;
}

public String getProjectStatus() {
    return projectStatus;
}

public void setProjectStatus(String projectStatus) {
    this.projectStatus = projectStatus;
}

public boolean isProfileCompleted() {
    return profileCompleted;
}

public void setProfileCompleted(boolean profileCompleted) {
    this.profileCompleted = profileCompleted;
}


}
